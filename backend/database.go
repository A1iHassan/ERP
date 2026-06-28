package main

import (
	"context"
	"os"
	"github.com/jackc/pgx/v5/pgxpool"
	"fmt"
)

func main() {
	ctx := context.Background()
	connectionString := "postgres://aha:aliPass@localhost:5432/erp"

	pool, err := pgxpool.New(ctx, connectionString)

	if err != nil {
		fmt.Printf("Failed to connect to database due to error: %v", err)
		os.Exit(1)
	}

	defer pool.Close()

	if err := pool.Ping(ctx); err != nil {
		fmt.Printf("Database not reachable due to error: %v", err)
		os.Exit(1)
	}
	
}
