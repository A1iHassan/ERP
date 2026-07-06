package repositories

import (
	"context"
	"main/internal/models"
)

type AuthRepository interface {
	LogUser(ctx context.Context, payload models.LoginUser) error
}


func (d *DBRepository) LogUser(ctx context.Context, payload models.LoginUser) error {

	return nil
}
