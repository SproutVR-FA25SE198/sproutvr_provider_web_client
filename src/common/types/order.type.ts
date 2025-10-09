export interface Order {
  id: string;
  organizationId: string;
  createdAt: string;
  items: number;
  totalMoney: number;
  status: string;
}
