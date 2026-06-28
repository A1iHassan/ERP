package services

import (
	"context"
	"fmt"
	"main/internal/models"
	"main/internal/repositories"
)

type AssetsService struct {
	repo repositories.AssetsRepository
}

func (a *AssetsService) GetAssets(ctx context.Context) ([]models.Asset, error) {
	assets, err := a.repo.GetAllAssets(ctx)
	if err != nil {
		return nil, fmt.Errorf("Failed getting assets due to error: %v", err)
	}
	return assets, nil
}
