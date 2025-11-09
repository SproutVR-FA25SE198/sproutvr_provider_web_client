import { Basket } from '@/common/types/basket.type';

export interface BasketState {
  basket: Basket;
  isLoading: boolean;
  error: string | null;
}
