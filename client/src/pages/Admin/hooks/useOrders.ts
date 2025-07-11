import { useState, useEffect } from 'react';
import { OrderService } from '../services';
import type { Order, OrderStats } from '../services';
import useNotification from '../../../hooks/useNotification';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderStats, setOrderStats] = useState<OrderStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const notify = useNotification();

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const ordersData = await OrderService.getAllOrders();
      setOrders(ordersData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener pedidos';
      setError(errorMessage);
      notify(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const statsData = await OrderService.getOrderStats();
      setOrderStats(statsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener estadísticas';
      setError(errorMessage);
      notify(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: number, status: Order['status']) => {
    setLoading(true);
    try {
      await OrderService.updateOrderStatus(orderId, status);
      notify('Estado del pedido actualizado', 'success');
      await fetchOrders(); // Recargar la lista
      await fetchOrderStats(); // Actualizar estadísticas
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar estado';
      notify(errorMessage, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchOrderStats();
  }, []);

  return {
    orders,
    orderStats,
    loading,
    error,
    fetchOrders,
    fetchOrderStats,
    updateOrderStatus,
  };
}; 