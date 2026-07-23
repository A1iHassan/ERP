package services

import (
	"backend/internal/models"
	"backend/internal/repositories"
	"context"
)

type AuthenticationService struct {
	Repo *repositories.DBRepository
	Email *repositories.EmailRepository
}

func (s *AuthenticationService) SignupNewUser(ctx context.Context, payload models.SignupDTO) error {
	return nil
}
