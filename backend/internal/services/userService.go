package services

import (
	"backend/internal/repositories"
	"context"
	"fmt"
)

type UserService struct {
	Repo *repositories.DBRepository 
}

func (s *UserService) GetRegisteredUsers(ctx context.Context) error {
	err, text := s.Repo.Get(ctx)
	if err != nil {
		return err
	}
	fmt.Print(text)
	return nil
}

