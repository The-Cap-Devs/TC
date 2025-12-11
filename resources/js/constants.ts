import { Customer, Order, OrderStatus, Review, MonthlyRevenue, Product, Category } from '../js/types/types';

export const REVENUE_DATA: MonthlyRevenue[] = [
  { name: 'Abr', revenue: 2000 },
  { name: 'May', revenue: 4500 },
  { name: 'Jun', revenue: 3800 },
  { name: 'Jul', revenue: 5200 },
  { name: 'Ago', revenue: 4800 },
  { name: 'Sep', revenue: 6100 },
  { name: 'Oct', revenue: 5500 },
  { name: 'Nov', revenue: 6800 },
  { name: 'Dic', revenue: 8400 },
];

export const CATEGORIES: Category[] = [
    { id: 'c1', name: 'animals' },
    { id: 'c2', name: 'beard' },
    { id: 'c3', name: 'business' },
    { id: 'c4', name: 'cars' },
    { id: 'c5', name: 'city' },
];

export const PRODUCTS: Product[] = [
  { id: 'p1', reference: 'POST-80s', categoryId: 'c2', name: 'Póster Vintage 1980', price: 22.50, stock: 15, image: 'https://marmelab.com/posters/beard-1.jpeg', sales: 120, width: 30, height: 40 },
  { id: 'p2', reference: 'ABS-004', categoryId: 'c5', name: 'Lámina Abstracta #4', price: 45.00, stock: 4, image: 'https://marmelab.com/posters/city-2.jpeg', sales: 85, width: 50, height: 70 },
  { id: 'p3', reference: 'MAP-WORLD', categoryId: 'c3', name: 'Mapa Mundi Clásico', price: 35.00, stock: 22, image: 'https://marmelab.com/posters/business-3.jpeg', sales: 340, width: 60, height: 90 },
  { id: 'p4', reference: 'MOV-PULP', categoryId: 'c1', name: 'Pulp Fiction Fan Art', price: 19.99, stock: 0, image: 'https://marmelab.com/posters/animals-4.jpeg', sales: 12, width: 30, height: 40 },
  { id: 'p5', reference: 'NAT-FOREST', categoryId: 'c4', name: 'Bosque Profundo', price: 28.00, stock: 10, image: 'https://marmelab.com/posters/cars-5.jpeg', sales: 67, width: 40, height: 50 },
  { id: 'p6', reference: 'GEO-SHAPES', categoryId: 'c5', name: 'Formas Geométricas', price: 32.50, stock: 8, image: 'https://marmelab.com/posters/city-6.jpeg', sales: 45, width: 50, height: 50 },
];

const customers: Customer[] = [
  { id: '1', name: 'Ana García', email: 'ana.garcia@email.com', avatar: 'https://picsum.photos/id/64/100/100', totalSpent: 120.50, address: 'Calle Mayor 123', city: 'Madrid', zipcode: '28001', lastSeen: '2023-10-25', ordersCount: 5 },
  { id: '2', name: 'Carlos López', email: 'carlos.l@email.com', avatar: 'https://picsum.photos/id/91/100/100', totalSpent: 340.00, address: 'Av. Diagonal 45', city: 'Barcelona', zipcode: '08005', lastSeen: '2023-10-24', ordersCount: 12 },
  { id: '3', name: 'María Rodríguez', email: 'maria.r@email.com', avatar: 'https://picsum.photos/id/177/100/100', totalSpent: 89.99, address: 'Plaza España 1', city: 'Sevilla', zipcode: '41001', lastSeen: '2023-10-22', ordersCount: 2 },
  { id: '4', name: 'Juan Pérez', email: 'juan.p@email.com', avatar: 'https://picsum.photos/id/237/100/100', totalSpent: 550.25, address: 'Rúa do Franco 10', city: 'Santiago', zipcode: '15705', lastSeen: '2023-10-23', ordersCount: 8 },
  { id: '5', name: 'Laura Martínez', email: 'laura.m@email.com', avatar: 'https://picsum.photos/id/338/100/100', totalSpent: 210.00, address: 'Gran Vía 32', city: 'Bilbao', zipcode: '48009', lastSeen: '2023-10-21', ordersCount: 4 },
];

