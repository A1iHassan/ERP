package main

import (
	"context"
	"fmt"
	"main/internal/handlers"
	"main/internal/repositories"
	"main/internal/services"
	"net/http"
	"os"
	"main/internal/middleware"
	"github.com/jackc/pgx/v5/pgxpool"
)

func main() {
	ctx := context.Background()

	mux := http.NewServeMux()

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

	repo := &repositories.DBRepository{Db: pool}
	authSvc := &services.AuthService{Repo: repo}
	svc := &services.AssetsService{Repo: repo}
	handler := &handlers.AssetsHandler{Svc: *svc}

	mux.HandleFunc("GET /", handler.HandleGetAssets)
	mux.HandleFunc("POST /", handler.HandlePostAssets)
	mux.HandleFunc("PATCH /", handler.HandlePatchAssets)
	mux.HandleFunc("DELETE /{id}", handler.HandleDeleteAssets)
	mux.HandleFunc("POST /login", )
	mux.HandleFunc("POST /signup", )

	corsHandler := middleware.CORS(mux)

	srv := &http.Server{
		Addr: ":8080",
		Handler: corsHandler,
	}

	if err := srv.ListenAndServe(); err != nil {
		fmt.Printf("Couldn't start server due to error: %v", err)
		os.Exit(1)
	}
}
