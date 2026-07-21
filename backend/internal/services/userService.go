package services

import (
	"backend/internal/models"
	"backend/internal/repositories"
	"context"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
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

func (s *UserService) RegisterUser(ctx context.Context, userData models.CreateUserDTO) error {
	bytes, err := bcrypt.GenerateFromPassword([]byte(userData.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	payload := models.CreateUserDTO{
		Name: userData.Name,
		Email: userData.Email,
		Password: string(bytes),
		Role: userData.Role,
	}
	
	return s.Repo.Create(ctx, payload)
}

func (s *UserService) UpdateUser(ctx context.Context, payload models.UpdateUserDTO) error {
	return nil
}
