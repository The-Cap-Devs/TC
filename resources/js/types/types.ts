export enum OrderStatus {
  PENDING = 'pendiente',
  DELIVERED = 'entregado',
  CANCELLED = 'cancelado'
}

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  stock: number;
  image: string;
  reference: string;
  width?: number;
  height?: number;
  sales: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalSpent: number;
  address: string;
  city: string;
  zipcode: string;
  lastSeen: string;
  ordersCount: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  reference: string;
  date: string;
  customer: Customer;
  status: OrderStatus;
  total: number;
  taxes: number;
  deliveryFees: number;
  items: OrderItem[];
}

export interface Review {
  id: string;
  customer: Customer;
  productName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface MonthlyRevenue {
  name: string;
  revenue: number;
}