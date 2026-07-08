package services

import (
	"context"
	"fmt"
	"main/internal/models"
	"main/internal/repositories"

	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	Repo repositories.AuthRepository
}

func (a *AuthService) LoginService(ctx context.Context, payload models.LoginUser) error {
	if err := a.Repo.LogUser(ctx, payload); err != nil {
		return err
	}
	return nil
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
