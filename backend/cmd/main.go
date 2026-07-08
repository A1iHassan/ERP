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
	authHandler := &handlers.AuthHadler{Svc: *authSvc}
	assetSvc := &services.AssetsService{Repo: repo}
	assetHandler := &handlers.AssetsHandler{Svc: *assetSvc}

	mux.HandleFunc("GET /", assetHandler.HandleGetAssets)
	mux.HandleFunc("POST /", assetHandler.HandlePostAssets)
	mux.HandleFunc("PATCH /", assetHandler.HandlePatchAssets)
	mux.HandleFunc("DELETE /{id}", assetHandler.HandleDeleteAssets)
	mux.HandleFunc("POST /signup", authHandler.HandleSighUp)
	mux.HandleFunc("POST /login", authHandler.HandleLogin)

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
