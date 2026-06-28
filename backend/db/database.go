package db

import (
	"context"
	"github.com/jackc/pgx/v5/pgxpool"
	"fmt"
)

var Pool *pgxpool.Pool

func InitiateDB(ctx context.Context) error {
	connectionString := "postgres://aha:aliPass@localhost:5432/erp"
	var err error

	Pool, err = pgxpool.New(ctx, connectionString)

	if err != nil {
		fmt.Printf("Failed to connect to database due to error: %v", err)
		return err
	}

	if err := Pool.Ping(ctx); err != nil {
		fmt.Printf("Database not reachable due to error: %v", err)
		return err
	}
	return nil
}
