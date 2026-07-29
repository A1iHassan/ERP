package repositories

import (
	"backend/internal/models"
	"context"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
	"google.golang.org/api/gmail/v1"
)

type AuthenticationDB interface {
	temp()
	CreateUserRole(ctx context.Context, payload models.CreateUserDTO) error 
	UserExists(ctx context.Context, email string) (error, string)
}

type AuthenticationCache interface {
	SetSignUpWithOtp(ctx context.Context, value models.SignupDTO, otp string) error
	GetSignUpWithOtp(ctx context.Context, key string, dest *models.CachedSignUp) error
}

type EmailingRepo interface {
	SendEmail(ctx context.Context, receiver string, subject string, body string) error
}

func (c *RedisReposiroty) SetSignUpWithOtp(ctx context.Context, value models.SignupDTO, otp string) error {
	cachedData := models.CachedSignUp{
		Name: value.Name,
		Email: value.Email,
		Password: value.Password,
		Otp: otp,
	}
	data, err := json.Marshal(cachedData)
	if err != nil {
		return fmt.Errorf("Couldn't prepare otp data for cache due to error: %v\n", err)
	}

	if err := c.Cache.Set(ctx, otp, data, 5 * time.Minute).Err(); err != nil {
		return fmt.Errorf("Couldn't cache data due to error: %v\n", err)
	}

	return nil
}

func (c *RedisReposiroty) GetSignUpWithOtp(ctx context.Context, key string, dest *models.CachedSignUp) error {
	value, err := c.Cache.Get(ctx, key).Bytes()
	if err != nil {
		if errors.Is(err, redis.Nil) {
			return fmt.Errorf("Key not found")
		}
		return fmt.Errorf("Couldn't retrieve key/value pair due to error: %v\n", err)
	}

	if err := json.Unmarshal(value, dest); err != nil {
		return fmt.Errorf("Couldn't validate retrieved data due to error: %v\n", err)
	}
	return nil
}

func (e *EmailRepository) SendEmail(ctx context.Context, receiver string, subject string, body string) error {
	msgString := fmt.Sprintf("From: %s\r\nTo: %s\r\nSubject: %s\r\n%s",
		"ali012wkout@gmail.com", receiver, subject, body)

	gMsg := &gmail.Message{
		Raw: base64.URLEncoding.EncodeToString([]byte(msgString)),
	}

	_, err := e.EmailClient.Users.Messages.Send("me", gMsg).Context(ctx).Do()
	return err
}

func (d *DBRepository) temp() {}

func (d *DBRepository) CreateUserRole(ctx context.Context, payload models.CreateUserDTO) error {
	_, err := d.Db.Exec(ctx, `
		INSERT INTO users (name, email, password, role_id)
		VALUES ($1, $2, $3, (SELECT id FROM roles WHERE name = $4))
	`, payload.Name, payload.Email, payload.Password, payload.Role)
	if err != nil {
		return fmt.Errorf("Couldn't create user due to error: %v\n", err)
	}
	return nil 
}

func (d *DBRepository) UserExists(ctx context.Context, email string) (error, string) {
	var password string
	if err := d.Db.QueryRow(ctx, "SELECT (password) FROM users WHERE email = $1", email).Scan(&password); err != nil {
		return fmt.Errorf("Couldn't find user due to error: %v\n", err), password
	}
		
	return nil, password
}
