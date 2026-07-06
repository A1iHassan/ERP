package services

import (
	"context"
	"fmt"
	"main/internal/models"
	"main/internal/repositories"
)

type AuthService struct {
	repo repositories.AuthRepository
}

func (s *AuthService) LoginService(ctx context.Context, payload models.LoginUser) error {

	if err := s.repo.LogUser(ctx, payload); err != nil {
		return fmt.Errorf("%v\n", err)
	}

	return nil
}
