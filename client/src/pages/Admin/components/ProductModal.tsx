import React, { useState, useEffect } from 'react';
import type { Product, CreateProductData, Color, Size } from '../services';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSubmit: (data: CreateProductData) => Promise<boolean>;
  loading: boolean;
  colors: Color[];
  sizes: Size[];
}

const ProductModal: React.FC<ProductModalProps> = ({ 
  isOpen, 
  onClose, 
  product, 
  onSubmit, 
  loading,
  colors,
  sizes
}) => {
  const [formData, setFormData] = useState<CreateProductData>({
    name: '',
    category: '',
    price: '',
    description: '',
    stocks: [],
  });

  const [stockData, setStockData] = useState<Array<{ id_color: number; id_size: number; stock: number }>>([]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: typeof product.price === 'string' ? product.price : product.price.toString(),
        description: product.description,
        stocks: product.stocks || [],
      });
      setStockData(product.stocks || []);
    } else {
      setFormData({
        name: '',
        category: '',
        price: '',
        description: '',
        stocks: [],
      });
      setStockData([]);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddStock = () => {
    setStockData(prev => [...prev, { id_color: 0, id_size: 0, stock: 0 }]);
  };

  const handleRemoveStock = (index: number) => {
    setStockData(prev => prev.filter((_, i) => i !== index));
  };

  const handleStockChange = (index: number, field: keyof typeof stockData[0], value: number) => {
    setStockData(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      stocks: stockData.filter(stock => stock.id_color > 0 && stock.id_size > 0)
    };
    
    const success = await onSubmit(dataToSubmit);
    if (success) {
      onClose();
      setFormData({
        name: '',
        category: '',
        price: '',
        description: '',
        stocks: [],
      });
      setStockData([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 py-6">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900" id="modal-title">
                {product ? 'Editar Producto' : 'Agregar Nuevo Producto'}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Product Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Producto
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Ingrese el nombre del producto"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="">Seleccione una categoría</option>
                    <option value="remera">Remera</option>
                    <option value="buzo">Buzo</option>
                    <option value="campera">Camperas</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="1"
                  step="0.01"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Ingrese la descripción del producto"
                />
              </div>

              {/* Stock Management */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Inventario por Color y Talla
                  </label>
                  <button
                    type="button"
                    onClick={handleAddStock}
                    className="px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
                  >
                    + Agregar Stock
                  </button>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {stockData.map((stock, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                      <select
                        value={stock.id_color}
                        onChange={(e) => handleStockChange(index, 'id_color', parseInt(e.target.value))}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
                      >
                        <option value={0}>Seleccionar Color</option>
                        {colors.map(color => (
                          <option key={color.id_color} value={color.id_color}>
                            {color.name}
                          </option>
                        ))}
                      </select>

                      <select
                        value={stock.id_size}
                        onChange={(e) => handleStockChange(index, 'id_size', parseInt(e.target.value))}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
                      >
                        <option value={0}>Seleccionar Talla</option>
                        {sizes.map(size => (
                          <option key={size.id_size} value={size.id_size}>
                            {size.name}
                          </option>
                        ))}
                      </select>

                      <input
                        type="number"
                        value={stock.stock}
                        onChange={(e) => handleStockChange(index, 'stock', parseInt(e.target.value) || 0)}
                        min="0"
                        placeholder="Stock"
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
                      />

                      <button
                        type="button"
                        onClick={() => handleRemoveStock(index)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </>
                  ) : (
                    product ? 'Actualizar Producto' : 'Crear Producto'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal; 