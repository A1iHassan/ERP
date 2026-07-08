package handlers

import (
	"encoding/json"
	"fmt"
	"main/internal/models"
	"main/internal/services"
	"net/http"
	"time"
)

type AuthHadler struct {
	Svc services.AuthService
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

	signedToken, err := a.Svc.LoginService(ctx, user);

	if  err != nil {
		errrorMessage := fmt.Sprintf("Couldn't log in due to error: %v\n", err)
		http.Error(w, errrorMessage, http.StatusUnauthorized)
		return
	}

	cookie := &http.Cookie{
		Name: "access_token",
		Value: signedToken,
		Expires: time.Now().Add(time.Minute * 15),
		HttpOnly: true,
		Secure: true,
		SameSite: http.SameSiteStrictMode,
	}

	http.SetCookie(w, cookie)
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message", "Logged in"}`))
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

	if err := a.Svc.SignUpService(ctx, user); err != nil {
		errrorMessage := fmt.Sprintf("Couldn't sign up user due to error: %v\n", err)
		http.Error(w, errrorMessage, http.StatusUnprocessableEntity)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
