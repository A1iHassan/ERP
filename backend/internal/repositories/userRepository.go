package repositories

import (
	"backend/internal/models"
	"context"
	"fmt"
	"github.com/google/uuid"
)

type UserRepository interface {
	Get(ctx context.Context) (error, []models.GetUsersDTO)
	GetOne(ctx context.Context, userId uuid.UUID) (error, models.SingleUserDTO)
	Create(ctx context.Context) error
}

func (p *DBRepository) Get(ctx context.Context) (error, []models.GetUsersDTO) {
	var users []models.GetUsersDTO
	usersQuery, err := p.Db.Query(ctx, "SELECT id, name, email FROM users;")
	if err != nil {
		return fmt.Errorf("Internal server error"), nil
	}
	defer usersQuery.Close()

	for usersQuery.Next() {
		var user models.GetUsersDTO
		if err := usersQuery.Scan(&user.Id, &user.Name, &user.Email); err != nil {
			return fmt.Errorf("Internal server error at user level"), nil
		}

		users = append(users, user)
	}

	if err = usersQuery.Err(); err != nil {
		return fmt.Errorf("internal server error at users level"), nil
	}

	return nil, users
}

func (p *DBRepository) GetOne(ctx context.Context, userid uuid.UUID) (error, models.SingleUserDTO) {
	var user models.SingleUserDTO

	if err := p.Db.QueryRow(ctx, `SELECT users.id, users.name, users.email, roles.name, 
				      COALESCE (json_agg(permissions.name), '[]'::json) 
				      FROM users 
				      LEFT JOIN roles ON users.role_id = roles.id 
				      LEFT JOIN role_permission ON users.role_id = role_permission.role_id 
				      LEFT JOIN permissions ON role_permission.permission_id = permissions.id 
				      WHERE users.id = $1
				      GROUP BY users.id, users.name, users.email, roles.name`, 
				      userid).Scan(&user.Id, &user.Name, &user.Email, &user.Role, &user.Permissions); err != nil {
		return fmt.Errorf("%v", err), user
	}

	return nil, user
}

func (p *DBRepository) Create(ctx context.Context, payload models.CreateUserDTO) error {

	if _, err := p.Db.Exec(ctx, "INSERT INTO users"); err != nil {
		return err
	}
	return nil
}
