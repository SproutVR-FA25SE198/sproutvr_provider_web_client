import { Basket } from './basket.type';
import { Pagination } from './response.type';

export interface Order {
  id: string;
  organizationId: string;
  organizationName?: string;
  createdAtUtc: string;
  updatedAtUtc: string;
  totalItems: number;
  totalMoneyAmount: number;
  orderCode: number;
  paymentMethod: string;
  representativeName: string;
  representativePhone: string;
  bank: string;
  status: string;
}

export interface OrderItem {
  orderId: string;
  mapId: string;
  mapCode: string;
  mapName: string;
  price: number;
  imageUrl: string;
  subjectName: string;
}

export interface OrderDetails extends Order {
  orderItems: OrderItem[];
}

export interface GetOrdersResponse extends Pagination<Order> {}

export interface PlaceOrderRequest {
  organizationId: string;
  paymentMethod: string;
  representativeName: string;
  representativePhone: string;
  basket: Basket;
}

export interface PlaceOrderResponse {
  orderId: string;
  paymentUrl: string;
}
