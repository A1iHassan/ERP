package models

type SignupDTO struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type CachedSignUp struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"` 
	Otp      string `json:"otp"`
}

type OtpPayload struct {
	Otp string `json:"otp"`
}

