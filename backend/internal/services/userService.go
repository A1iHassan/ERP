package services

import (
	"backend/internal/models"
	"backend/internal/repositories"
	"context"

	"github.com/google/uuid"
)

type UserService struct {
	Repo *repositories.DBRepository 
}

func (s *UserService) GetRegisteredUsers(ctx context.Context) (error, []models.GetUsersDTO) {
	return s.Repo.Get(ctx)
}

func (s *UserService) GetSingleUser(ctx context.Context, userid uuid.UUID) (error, models.SingleUserDTO) {
	return s.Repo.GetOne(ctx, userid)
}
