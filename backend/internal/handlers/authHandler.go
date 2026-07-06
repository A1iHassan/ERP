package handlers

import (
	"encoding/json"
	"fmt"
	"main/internal/models"
	"net/http"
)

type AuthHadler struct {
	svc AuthService
}

func (a *AuthHadler) HandleLogin(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	
	if r.Header.Get("Content-Type") != "application/json" {
		http.Error(w, "Incompatible Body", http.StatusBadRequest)
		return
	}

	var user models.LoginUser

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid Body", http.StatusBadRequest)
		return
	}

	if err := a.svc.LoginService(ctx, user); err != nil {
		errrorMessage := fmt.Sprintf("Couldn't log in due to error: %v\n", err)
		http.Error(w, errrorMessage, http.StatusUnauthorized)
		return
	}


}

func (a *AuthHadler) HandleSighUp(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	if r.Header.Get("Content-Type") != "application/json" {
		http.Error(w, "Incompatible Body", http.StatusBadRequest)
		return
	}

	var user models.SignUpUser

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid Body", http.StatusBadRequest)
		return
	}

	if err := a.svc.SignUpService(ctx, user); err != nil {
		errrorMessage := fmt.Sprintf("Couldn't sign up user due to error: %v\n", err)
		http.Error(w, errrorMessage, http.StatusUnprocessableEntity)
		return
	}
}
