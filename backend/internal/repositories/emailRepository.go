package repositories

import "net/smtp"

type EmailRepository struct {
	Auth   smtp.Auth
	Sender string
	Host   string
	Mime   string
}
