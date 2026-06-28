package handlers

import (
	"encoding/json"
	"main/internal/services"
	"net/http"
)

type AssetsHandler struct {
	Svc services.AssetsService
}

func (h *AssetsHandler) HandleAssets(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	assets, err := h.Svc.GetAssets(ctx)
	if err != nil {
		http.Error(w, "Failed retrieving assets", http.StatusBadRequest)
		return
	}
	if err := json.NewEncoder(w).Encode(assets); err != nil {
		http.Error(w, "Queried data not formatable", http.StatusInternalServerError)
		return
	}
}
