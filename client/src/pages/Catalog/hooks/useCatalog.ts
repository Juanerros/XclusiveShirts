import { useState, useEffect } from 'react';
import type { Product } from '../services/catalogService';
import catalogService from '../services/catalogService';
import useNotification from '../../../hooks/useNotification';

interface UseCatalogReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory: string;
  priceRange: [number, number];
  categories: string[];
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
  resetFilters: () => void;
  refreshProducts: () => Promise<void>;
}

export const useCatalog = (): UseCatalogReturn => {
  const notify = useNotification();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [categories, setCategories] = useState<string[]>([]);

  // Cargar categorías
  const loadCategories = async () => {
    try {
      const cats = await catalogService.getCategories();
      setCategories(cats);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  // Cargar productos iniciales
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await catalogService.getAllProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err: any) {
      const errorMessage = 'Error al cargar productos';
      setError(errorMessage);
      notify(errorMessage, 'error');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Aplicar filtros
  const applyFilters = () => {
    let filtered = [...products];

    // Filtro por búsqueda
    if (searchTerm.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por categoría
    if (selectedCategory && selectedCategory !== '') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filtro por rango de precio
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  };

  // Resetear filtros
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange([0, 10000]);
  };

  // Refrescar productos
  const refreshProducts = async () => {
    await loadProducts();
  };

  // Cargar productos y categorías al montar el componente
  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  // Aplicar filtros cuando cambien
  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedCategory, priceRange, products]);

  return {
    products: filteredProducts,
    loading,
    error,
    searchTerm,
    selectedCategory,
    priceRange,
    categories,
    setSearchTerm,
    setSelectedCategory,
    setPriceRange,
    resetFilters,
    refreshProducts
  };
}; 