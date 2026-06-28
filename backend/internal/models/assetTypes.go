package models

type Asset struct {
	ID int `json:"id,omitempty"`
	Name string `json:"name,omitempty"`
	Count int `json:"count,omitempty"`
}
