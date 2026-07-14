package repositories

import "github.com/jackc/pgx/v5/pgxpool"

type UserRepository interface {}

type DBRepository struct {
	Db *pgxpool.Pool
}
