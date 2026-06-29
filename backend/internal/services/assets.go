package services

import (
	"context"
	"fmt"
	"main/internal/models"
	"main/internal/repositories"
)

type AssetsService struct {
	Repo repositories.AssetsRepository
}

func (a *AssetsService) GetAssets(ctx context.Context) ([]models.Asset, error) {
	assets, err := a.Repo.GetAllAssets(ctx)
	if err != nil {
		return nil, fmt.Errorf("Failed getting assets due to error: %v", err)
	}
	return assets, nil
}

func (a *AssetsService) CreateAssets(ctx context.Context, payload models.Asset) error {
	if err := a.Repo.CreateNewAsset(ctx, payload); err != nil {
		return err
	}
	return nil
}