export const CUSTOMERS = customers;

export const RECENT_ORDERS: Order[] = [
  { 
    id: '101', 
    reference: 'ORD-001', 
    date: '2023-10-25', 
    customer: customers[0], 
    status: OrderStatus.PENDING, 
    total: 45.00, 
    taxes: 5.00,
    deliveryFees: 5.00,
    items: [
      { productId: 'p1', productName: 'Póster Vintage 1980', quantity: 1, unitPrice: 22.50 },
      { productId: 'p5', productName: 'Bosque Profundo', quantity: 1, unitPrice: 12.50 } // discounted logic implied
    ]
  },
  { 
    id: '102', 
    reference: 'ORD-002', 
    date: '2023-10-24', 
    customer: customers[1], 
    status: OrderStatus.DELIVERED, 
    total: 120.50, 
    taxes: 20.50,
    deliveryFees: 0.00,
    items: [
       { productId: 'p2', productName: 'Lámina Abstracta #4', quantity: 2, unitPrice: 45.00 },
       { productId: 'p6', productName: 'Formas Geométricas', quantity: 1, unitPrice: 10.00 }
    ]
  },
  { 
    id: '103', 
    reference: 'ORD-003', 
    date: '2023-10-24', 
    customer: customers[2], 
    status: OrderStatus.CANCELLED, 
    total: 15.99,
    taxes: 3.00,
    deliveryFees: 2.99, 
    items: [
      { productId: 'p4', productName: 'Pulp Fiction Fan Art', quantity: 1, unitPrice: 10.00 }
    ]
  },
  { 
    id: '104', 
    reference: 'ORD-004', 
    date: '2023-10-23', 
    customer: customers[3], 
    status: OrderStatus.DELIVERED, 
    total: 340.00,
    taxes: 60.00,
    deliveryFees: 0.00, 
    items: [
      { productId: 'p3', productName: 'Mapa Mundi Clásico', quantity: 4, unitPrice: 35.00 },
      { productId: 'p2', productName: 'Lámina Abstracta #4', quantity: 3, unitPrice: 45.00 }
    ]
  },
  { 
    id: '105', 
    reference: 'ORD-005', 
    date: '2023-10-22', 
    customer: customers[4], 
    status: OrderStatus.PENDING, 
    total: 65.00,
    taxes: 12.00,
    deliveryFees: 5.00, 
    items: [
      { productId: 'p6', productName: 'Formas Geométricas', quantity: 1, unitPrice: 32.50 },
      { productId: 'p1', productName: 'Póster Vintage 1980', quantity: 1, unitPrice: 15.50 }
    ]
  },
];

export const PENDING_REVIEWS: Review[] = [
  { 
    id: 'r1', 
    customer: customers[0], 
    productName: 'Póster Vintage 1980', 
    rating: 5, 
    comment: '¡Me encanta! La calidad del papel es increíble y los colores son muy vivos.', 
    date: 'Hace 5 min',
    status: 'pending'
  },
  { 
    id: 'r2', 
    customer: customers[3], 
    productName: 'Lámina Abstracta #4', 
    rating: 2, 
    comment: 'Llegó un poco arrugado en la esquina y el marco no estaba incluido.', 
    date: 'Hace 2 horas',
    status: 'pending'
  },
  { 
    id: 'r3', 
    customer: customers[1], 
    productName: 'Mapa Mundi Clásico', 
    rating: 4, 
    comment: 'Muy buen detalle, envío rápido. Volveré a comprar seguro.', 
    date: 'Hace 1 día',
    status: 'accepted'
  },
  { 
    id: 'r4', 
    customer: customers[4], 
    productName: 'Bosque Profundo', 
    rating: 5, 
    comment: 'Espectacular, queda perfecto en mi salón.', 
    date: 'Hace 3 días',
    status: 'pending'
  },
  { 
    id: 'r5', 
    customer: customers[2], 
    productName: 'Formas Geométricas', 
    rating: 1, 
    comment: 'No es lo que esperaba, los colores no coinciden con la web.', 
    date: 'Hace 1 semana',
    status: 'rejected'
  },
];