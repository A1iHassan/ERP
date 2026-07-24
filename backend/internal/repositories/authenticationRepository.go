package repositories

import "net/smtp"

type AuthenticationDB interface {
	temp()
}

type AuthenticationCache interface {
	SetPair(keyName string, otp string) error
}

type EmailingRepo interface {
	AuthProv() smtp.Auth
	MimeProv() string
	HostProv() string
	SenderProv() string
}

func (c *RedisReposiroty) SetPair(keyName string, otp string) error {
	return nil
}

func (r *EmailRepository) AuthProv() smtp.Auth{
	return r.Auth
}

func (r *EmailRepository) MimeProv() string{
	return r.Mime
}

func (r *EmailRepository) HostProv() string{
	return r.Host
}

func (r *EmailRepository) SenderProv() string{
	return r.Sender
}

func (d *DBRepository) temp() {}
