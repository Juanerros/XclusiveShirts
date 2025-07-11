import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../services/mockData';
import useNotification from '../../../hooks/useNotification';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const navigate = useNavigate();
  const notify = useNotification();

  const handleViewDetails = () => {
    navigate(`/product/${product.id_product}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    notify('Funcionalidad de carrito no implementada', 'info');
  };

  return (
    <div 
      className={`group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${className}`}
      onClick={handleViewDetails}
    >
      {/* Imagen del producto */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Indicador de categoría */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black text-white">
            {product.category}
          </span>
        </div>

        {/* Botón de acción rápida en hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button 
            onClick={handleAddToCart}
            className="bg-white text-black px-4 py-2 rounded-lg font-medium transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-100"
          >
            Vista Rápida
          </button>
        </div>
      </div>

      {/* Información del producto */}
      <div className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1 group-hover:text-black transition-colors">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-2xl font-bold text-black">
              ${product.price.toLocaleString()}
            </span>
            
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>Favorito</span>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="mt-4 flex flex-col gap-2">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            Añadir al Carrito
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 