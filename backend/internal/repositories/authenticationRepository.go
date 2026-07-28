package repositories

import (
	"context"
	"encoding/base64"
	"fmt"

	"google.golang.org/api/gmail/v1"
)

type AuthenticationDB interface {
	temp()
}

type AuthenticationCache interface {
	SetPair(keyName string, otp string) error
}

type EmailingRepo interface {
	SendEmail(ctx context.Context, receiver string, subject string, body string) error
}

func (c *RedisReposiroty) SetPair(keyName string, otp string) error {
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
