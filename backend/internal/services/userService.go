package services

import (
	"backend/internal/models"
	"backend/internal/repositories"
	"context"
)

type UserService struct {
	Repo *repositories.DBRepository 
}

func (s *UserService) GetRegisteredUsers(ctx context.Context) (error, []models.UserDTO) {
	return s.Repo.Get(ctx)
}

