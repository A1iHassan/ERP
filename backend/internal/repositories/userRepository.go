package repositories

import (
	"context"
	"fmt"
)

type UserRepository interface {
	Get(ctx context.Context) (error, string)
}

func (p *DBRepository) Get(ctx context.Context) (error, string) {
	fmt.Println("this is working")
	return nil, ""
}

