package main

import (
	"context"
	"os"
	"github.com/jackc/pgx/v5/pgxpool"
	"fmt"
)

func main() {
	ctx := context.Background()
	connectionString := "postgres://aha:aliPass@localhost:5432/erp"

	pool, err := pgxpool.New(ctx, connectionString)

	if err != nil {
		fmt.Printf("Failed to connect to database due to error: %v", err)
		os.Exit(1)
	}

	defer pool.Close()

	if err := pool.Ping(ctx); err != nil {
		fmt.Printf("Database not reachable due to error: %v", err)
		os.Exit(1)
	}

	// _, err = pool.Exec(ctx, "INSERT INTO assets (id, name, count) VALUES (397, 'PCs', 6), (4952, 'mouses', 30);")
	// if err != nil {
	// 	fmt.Printf("couldn't insert into 'assets' due to error: %v", err)
	// 	os.Exit(1)
	// }


	data, err := pool.Query(ctx, "SELECT id, name, count FROM assets;")
	if err != nil {
		fmt.Printf("couldn't perform query due to error: %v", err)
		os.Exit(1)
	}
	defer data.Close()

	for data.Next() {
		var id int
		var name string
		var count int

		err = data.Scan(&id, &name, &count)
		if err != nil {
			fmt.Printf("error while reading row: %v", err)
			os.Exit(1)
		}
		fmt.Printf("Row values: %v %v %v\n", id, name, count)
	}
	if err = data.Err(); err != nil {
		fmt.Printf("error during the iteration over queried data: %v", err)
		os.Exit(1)
	}
	return
}
