import { useState, useEffect } from 'react';
import { StockService } from '../services';
import type { Color, Size, StockItem, StockAlert } from '../services';
import useNotification from '../../../hooks/useNotification';

export const useStock = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [stockAlerts, setStockAlerts] = useState<StockAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const notify = useNotification();

  const fetchColors = async () => {
    setLoading(true);
    setError(null);
    try {
      const colorsData = await StockService.getAllColors();
      setColors(colorsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener colores';
      setError(errorMessage);
      notify(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchSizes = async () => {
    setLoading(true);
    setError(null);
    try {
      const sizesData = await StockService.getAllSizes();
      setSizes(sizesData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener tallas';
      setError(errorMessage);
      notify(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchStockAlerts = async () => {
    setLoading(true);
    setError(null);
    try {
      const alertsData = await StockService.getLowStockAlerts();
      setStockAlerts(alertsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener alertas';
      setError(errorMessage);
      notify(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateStock = async (stockId: number, newStock: number) => {
    setLoading(true);
    try {
      await StockService.updateStock(stockId, newStock);
      notify('Stock actualizado exitosamente', 'success');
      await fetchStockAlerts(); // Recargar alertas después de actualizar
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar stock';
      notify(errorMessage, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const createStock = async (data: { id_product: number; id_color: number; id_size: number; stock: number }) => {
    setLoading(true);
    try {
      await StockService.createStock(data);
      notify('Stock creado exitosamente', 'success');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear stock';
      notify(errorMessage, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColors();
    fetchSizes();
    fetchStockAlerts();
  }, []);

  return {
    colors,
    sizes,
    stockAlerts,
    loading,
    error,
    fetchColors,
    fetchSizes,
    fetchStockAlerts,
    updateStock,
    createStock,
  };
}; 