package services

import (
	"context"
	"crypto/ed25519"
	"crypto/rand"
	"fmt"
	"main/internal/models"
	"main/internal/repositories"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	Repo repositories.AuthRepository
}

func (a *AuthService) LoginService(ctx context.Context, payload models.LoginUser) (string, error) {
	password, err := a.Repo.GetPassword(ctx, payload.Email, payload.Name)
	if err != nil {
		return "", err
	}

	err = bcrypt.CompareHashAndPassword([]byte(password), []byte(payload.Password))
	if err != nil {
		return "", fmt.Errorf("Wrong password")
	}

	expiration := time.Now().Add(15 * time.Minute)
	
	claimsObject := struct {
		Name string `json:"name"`
		Email string `json:"email"`
		jwt.RegisteredClaims
	}{
		Name: payload.Name,
		Email: payload.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expiration),
			Issuer: "me",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodEdDSA, claimsObject)

	_, privateKey, err := ed25519.GenerateKey(rand.Reader)

	signedToken, err := token.SignedString(privateKey)
	if err != nil {
		return "", err
	}

	return signedToken, nil
}

func (a *AuthService) SignUpService(ctx context.Context, payload models.SignUpUser) error {
	var hashedUser models.SignUpUser

	bytes, err := bcrypt.GenerateFromPassword([]byte(payload.Password), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("Password Error")
	}

	hashedUser.Name = payload.Name
	hashedUser.Email = payload.Email
	hashedUser.Password = string(bytes)

	if err = a.Repo.RegisterUser(ctx, hashedUser); err != nil {
		return fmt.Errorf("Couldn't register user due to error: %v\n", err)
	}

	return nil
}

func (a AuthService) ValidateToken(ctx context.Context, cookie *http.Cookie) error {

	return nil
}
