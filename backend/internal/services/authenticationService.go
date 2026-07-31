package services

import (
	"backend/internal/models"
	"backend/internal/repositories"
	"context"
	"crypto/ed25519"
	"crypto/rand"
	"errors"
	"fmt"
	"math/big"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type AuthenticationService struct {
	Repo repositories.AuthenticationDB
	Cache repositories.AuthenticationCache
	Emailing repositories.EmailingRepo
}

func (s *AuthenticationService) SendOTP(ctx context.Context, payload models.SignupDTO) error {
	max := big.NewInt(1000000)
	x, err := rand.Int(rand.Reader, max)
	if err != nil {
		return err
	}
	otp := fmt.Sprintf("%06d", x.Int64())

	subject := "Authentication OTP\r\n" // message subject
	body := fmt.Sprintf("This is your OTP code: %v. Make sure to not share with anybody else", otp) // this is the message body	

	if err := s.Cache.SetSignUpWithOtp(ctx, payload, otp); err != nil {
		return fmt.Errorf("Failed caching otp due to error: %v\n", err)
	}

	return s.Emailing.SendEmail(ctx, payload.Email, subject, body)
}

func (s *AuthenticationService) RegisterUser(ctx context.Context, payload models.OtpPayload) error {
	var dest models.CachedSignUp
	if err := s.Cache.GetSignUpWithOtp(ctx, payload.Otp, &dest); err != nil {
		return fmt.Errorf("Couldn't find pair due to error: %v\n", err)
	}

	bytes, err := bcrypt.GenerateFromPassword([]byte(dest.Password), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("Couldn't hash passwrd due to error: %v\n", err)
	}

	newUser := models.CreateUserDTO{
		Name: dest.Name,
		Email: dest.Email,
		Password: string(bytes),
		Role: "user",
	}

	if err := s.Repo.CreateUserRole(ctx, newUser); err != nil {
		return fmt.Errorf("Couldn't create new user due to error: %v\n", err)
	}

	return nil
}

func (s *AuthenticationService) PrintSender() string {
	return "up"
}

func (s *AuthenticationService) CreateSession(ctx context.Context, payload models.SignupDTO) (error, string, string) {
	err, hashedPassword := s.Repo.UserExists(ctx, payload.Email)
	if err != nil {
		return fmt.Errorf("Couldn't find user due to error: %v\n", err), "", ""
	}

	if err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(payload.Password)); err != nil {
		if errors.Is(err, bcrypt.ErrMismatchedHashAndPassword) {
			return fmt.Errorf("Invalid email or password"), "", ""
		}
		return fmt.Errorf("Internal server error"), "", ""
	}
	
	accessClaims := models.CustomClaims{
		Email: payload.Email,
		Role: "",
		RegisteredClaims: jwt.RegisteredClaims{
			Subject: payload.Name,
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(15 * time.Minute)),
			Issuer: "me",
		},
	}

	refreshClaims := models.CustomClaims{
		Email: payload.Email,
		Role: "",
		RegisteredClaims: jwt.RegisteredClaims{
			Subject: payload.Name,
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(7 * 24 * time.Hour)),
		},
	}
	
	prvPEM := os.Getenv("TOKEN_PRIVATE_KEY")
	if prvPEM == "" {
		fmt.Println(fmt.Errorf("No private key found in environment"))
	}
	prvKey, err := jwt.ParseEdPrivateKeyFromPEM([]byte(prvPEM))
	if err != nil {
		return fmt.Errorf("Couldn't parse privat key due to error: %v\n", err), "", ""
	}
	newAccessToken := jwt.NewWithClaims(jwt.SigningMethodEdDSA, accessClaims)
	newRefreshToken := jwt.NewWithClaims(jwt.SigningMethodEdDSA, refreshClaims)

	accessToken, err := newAccessToken.SignedString(prvKey)
	if err != nil {
		return fmt.Errorf("Failed to sign access token with private key"), "", ""
	}
	 
	refreshToken, err := newRefreshToken.SignedString(prvKey)
	if err != nil {
		return fmt.Errorf("Failed to sign refresh token with private key"), "", ""
	}

	return nil, accessToken, refreshToken
}

func (s *AuthenticationService) ValidateToken(ctx context.Context, tokenString string) error {
	pubKey := os.Getenv("TOKEN_PUBLIC_KEY")
	token, err := jwt.ParseWithClaims(tokenString, &models.CustomClaims{}, func(t *jwt.Token) (interface{}, error) {
		// Ensure algorithm matches EdDSA
		if _, ok := t.Method.(*jwt.SigningMethodEd25519); !ok {
			return nil, jwt.ErrTokenSignatureInvalid
		}
		return pubKey, nil
	})

	if err != nil || !token.Valid {
		return err
	}

	_, ok := token.Claims.(*models.CustomClaims)
	if !ok {
		return jwt.ErrTokenInvalidClaims
	}

	return nil
}
