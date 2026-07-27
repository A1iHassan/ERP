package repositories

import (
	"google.golang.org/api/gmail/v1"
)

type EmailRepository struct {
	EmailClient *gmail.Service
} 
