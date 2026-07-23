package main

import (
	"context"
	"fmt"
	"net/http"
	"net/smtp"

	"backend/internal/handlers"
	"backend/internal/repositories"
	"backend/internal/services"

	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"
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
	emailRepository := &repositories.EmailRepository{
		Auth: smtp.PlainAuth("", "", "", ""),
		Sender: "ali012wkout@gmail.com",
		Host: "smtp.gmail.com:587",
		Mime: "MIME-version: 1.0;\r\nContent-Type: text/plain; charset=\"UTF-8\";\r\n\r\n",
	}
	userService := &services.UserService{Repo: dbRepository}
	userHandler := &handlers.UserHandler{Svc: userService}
	authenticationService := &services.AuthenticationService{Repo: dbRepository, Email: emailRepository}
	authenticationHandler := &handlers.AuthenticationHandler{Svc: authenticationService}

	r.Route("/users", func(r chi.Router) {
		r.Get("/", userHandler.GetAllUsers)
		r.Get("/{id}", userHandler.GetOneUser)
		r.Delete("/{id}", userHandler.DeleteOneUser)
		r.Post("/", userHandler.CreateUser)
		r.Patch("/", userHandler.UpdateExistingUser)
	})
	
	r.Route("/auth", func(r chi.Router) {
		r.Post("/signup", authenticationHandler.SignupUser)
		r.Post("/login", authenticationHandler.LoginUser)
		r.Get("/refresh", authenticationHandler.RefreshToken)
		r.Get("/me", authenticationHandler.IsItMe)
	})

	http.ListenAndServe(":8080", r)
}
