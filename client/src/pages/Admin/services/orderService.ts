import axios from '../../../api/axios';

export interface Order {
  id_order: number;
  id_login: number;
  user_name: string;
  user_email: string;
  total_amount: number;
  status: 'pendiente' | 'confirmado' | 'enviado' | 'entregado' | 'cancelado';
  order_date: string;
  delivery_address: string;
  phone: string;
  notes: string;
  items: OrderItem[];
}

export interface OrderItem {
  id_order_item: number;
  id_product: number;
  product_name: string;
  id_color: number;
  color_name: string;
  id_size: number;
  size_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface OrderStats {
  total_orders: number;
  pending_orders: number;
  total_revenue: number;
  recent_orders: Order[];
}

export class OrderService {
  static async getAllOrders(): Promise<Order[]> {
    const response = await axios.get('/orders');
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al obtener pedidos');
    }
    return response.data.orders;
  }

  static async getOrderById(orderId: number): Promise<Order> {
    const response = await axios.get(`/orders/${orderId}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al obtener pedido');
    }
    return response.data.order;
  }

  static async updateOrderStatus(orderId: number, status: Order['status']): Promise<void> {
    const response = await axios.patch(`/orders/${orderId}/status`, { status });
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al actualizar estado');
    }
  }

  static async getOrderStats(): Promise<OrderStats> {
    const response = await axios.get('/orders/stats');
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al obtener estadísticas');
    }
    return response.data.stats;
  }
} 