import { Basket, UpdateBasketRequest } from '@/common/types/basket.type';

export const GET_ORDERS_QUERY_KEY = 'GET_ORDERS_QUERY_KEY';
export const GET_ORDER_BY_ID_QUERY_KEY = 'GET_ORDER_BY_ID_QUERY_KEY';
export const GET_ORDERS_STALE_TIME = 5 * 60 * 1000; // 5 minutes

const BASKET_STORAGE_KEY = 'sproutvr_basket';

// Helper to get all baskets from localStorage
const getAllBaskets = (): Record<string, Basket> => {
  try {
    const stored = localStorage.getItem(BASKET_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

// Helper to save all baskets to localStorage
const saveAllBaskets = (baskets: Record<string, Basket>): void => {
  localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(baskets));
};

const getBasket = (orgId: string): Promise<{ data: Basket }> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const baskets = getAllBaskets();
      const basket = baskets[orgId] || {
        id: crypto.randomUUID(),
        organizationId: orgId,
        basketItems: [],
      };
      resolve({ data: basket });
    }, 100);
  });
};

const updateBasket = (basket: UpdateBasketRequest): Promise<{ data: Basket }> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const baskets = getAllBaskets();

      // Ensure basket has an id
      const updatedBasket: Basket = {
        ...basket,
        id: basket.id || crypto.randomUUID(),
      };

      // Save to localStorage
      baskets[basket.organizationId] = updatedBasket;
      saveAllBaskets(baskets);

      resolve({ data: updatedBasket });
    }, 100);
  });
};

// Helper to clear basket (useful for after order placement)
const clearBasket = (orgId: string): Promise<{ data: Basket }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const baskets = getAllBaskets();
      const emptyBasket: Basket = {
        id: baskets[orgId]?.id || crypto.randomUUID(),
        organizationId: orgId,
        basketItems: [],
      };
      baskets[orgId] = emptyBasket;
      saveAllBaskets(baskets);
      resolve({ data: emptyBasket });
    }, 100);
  });
};

export const basketService = {
  getBasket,
  updateBasket,
  clearBasket,
};
