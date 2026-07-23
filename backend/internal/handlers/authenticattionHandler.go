package handlers

import (
	"backend/internal/services"
	"net/http"
)

type AuthenticationHandler struct {
	Svc *services.AuthenticationService
}

func (h *AuthenticationHandler) LoginUser (w http.ResponseWriter, r *http.Request) {
}

func (h *AuthenticationHandler) SignupUser (w http.ResponseWriter, r *http.Request) {
}

func (h *AuthenticationHandler) RefreshToken (w http.ResponseWriter, r *http.Request) {
}

func (h *AuthenticationHandler) IsItMe (w http.ResponseWriter, r *http.Request) {
}
