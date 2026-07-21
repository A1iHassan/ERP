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
		fmt.Printf("Failed to create db pool due to error: %v", err)
		return
	}

	defer pool.Close()

	if err = pool.Ping(ctx); err != nil {
		fmt.Printf("Database not reachable due to error: %v", err)
		return
	}

	r := chi.NewRouter()

	dbRepository := &repositories.DBRepository{Db: pool}
	userService := &services.UserService{Repo: dbRepository}
	userHandler := &handlers.UserHandler{Svc: userService}

	r.Route("/users", func(r chi.Router) {
		r.Get("/", userHandler.GetAllUsers)
		r.Get("/{id}", userHandler.GetOneUser)
		r.Delete("/{id}", userHandler.DeleteOneUser)
		r.Post("/", userHandler.CreateUser)
		r.Patch("/", userHandler.UpdateExistingUser)
	})

	http.ListenAndServe(":8080", r)
}
