package repositories

import (
	"github.com/jackc/pgx/v5/pgconn"
	"errors"
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
	_, err = d.Db.Exec(ctx, "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4);", id, payload.Name, payload.Email, payload.Password);
	 if err != nil {
		var insertError *pgconn.PgError
		if errors.As(err, &insertError) && insertError.Code == "23505" {
			return fmt.Errorf("User ID of name already exists in database")
		}
		return fmt.Errorf("Couldn't register user due to error: %w", err)
	}

	return nil
}
