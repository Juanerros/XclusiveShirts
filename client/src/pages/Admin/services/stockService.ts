import axios from '../../../api/axios';

export interface Color {
  id_color: number;
  name: string;
}

export interface Size {
  id_size: number;
  name: string;
}

export interface StockItem {
  id_stock: number;
  id_product: number;
  id_color: number;
  id_size: number;
  stock: number;
  color_name?: string;
  size_name?: string;
}

export interface StockAlert {
  id_product: number;
  product_name: string;
  color_name: string;
  size_name: string;
  current_stock: number;
}

export class StockService {
  static async getAllColors(): Promise<Color[]> {
    const response = await axios.get('/colors/all');
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al obtener colores');
    }
    return response.data.colors;
  }

  static async getAllSizes(): Promise<Size[]> {
    const response = await axios.get('/sizes/all');
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al obtener tallas');
    }
    return response.data.sizes;
  }

  static async getProductStock(productId: number): Promise<StockItem[]> {
    const response = await axios.get(`/stock/product/${productId}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al obtener stock');
    }
    return response.data.stock;
  }

  static async updateStock(stockId: number, newStock: number): Promise<void> {
    const response = await axios.put(`/stock/${stockId}`, { stock: newStock });
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al actualizar stock');
    }
  }

  static async getLowStockAlerts(): Promise<StockAlert[]> {
    const response = await axios.get('/stock/alerts?threshold=5');
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al obtener alertas');
    }
    return response.data.alerts;
  }

  static async createStock(data: { id_product: number; id_color: number; id_size: number; stock: number }): Promise<void> {
    const response = await axios.post('/stock/create', data);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al crear stock');
    }
  }
} 