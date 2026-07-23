package services

import "backend/internal/repositories"

type AuthenticationService struct {
	Repo *repositories.DBRepository
}
