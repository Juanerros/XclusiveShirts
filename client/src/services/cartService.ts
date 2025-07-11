import axios from '../api/axios';
import type { Product, Color, Size } from '../pages/Catalog/services/catalogService';

export interface CartItem {
  id: string; // ID único para el item del carrito
  product: Product;
  color: Color;
  size: Size;
  quantity: number;
  price: number; // Precio al momento de agregar al carrito
}

export interface OrderItem {
  id_product: number;
  id_color: number;
  id_size: number;
  quantity: number;
  unit_price: number;
}

export interface Order {
  id_order: number;
  id_login: number;
  order_date: string;
  status: 'Pendiente' | 'Confirmado' | 'Enviado' | 'Entregado' | 'Cancelado';
  total: number;
  customer_name?: string;
  customer_email?: string;
  items?: OrderItem[];
}

class CartService {
  private cartKey = 'xclusiveshirts_cart';

  // Obtener carrito del localStorage
  getCartItems(): CartItem[] {
    try {
      const cartData = localStorage.getItem(this.cartKey);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error reading cart from localStorage:', error);
      return [];
    }
  }

  // Guardar carrito en localStorage
  private saveCart(items: CartItem[]): void {
    try {
      localStorage.setItem(this.cartKey, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }

  // Agregar item al carrito
  addToCart(product: Product, color: Color, size: Size, quantity: number = 1): CartItem {
    const items = this.getCartItems();
    
    // Crear ID único para el item
    const itemId = `${product.id_product}-${color.id_color}-${size.id_size}`;
    
    // Buscar si el item ya existe
    const existingItemIndex = items.findIndex(item => item.id === itemId);
    
    if (existingItemIndex !== -1) {
      // Actualizar cantidad del item existente
      items[existingItemIndex].quantity += quantity;
    } else {
      // Agregar nuevo item
      const newItem: CartItem = {
        id: itemId,
        product,
        color,
        size,
        quantity,
        price: product.price
      };
      items.push(newItem);
    }
    
    this.saveCart(items);
    return items.find(item => item.id === itemId)!;
  }

  // Actualizar cantidad de un item
  updateItemQuantity(itemId: string, quantity: number): void {
    const items = this.getCartItems();
    const itemIndex = items.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
      if (quantity <= 0) {
        items.splice(itemIndex, 1);
      } else {
        items[itemIndex].quantity = quantity;
      }
      this.saveCart(items);
    }
  }

  // Remover item del carrito
  removeFromCart(itemId: string): void {
    const items = this.getCartItems();
    const filteredItems = items.filter(item => item.id !== itemId);
    this.saveCart(filteredItems);
  }

  // Limpiar carrito
  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }

  // Obtener total del carrito
  getCartTotal(): number {
    const items = this.getCartItems();
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Obtener cantidad total de items
  getCartItemCount(): number {
    const items = this.getCartItems();
    return items.reduce((count, item) => count + item.quantity, 0);
  }

  // Crear pedido desde el carrito
  async createOrderFromCart(): Promise<{ success: boolean; orderId?: number; message?: string }> {
    try {
      const cartItems = this.getCartItems();
      
      if (cartItems.length === 0) {
        throw new Error('El carrito está vacío');
      }

      // Preparar items para el pedido
      const orderItems: OrderItem[] = cartItems.map(item => ({
        id_product: item.product.id_product,
        id_color: item.color.id_color,
        id_size: item.size.id_size,
        quantity: item.quantity,
        unit_price: item.price
      }));

      const total = this.getCartTotal();

      // Crear pedido en el backend
      const response = await axios.post('/orders', {
        items: orderItems,
        total: total
      });

      if (response.data.success) {
        // Limpiar carrito después de crear el pedido exitosamente
        this.clearCart();
        return {
          success: true,
          orderId: response.data.orderId,
          message: 'Pedido creado exitosamente'
        };
      } else {
        throw new Error(response.data.message || 'Error al crear el pedido');
      }
    } catch (error: any) {
      console.error('Error creating order:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Error al crear el pedido'
      };
    }
  }

  // Obtener pedidos del usuario
  async getUserOrders(): Promise<Order[]> {
    try {
      const response = await axios.get('/orders');
      if (response.data.success) {
        return response.data.orders;
      } else {
        throw new Error(response.data.message || 'Error al obtener pedidos');
      }
    } catch (error: any) {
      console.error('Error getting user orders:', error);
      throw new Error(error.response?.data?.message || 'Error al obtener pedidos');
    }
  }
}

// Exportar una instancia única del servicio
export const cartService = new CartService();
export default cartService; 