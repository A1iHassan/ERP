package repositories

import (
	"context"
	"fmt"
	"main/internal/models"

	"github.com/jackc/pgx/v5/pgxpool"
)

type AssetsRepository interface {
	GetAllAssets(ctx context.Context) ([]models.Asset, error)
}

type DBRepository struct {
	Db pgxpool.Pool
}

func (p *DBRepository) GetAllAssets(ctx context.Context) ([]models.Asset, error) {
	assets, err := p.Db.Query(ctx, "SELECT id, name, count FROM assets;")
	if err != nil {
		return nil, fmt.Errorf("couldn't perform query due to error: %v", err)
	}

	defer assets.Close()

	var queriedAssets []models.Asset

	for assets.Next() {
		var a models.Asset
		if err = assets.Scan(&a.ID, &a.Name, &a.Count); err != nil {
			return nil, fmt.Errorf("couldn't parse database due to error: %v", err)
		}
		queriedAssets = append(queriedAssets, a)
	}

	if err := assets.Err(); err != nil {
		return nil, fmt.Errorf("assets iteration error: %v", err)
	}
	return queriedAssets, nil
}
