package repositories

import (
	"backend/internal/models"
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"time"

	"google.golang.org/api/gmail/v1"
)

type AuthenticationDB interface {
	temp()
}

type AuthenticationCache interface {
	SetSignUpWithOtp(ctx context.Context, value models.SignupDTO, otp string) error
	GetSignUpWithOtp(ctx context.Context, key string, dest interface{}) error
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

func (c *RedisReposiroty) GetSignUpWithOtp(ctx context.Context, key string, dest interface{}) error {
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
