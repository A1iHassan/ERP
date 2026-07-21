package handlers

import (
	"backend/internal/services"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

type UserHandler struct {
	Svc *services.UserService
}

func (h *UserHandler) GetAllUsers(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	err, users := h.Svc.GetRegisteredUsers(ctx)
	if err != nil {
		http.Error(w, "failed", http.StatusBadRequest)
	}
	
	w.Header().Set("Content-Type", "application/json")

	w.WriteHeader(http.StatusAccepted)

	if err = json.NewEncoder(w).Encode(users); err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
	}
}

func (h *UserHandler) GetOneUser(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	param := chi.URLParam(r, "id")

	userId, err := uuid.Parse(param)
	if err != nil {
		http.Error(w, "invalid url param", http.StatusBadRequest)
	}

	err, user := h.Svc.GetSingleUser(ctx, userId)
	if err != nil {
		message := fmt.Sprintf("%v\n", err)
		http.Error(w, message, http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusAccepted)

	if err = json.NewEncoder(w).Encode(user); err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
	}
}
