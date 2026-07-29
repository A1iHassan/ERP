package services

import (
	"backend/internal/models"
	"backend/internal/repositories"
	"context"
	"crypto/rand"
	"fmt"
	"math/big"

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
