package models

type LoginUser struct {
	Name string `json:"name,omitempty"`
	Email string `json:"email,omitempty"`
	Password string `json:"password"`
}

type SignUpUser struct {
	Name string `json:"name"`
	Email string `json:"email"`
	Password string `json:"password"`
}
