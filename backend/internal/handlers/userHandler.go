package handlers

import (
	"backend/internal/services"
	"encoding/json"
	"net/http"
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

func (h *UserHandler) GetOneUser(w http.ResponseWriter, r *http.Request) {}
