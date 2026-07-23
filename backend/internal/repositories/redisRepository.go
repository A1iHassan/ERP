package repositories

import "github.com/redis/go-redis/v9"

type RedisReposiroty struct {
	client *redis.Client
}
