import { BasketItem } from '@/common/types/basket.type';
import { RootState } from '@/core/store';
import { useAppDispatch } from '@/core/store/hooks';

import { useSelector } from 'react-redux';

import { updateBasketThunk } from '../stores/basketStore/basketThunks';


const useBaskets = () => {
  const { basket, isLoading, error } = useSelector((state: RootState) => state.root.basket);

  const dispatch = useAppDispatch();

  const addItem = (item: BasketItem) => {
    const updatedBasket = {
      ...basket,
      basketItems: [...basket.basketItems, item],
    };
    dispatch(updateBasketThunk(updatedBasket));
  };

  const removeItem = (itemId: string) => {
    const updatedBasket = {
      ...basket,
      basketItems: basket.basketItems.filter((item) => item.mapId !== itemId),
    };
    dispatch(updateBasketThunk(updatedBasket));
  };

  const clearBasket = () => {
    const updatedBasket = {
      ...basket,
      basketItems: [],
    };
    dispatch(updateBasketThunk(updatedBasket));
  };

  const basketCount = Object.keys(basket).length > 0 ? basket.basketItems.length : 0;
  const basketTotal =
    Object.keys(basket).length > 0 ? basket.basketItems.reduce((sum, item) => sum + item.price, 0) : 0;
  const basketItems = Object.keys(basket).length > 0 ? basket.basketItems : [];
  return {
    basket,
    basketCount,
    basketTotal,
    basketItems,
    isLoading,
    error,
    addItem,
    removeItem,
    clearBasket,
  };
};

export default useBaskets;
