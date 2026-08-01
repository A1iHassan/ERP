package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"backend/internal/handlers"
	"backend/internal/repositories"
	"backend/internal/services"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/gmail/v1"
	"google.golang.org/api/option"
	"github.com/go-chi/cors"
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

	redisPool := redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
		DB: 0,
	})

	ctx, cancel := context.WithTimeout(context.Background(), 3 * time.Second)
	defer cancel()

	if err := redisPool.Ping(ctx).Err(); err != nil {
		fmt.Printf("Redis not reachable due to error: %v", err)
	}

	b, err := os.ReadFile("credentials.json")
	if err != nil {
		fmt.Printf("couldn't open credentials file due to error: %v\n", err)
	}

	config, err := google.ConfigFromJSON(b, gmail.GmailSendScope)
	if err != nil {
		fmt.Printf("couldn't create email config due to error: %v\n", err)
	}
	
	f, err := os.Open("token.json")
	if err != nil {
		fmt.Printf("couldn't open token file due to error: %v\n", err)
	}
	defer f.Close()

	tok := &oauth2.Token{}
	err = json.NewDecoder(f).Decode(tok)

	emailCtx := context.Background()

	client := config.Client(emailCtx, tok)
	emailClient, err := gmail.NewService(emailCtx, option.WithHTTPClient(client))
	if err != nil {
		fmt.Printf("couldn't create email client due to error: %v\n", err)
	}

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"}, // I need to add production domain upon publishing
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	dbRepository := &repositories.DBRepository{Db: pool}
	emailing := &repositories.EmailRepository{EmailClient: emailClient}
	caching := &repositories.RedisReposiroty{Cache: redisPool}
	userService := &services.UserService{Repo: dbRepository}
	userHandler := &handlers.UserHandler{Svc: userService}
	authenticationService := &services.AuthenticationService{Repo: dbRepository, Emailing: emailing, Cache: caching}
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
		r.Post("/otp", authenticationHandler.ValidateOTP)
		r.Get("/refresh", authenticationHandler.RefreshToken)
		r.Get("/me", authenticationHandler.IsItMe)
		r.Get("/", authenticationHandler.Health)
	})

	http.ListenAndServe(":8080", r)
}
