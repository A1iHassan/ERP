package repositories

type AuthenticationDB interface {
	temp()
}

type AuthenticationCache interface {
	SetPair(keyName string, otp string) error
}

type EmailingRepo interface {
	SendEmail(receiver string, subject string, body string) error
}

func (c *RedisReposiroty) SetPair(keyName string, otp string) error {
	return nil
}

func (e *EmailRepository) SendEmail(receiver string, subject string, body string) error {
	return nil
}

func (d *DBRepository) temp() {}
