package repositories

import "github.com/jackc/pgx/v5/pgxpool"

type DBRepository struct {
	Db *pgxpool.Pool
}
