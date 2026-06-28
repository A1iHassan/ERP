package main

import (
	"context"
	"fmt"
	"main/internal/handlers"
	"main/internal/repositories"
	"main/internal/services"
	"net/http"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

func main() {
	ctx := context.Background()

	pool, err := pgxpool.New(ctx, "postgres://aha:aliPass@localhost:5432/erp")
	if err != nil {
		fmt.Printf("Couldn't create database pool due to error: %v", err)
		os.Exit(1)
	}

	defer pool.Close()

	if err = pool.Ping(ctx); err != nil {
		fmt.Printf("Database not reachable due to error: %v", err)
		os.Exit(1)
	}

	repo := &repositories.DBRepository{Db: *pool}
	svc := &services.AssetsService{Repo: repo}
	handler := &handlers.AssetsHandler{Svc: svc}

	http.HandleFunc("/", handler.HandleAssets)

	if err := http.ListenAndServe(":8080", nil); err != nil {
		fmt.Printf("Couldn't start server due to error: %v", err)
		os.Exit(1)
	}
}
