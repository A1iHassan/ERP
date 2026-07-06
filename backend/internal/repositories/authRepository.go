package repositories

import (
	"math/big"
	"crypto/rand"
	"context"
	"fmt"
	"main/internal/models"
)

type AuthRepository interface {
	LogUser(ctx context.Context, payload models.LoginUser) error
	RegisterUser(ctx context.Context, payload models.SignUpUser) error
}


func (d *DBRepository) LogUser(ctx context.Context, payload models.LoginUser) error {

	return nil
}

func (d *DBRepository) RegisterUser(ctx context.Context, payload models.SignUpUser) error {

	max := big.NewInt(9000000)
	n, err := rand.Int(rand.Reader, max)
	if err != nil {
		return err
	}
	id := n.Int64() + 1000000
	if _, err := d.Db.Exec(ctx, "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4);", id, payload.Name, payload.Email, payload.Password); err != nil {
		return fmt.Errorf("Failed to register user due to error: %v\n", err)
	}

	return nil
}
