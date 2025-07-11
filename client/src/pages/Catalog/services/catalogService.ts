import axios from '../../../api/axios';

export interface Product {
  id_product: number;
  name: string;
  category: string;
  price: number;
  description: string;
}

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
  color_name: string;
  size_name: string;
}

export interface ProductDetail extends Product {
  colors: Color[];
  sizes: Size[];
  stocks: StockItem[];
}

class CatalogService {
  
  // Obtener todos los productos
  async getAllProducts(): Promise<Product[]> {
    const response = await axios.get('/products/all');
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al obtener productos');
    }
    return response.data.products;
  }

  // Obtener producto con detalles completos (colores, tallas, stock)
  async getProductById(productId: number): Promise<ProductDetail | null> {
    try {
      // Obtener información básica del producto
      const productResponse = await axios.get(`/products/get/${productId}`);
      if (!productResponse.data.success) {
        throw new Error('Producto no encontrado');
      }
      const product = productResponse.data.product;

      // Obtener stock del producto
      const stockResponse = await axios.get(`/stock/product/${productId}`);
      const stocks: StockItem[] = stockResponse.data.success ? stockResponse.data.stock : [];

      // Obtener colores únicos disponibles para este producto
      const availableColorIds = [...new Set(stocks.map(s => s.id_color))];
      const colorsResponse = await axios.get('/colors/all');
      const allColors: Color[] = colorsResponse.data.success ? colorsResponse.data.colors : [];
      const availableColors = allColors.filter(c => availableColorIds.includes(c.id_color));

      // Obtener tallas únicas disponibles para este producto
      const availableSizeIds = [...new Set(stocks.map(s => s.id_size))];
      const sizesResponse = await axios.get('/sizes/all');
      const allSizes: Size[] = sizesResponse.data.success ? sizesResponse.data.sizes : [];
      const availableSizes = allSizes.filter(s => availableSizeIds.includes(s.id_size));

      return {
        ...product,
        colors: availableColors,
        sizes: availableSizes,
        stocks: stocks
      };
    } catch (error) {
      console.error('Error getting product detail:', error);
      return null;
    }
  }

  // Obtener todos los colores disponibles
  async getAllColors(): Promise<Color[]> {
    const response = await axios.get('/colors/all');
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al obtener colores');
    }
    return response.data.colors;
  }

  // Obtener todas las tallas disponibles
  async getAllSizes(): Promise<Size[]> {
    const response = await axios.get('/sizes/all');
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al obtener tallas');
    }
    return response.data.sizes;
  }

  // Verificar stock disponible para un producto específico
  getAvailableStock(productId: number, colorId: number, sizeId: number, stocks: StockItem[]): number {
    const stock = stocks.find(s => 
      s.id_product === productId && 
      s.id_color === colorId && 
      s.id_size === sizeId
    );
    return stock ? stock.stock : 0;
  }

  // Obtener productos por categoría
  async getProductsByCategory(category: string): Promise<Product[]> {
    const allProducts = await this.getAllProducts();
    return allProducts.filter(p => 
      p.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  // Buscar productos por nombre
  async searchProducts(searchTerm: string): Promise<Product[]> {
    const allProducts = await this.getAllProducts();
    return allProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Obtener categorías únicas
  async getCategories(): Promise<string[]> {
    const products = await this.getAllProducts();
    return [...new Set(products.map(p => p.category))];
  }

  // Filtrar productos por rango de precio
  async getProductsByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]> {
    const allProducts = await this.getAllProducts();
    return allProducts.filter(p => p.price >= minPrice && p.price <= maxPrice);
  }
}

// Exportar una instancia única del servicio
export const catalogService = new CatalogService();
export default catalogService; 