package handlers

import (
	"backend/internal/models"
	"backend/internal/services"
	"encoding/json"
	// "errors"
	"fmt"
	"net/http"
	"time"

	// "github.com/golang-jwt/jwt/v5"
)

type AuthenticationHandler struct {
	Svc *services.AuthenticationService
}

func (h *AuthenticationHandler) LoginUser (w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	if r.Header.Get("Content-Type") != "application/json" {
		http.Error(w, "False request headers", http.StatusBadRequest)
		return
	}

	var payload models.SignupDTO
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, "Incompatible payload", http.StatusBadRequest)
		return
	}

	err, accessToken, refreshToken := h.Svc.CreateSession(ctx, payload)
	if err != nil {
		message := fmt.Sprintf("Couldn't log user in due to error: %v\n", err)
		http.Error(w, message, http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name: "accessToken",
		Value: accessToken,
		Expires: time.Now().Add(15 * time.Minute),
		HttpOnly: true,
		Secure: true,
		SameSite: http.SameSiteStrictMode,
	})
	 
	http.SetCookie(w, &http.Cookie{
		Name: "refreshToken",
		Value: refreshToken,
		Expires: time.Now().Add(7 * 24 * time.Hour),
		HttpOnly: true,
		Secure: true,
		SameSite: http.SameSiteStrictMode,
	})

	w.WriteHeader(http.StatusOK)
}

func (h *AuthenticationHandler) SignupUser (w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	if r.Header.Get("Content-Type") != "application/json" {
		http.Error(w, "Invalid payload", http.StatusBadRequest)
		return
	}

	var payload models.SignupDTO
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	if err := h.Svc.SendOTP(ctx, payload); err != nil {
		message := fmt.Sprintf("Failed to create user due to error: %v", err)
		http.Error(w, message, http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (h *AuthenticationHandler) ValidateOTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	if r.Header.Get("Content-Type") != "application/json" {
		http.Error(w, "Invalid payload", http.StatusBadRequest)
		return
	}

	var payload models.OtpPayload
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	if err := h.Svc.RegisterUser(ctx, payload); err != nil {
		message := fmt.Sprintf("Failed to create user due to error: %v", err)
		http.Error(w, message, http.StatusBadRequest)
		return
	} 

	w.WriteHeader(http.StatusCreated)
}

func (h *AuthenticationHandler) RefreshToken (w http.ResponseWriter, r *http.Request) {
}

func (h *AuthenticationHandler) IsItMe (w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("accessToken")
	if err != nil {
		http.Error(w, "Forbidden", http.StatusForbidden)
		return
	}

	token := cookie.Value
	ctx := r.Context()
	if err := h.Svc.ValidateToken(ctx, token); err != nil {
		http.Error(w, "Error validating the token", http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (h *AuthenticationHandler) Health(w http.ResponseWriter, r *http.Request) {
	fmt.Println(h.Svc.PrintSender())

	w.WriteHeader(http.StatusOK)
}

