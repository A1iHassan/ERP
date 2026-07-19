package models

type GetUsersDTO struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

type SingleUserDTO struct {
	Name        string   `json:"name"`
	Email       string   `json:"email"`
	Role        string   `json:"role"`
	Permissions []string `json:"permissions"`
}
