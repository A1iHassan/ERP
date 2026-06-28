package assets

import "context"

type AssetsService struct {
	repo AssetsRepository
}

func (a *AssetsService) GetAssets(ctx context.Context) (Assets, error) {

}
