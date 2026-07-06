package models

type LoginUser struct {
	Name string `json:"name,omitempty"`
	Email string `json:"email,omitempty"`
	Password string `json:"password"`
}
