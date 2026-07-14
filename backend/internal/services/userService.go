package services

import "backend/internal/repositories"

type UserService struct {
	Repo *repositories.DBRepository 
}

