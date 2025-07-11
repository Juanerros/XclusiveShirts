import axios from '../../../api/axios';

export interface Product {
  id_product: number;
  name: string;
  category: string;
  price: number | string; // Puede venir como string desde el servidor
  description: string;
  stocks?: Stock[];
}

export interface Stock {
  id_color: number;
  id_size: number;
  stock: number;
}

export interface CreateProductData {
  name: string;
  category: string;
  price: string;
  description: string;
  stocks: Stock[];
}

export class ProductService {
  static async getAllProducts(): Promise<Product[]> {
    const response = await axios.get('/products/all');
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al obtener productos');
    }
    return response.data.products;
  }

  static async createProduct(productData: CreateProductData): Promise<void> {
    const response = await axios.post('/products/create', productData);
    if (!response.data.success) {
      throw new Error(response.data.mensagge || 'Error al crear producto');
    }
  }

  static async updateProduct(id: number, productData: CreateProductData): Promise<void> {
    const response = await axios.put(`/products/update/${id}`, productData);
    if (!response.data.success) {
      throw new Error(response.data.mensagge || 'Error al actualizar producto');
    }
  }

  static async deleteProduct(id: number): Promise<void> {
    const response = await axios.delete(`/products/delete/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.mensagge || 'Error al eliminar producto');
    }
  }
} 