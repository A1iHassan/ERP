package repositories

import (
	"context"
	"errors"
	"fmt"
	"main/internal/models"

	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgxpool"
)

type AssetsRepository interface {
	GetAllAssets(ctx context.Context) ([]models.Asset, error) 
	CreateNewAsset(ctx context.Context, payload models.Asset) error
	UpdateExistingAsset(ctx context.Context, payload models.Asset) error 
	DeleteAssetById(ctx context.Context, id string) error 
}

type DBRepository struct {
	Db *pgxpool.Pool
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

func (p *DBRepository) CreateNewAsset(ctx context.Context, payload models.Asset) error {

	_, err := p.Db.Exec(ctx, "INSERT INTO assets (id, name, count) VALUES ($1, $2, $3);", payload.ID, payload.Name, payload.Count)
	if err != nil {
		var insertError *pgconn.PgError
		if errors.As(err, &insertError) && insertError.Code == "23505" {
			return fmt.Errorf("Asset ID of name already exists in database")
		}
		return fmt.Errorf("Couldn't create asset due to error: %w", err)
	}

	return nil
}

func (p *DBRepository) UpdateExistingAsset(ctx context.Context, payload models.Asset) error {

	result, err := p.Db.Exec(ctx, "UPDATE assets SET id = $1, name = $2, count = $3 WHERE id = $4;", payload.ID, payload.Name, payload.Count, payload.ID)
	if err != nil {
		return fmt.Errorf("Couldn't update data")
	}

	if result.RowsAffected() == 0 {
		return fmt.Errorf("No such record found")
	}
	return nil
}

func (p *DBRepository) DeleteAssetById(ctx context.Context, id string) error {

	result, err := p.Db.Exec(ctx, "DELETE FROM assets WHERE id = $1", id)
	if err != nil {
		return fmt.Errorf("Couldn't delete from assets")
	}

	if result.RowsAffected() == 0 {
		return fmt.Errorf("No such record exists")
	}

	return nil
}
