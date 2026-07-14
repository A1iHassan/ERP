package handlers

import (
	"net/http"
	"backend/internal/services"
)

type UserHandler struct {
	Svc *services.UserService
}

func (h *UserHandler) GetAllUsers(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	if err := h.Svc.GetRegisteredUsers(ctx); err != nil {
		http.Error(w, "failed", http.StatusBadRequest)
		return
	}
}
