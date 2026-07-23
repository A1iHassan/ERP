package repositories

type AuthenticationRepository interface {
	SetPair(keyName string, otp string) error
}

func (r *RedisReposiroty) SetPair(keyName string, otp string) error {
	return nil
}
