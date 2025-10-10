import { MapWithSubject } from './map.type';

export interface Order {
  id: string;
  organizationId: string;
  createdAtUtc: string;
  updatedAtUtc: string;
  items: number;
  totalMoneyAmount: number;
  payosOrderCode: number;
  paymentMethod: string;
  bank: string;
  status: string;
}

export interface OrderDetails extends Order {
  orderItems: MapWithSubject[];
}
