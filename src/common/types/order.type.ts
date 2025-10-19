import { Pagination } from './response.type';

export interface Order {
  id: string;
  organizationId: string;
  createdAtUtc: string;
  updatedAtUtc: string;
  totalItems: number;
  totalMoneyAmount: number;
  payosOrderCode: number;
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
