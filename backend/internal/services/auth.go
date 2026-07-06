package services

import (
	"context"
	"fmt"
	"main/internal/models"
	"main/internal/repositories"

	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	repo repositories.AuthRepository
}

func (s *AuthService) LoginService(ctx context.Context, payload models.LoginUser) error {

	bytes, err := bcrypt.GenerateFromPassword([]byte(payload.Password), bcrypt.DefaultCost) // this needs to be changed to Compage instead of Generate
	if err != nil {
		return fmt.Errorf("Something went wrong with log in due to the following:\n %v", err)
	}

	if err := s.repo.LogUser(ctx, payload); err != nil {
		return fmt.Errorf("%v\n", err)
	}

	return nil
}
