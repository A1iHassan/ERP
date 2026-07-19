package repositories

import (
	"backend/internal/models"
	"context"
	"fmt"
)

type UserRepository interface {
	Get(ctx context.Context) (error, string)
	Create(ctx context.Context) error
}

func (p *DBRepository) Get(ctx context.Context) (error, []models.GetUsersDTO) {
	var users []models.GetUsersDTO
	usersQuery, err := p.Db.Query(ctx, "SELECT name, email FROM users;")
	if err != nil {
		return fmt.Errorf("Internal server error"), nil
	}
	defer usersQuery.Close()

	for usersQuery.Next() {
		var user models.GetUsersDTO
		if err := usersQuery.Scan(&user.Name, &user.Email); err != nil {
			return fmt.Errorf("Internal server error at user level"), nil
		}

		users = append(users, user)
	}

	if err = usersQuery.Err(); err != nil {
		return fmt.Errorf("internal server error at users level"), nil
	}

	return nil, users
}

