package models

import "github.com/google/uuid"

type GetUsersDTO struct {
	Id    uuid.UUID `json:"id"`
	Name  string    `json:"name"`
	Email string    `json:"email"`
}

type SingleUserDTO struct {
	Id          uuid.UUID `json:"id"`
	Name        string    `json:"name"`
	Email       string    `json:"email"`
	Role        string    `json:"role"`
	Permissions []string  `json:"permissions"`
}

type CreateUserDTO struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Role     string `json:"role"`
	Password string `json:"password"`
}

type UpdateUserDTO struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
}
