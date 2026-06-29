package handlers

import (
	"encoding/json"
	"fmt"
	"main/internal/models"
	"main/internal/services"
	"net/http"
)

type AssetsHandler struct {
	Svc services.AssetsService
}

func (h *AssetsHandler) HandleGetAssets(w http.ResponseWriter, r *http.Request) {
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

func (h *AssetsHandler) HandlePostAssets(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	if r.Header.Get("Content-Type") != "application/json" {
		http.Error(w, "Incompatible content type", http.StatusUnsupportedMediaType)
		return
	}

	var payload models.Asset

	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, "Corrupted payload", http.StatusUnsupportedMediaType)
		return
	}

	if err := h.Svc.CreateAssets(ctx, payload); err != nil {
		errorMessage := fmt.Sprintf("%v", err)
		http.Error(w, errorMessage, http.StatusBadRequest)
		return
	}
}

func (h *AssetsHandler) HandlePatchAssets(w http.ResponseWriter, r *http.Request) {

}

func (h *AssetsHandler) HandleDeleteAssets(w http.ResponseWriter, r *http.Request) {

}
