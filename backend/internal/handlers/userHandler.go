package handlers

import "net/http"

type UserHandler struct {
	Svc *UserService
}

func (h *UserHandler) GetAllUsers(w http.ResponseWriter, r *http.Request) {}
