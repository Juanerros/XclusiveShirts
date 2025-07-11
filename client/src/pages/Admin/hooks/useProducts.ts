import { useState, useEffect } from 'react';
import { ProductService } from '../services';
import type { Product, CreateProductData } from '../services';
import useNotification from '../../../hooks/useNotification';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const notify = useNotification();

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const productsData = await ProductService.getAllProducts();
      setProducts(productsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener productos';
      setError(errorMessage);
      notify(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData: CreateProductData) => {
    setLoading(true);
    try {
      await ProductService.createProduct(productData);
      notify('Producto creado exitosamente', 'success');
      await fetchProducts(); // Recargar la lista
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear producto';
      notify(errorMessage, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: number, productData: CreateProductData) => {
    setLoading(true);
    try {
      await ProductService.updateProduct(id, productData);
      notify('Producto actualizado exitosamente', 'success');
      await fetchProducts(); // Recargar la lista
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar producto';
      notify(errorMessage, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    setLoading(true);
    try {
      await ProductService.deleteProduct(id);
      notify('Producto eliminado exitosamente', 'success');
      await fetchProducts(); // Recargar la lista
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar producto';
      notify(errorMessage, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}; 