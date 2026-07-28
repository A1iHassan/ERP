package services

import (
	"backend/internal/models"
	"backend/internal/repositories"
	"context"
	"crypto/rand"
	"fmt"
	"math/big"
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
	return nil
}

func (s *AuthenticationService) PrintSender() string {
	return "up"
}
