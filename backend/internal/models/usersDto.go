package models

import (
	"time"

	"github.com/google/uuid"
)

type UserDTO struct {
	ID        uuid.UUID `json:"id,omitempty"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Password  string    `json:"password,omitempty"`
	CreatedAt time.Time `json:"created_at,omitempty"`
	UpdatedAt time.Time `json:"updated_at,omitempty"`
}
