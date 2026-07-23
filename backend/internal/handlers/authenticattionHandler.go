package handlers

import (
	"backend/internal/models"
	"backend/internal/services"
	"encoding/json"
	"net/http"
)

type AuthenticationHandler struct {
	Svc *services.AuthenticationService
}

func (h *AuthenticationHandler) LoginUser (w http.ResponseWriter, r *http.Request) {
}

func (h *AuthenticationHandler) SignupUser (w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	if r.Header.Get("Cotent-Type") != "application/json" {
		http.Error(w, "Invalid payload", http.StatusBadRequest)
		return
	}

	var payload models.SignupDTO
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	if err := h.Svc.SignupNewUser(ctx, payload); err != nil {
		http.Error(w, "Failed to create user", http.StatusBadRequest)
		return
	}
}

func (h *AuthenticationHandler) RefreshToken (w http.ResponseWriter, r *http.Request) {
}

func (h *AuthenticationHandler) IsItMe (w http.ResponseWriter, r *http.Request) {
}
