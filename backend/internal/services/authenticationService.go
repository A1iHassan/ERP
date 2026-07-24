package services

import (
	"backend/internal/models"
	"backend/internal/repositories"
	"context"
	"crypto/rand"
	"fmt"
	"math/big"
	"net/smtp"
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

	subject := "Authentication OTP\r\n"
	mime := s.Emailing.MimeProv()
	body := fmt.Sprintf("This is your OTP code: %v. Make sure to not share with anybody else", otp)
	
	fmt.Print(s.Emailing.AuthProv())
	if err := smtp.SendMail(s.Emailing.HostProv(), s.Emailing.AuthProv(), s.Emailing.SenderProv(), []string{payload.Email}, []byte(subject + mime + body)); err != nil {
		return err
	}

	keyName := fmt.Sprintf("%v-%v", payload.Email, payload.Name)

	return s.Cache.SetPair(keyName, otp)
}

func (s *AuthenticationService) PrintSender() string {
	return "up"
}
