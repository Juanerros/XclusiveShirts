import { useState, useEffect } from 'react';
import type { ProductDetail, Color, Size } from '../services/catalogService';
import catalogService from '../services/catalogService';
import useNotification from '../../../hooks/useNotification';

interface UseProductDetailReturn {
  product: ProductDetail | null;
  loading: boolean;
  error: string | null;
  selectedColor: Color | null;
  selectedSize: Size | null;
  availableStock: number;
  setSelectedColor: (color: Color | null) => void;
  setSelectedSize: (size: Size | null) => void;
  canAddToCart: boolean;
  refreshProduct: () => Promise<void>;
}

export const useProductDetail = (productId: number): UseProductDetailReturn => {
  const notify = useNotification();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [availableStock, setAvailableStock] = useState(0);

  // Cargar producto
  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await catalogService.getProductById(productId);
      
      if (!data) {
        throw new Error('Producto no encontrado');
      }
      
      setProduct(data);
      
      // Seleccionar automáticamente el primer color y talla disponibles
      if (data.colors.length > 0) {
        setSelectedColor(data.colors[0]);
      }
      if (data.sizes.length > 0) {
        setSelectedSize(data.sizes[0]);
      }
      
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cargar el producto';
      setError(errorMessage);
      notify(errorMessage, 'error');
      console.error('Error loading product:', err);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar stock disponible cuando cambien color o talla
  const updateAvailableStock = () => {
    if (selectedColor && selectedSize && product) {
      const stock = catalogService.getAvailableStock(
        product.id_product,
        selectedColor.id_color,
        selectedSize.id_size,
        product.stocks
      );
      setAvailableStock(stock);
    } else {
      setAvailableStock(0);
    }
  };

  // Verificar si se puede agregar al carrito
  const canAddToCart = Boolean(
    selectedColor && 
    selectedSize && 
    availableStock > 0
  );

  // Refrescar producto
  const refreshProduct = async () => {
    await loadProduct();
  };

  // Cargar producto al montar o cambiar ID
  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  // Actualizar stock cuando cambien las selecciones
  useEffect(() => {
    updateAvailableStock();
  }, [selectedColor, selectedSize, product]);

  return {
    product,
    loading,
    error,
    selectedColor,
    selectedSize,
    availableStock,
    setSelectedColor,
    setSelectedSize,
    canAddToCart,
    refreshProduct
  };
}; 