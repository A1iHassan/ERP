package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/gmail/v1"
)

func main() {
	b, err := os.ReadFile("credentials.json")
	if err != nil {
		log.Fatalf("Fatal: unable to read client secret file: %v", err)
	}

	// Request Offline access to receive a refresh token.
	config, err := google.ConfigFromJSON(b, gmail.GmailSendScope)
	if err != nil {
		log.Fatalf("Fatal: unable to parse client secret file: %v", err)
	}

	authURL := config.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	fmt.Printf("1. Open this URL in your browser:\n\n%v\n\n", authURL)
	fmt.Print("2. Authorize the application and paste the returned auth code here: ")

	var authCode string
	if _, err := fmt.Scan(&authCode); err != nil {
		log.Fatalf("Fatal: unable to read authorization code: %v", err)
	}

	tok, err := config.Exchange(context.Background(), authCode)
	if err != nil {
		log.Fatalf("Fatal: unable to retrieve token: %v", err)
	}

	saveToken("token.json", tok)
}

func saveToken(path string, token *oauth2.Token) {
	f, err := os.OpenFile(path, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0600)
	if err != nil {
		log.Fatalf("Fatal: unable to cache oauth token: %v", err)
	}
	defer f.Close()
	
	if err := json.NewEncoder(f).Encode(token); err != nil {
		log.Fatalf("Fatal: failed to encode token: %v", err)
	}
	fmt.Printf("Success: Token saved to %s\n", path)
}
