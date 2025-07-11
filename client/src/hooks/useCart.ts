import { useState, useEffect } from 'react';
import cartService, { type CartItem, type Order } from '../services/cartService';
import type { Product, Color, Size } from '../pages/Catalog/services/catalogService';
import useNotification from './useNotification';

interface UseCartReturn {
  cartItems: CartItem[];
  cartTotal: number;
  cartItemCount: number;
  loading: boolean;
  addToCart: (product: Product, color: Color, size: Size, quantity?: number) => Promise<boolean>;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  createOrder: () => Promise<boolean>;
  refreshCart: () => void;
  orders: Order[];
  loadingOrders: boolean;
  getUserOrders: () => Promise<void>;
}

export const useCart = (): UseCartReturn => {
  const notify = useNotification();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Cargar carrito desde localStorage
  const loadCart = () => {
    const items = cartService.getCartItems();
    setCartItems(items);
    setCartTotal(cartService.getCartTotal());
    setCartItemCount(cartService.getCartItemCount());
  };

  // Agregar producto al carrito
  const addToCart = async (
    product: Product, 
    color: Color, 
    size: Size, 
    quantity: number = 1
  ): Promise<boolean> => {
    try {
      setLoading(true);
      const addedItem = cartService.addToCart(product, color, size, quantity);
      loadCart(); // Refrescar estado del carrito
      
      notify(
        `${addedItem.product.name} (${addedItem.color.name}, ${addedItem.size.name}) agregado al carrito`,
        'success'
      );
      return true;
    } catch (error: any) {
      notify(error.message || 'Error al agregar al carrito', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar cantidad de item
  const updateItemQuantity = (itemId: string, quantity: number) => {
    cartService.updateItemQuantity(itemId, quantity);
    loadCart();
    
    if (quantity === 0) {
      notify('Producto removido del carrito', 'info');
    }
  };

  // Remover item del carrito
  const removeFromCart = (itemId: string) => {
    const item = cartItems.find(item => item.id === itemId);
    cartService.removeFromCart(itemId);
    loadCart();
    
    if (item) {
      notify(`${item.product.name} removido del carrito`, 'info');
    }
  };

  // Limpiar carrito
  const clearCart = () => {
    cartService.clearCart();
    loadCart();
    notify('Carrito limpiado', 'info');
  };

  // Crear pedido desde el carrito
  const createOrder = async (): Promise<boolean> => {
    try {
      setLoading(true);
      const result = await cartService.createOrderFromCart();
      
      if (result.success) {
        loadCart(); // El carrito se limpia automáticamente
        notify(result.message || 'Pedido creado exitosamente', 'success');
        return true;
      } else {
        notify(result.message || 'Error al crear el pedido', 'error');
        return false;
      }
    } catch (error: any) {
      notify(error.message || 'Error al crear el pedido', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Refrescar carrito
  const refreshCart = () => {
    loadCart();
  };

  // Obtener pedidos del usuario
  const getUserOrders = async () => {
    try {
      setLoadingOrders(true);
      const userOrders = await cartService.getUserOrders();
      setOrders(userOrders);
    } catch (error: any) {
      notify(error.message || 'Error al cargar pedidos', 'error');
      console.error('Error loading orders:', error);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Cargar carrito al montar el componente
  useEffect(() => {
    loadCart();
  }, []);

  return {
    cartItems,
    cartTotal,
    cartItemCount,
    loading,
    addToCart,
    updateItemQuantity,
    removeFromCart,
    clearCart,
    createOrder,
    refreshCart,
    orders,
    loadingOrders,
    getUserOrders
  };
}; 