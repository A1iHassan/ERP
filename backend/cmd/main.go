package main

import (
	"context"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"backend/internal/handlers"
	"backend/internal/services"
	"backend/internal/repositories"
)

func main() {
	ctx := context.Background()

	pool, err := pgxpool.New(ctx, "postgres://aha:aliPass@localhost:5432/erp")
	if err != nil {
		fmt.Errorf("Failed to create db pool due to error: %v", err)
		return
	}

	defer pool.Close()

	if err = pool.Ping(ctx); err != nil {
		fmt.Errorf("Database not reachable due to error: %v", err)
		return
	}

	r := chi.NewRouter()

	userRepository := &repositories.DBRepository{Db: pool}
	userService := &services.UserService{Repo: userRepository}
	userHandler := &handlers.UserHandler{Svc: userService}

	r.Route("/users", func(r chi.Router) {
		r.Get("/", userHandler.GetAllUsers)
	})

	http.ListenAndServe(":8080", r)
}
