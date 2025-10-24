export interface BasketItem {
  mapId: string;
  mapName: string;
  mapCode: string;
  subjectName: string;
  imageUrl: string;
  price: number;
}

export interface Basket {
  id: string;
  organizationId: string;
  basketItems: BasketItem[];
}

export interface UpdateBasketRequest extends Basket {}
