package main

import (
	"context"
	"main/db"
	"fmt"
	"os"
)

func main() {
	ctx := context.Background()

	db.InitiateDB(ctx)

	defer db.Pool.Close()

	data, err := db.Pool.Query(ctx, "SELECT id, name FROM assets;")
	if err != nil {
		fmt.Printf("Couldn't perform query due to error: %v", err)
		os.Exit(1)
	}
	
	for data.Next() {
		var id int
		var name string

		if err = data.Scan(&id, &name); err != nil {
			fmt.Printf("couldn't scan value due to error: %v", err)
			os.Exit(1)
		}
		fmt.Printf("scanned values: %v  %v\n", id, name)
	}
	if err = data.Err(); err != nil {
		fmt.Printf("error while looping over query values: %v", err)
		os.Exit(1)
	}
}
