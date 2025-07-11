import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProductDetail } from './hooks/useProductDetail';
import { useCart } from '../../hooks/useCart';
import type { Color, Size } from './services/catalogService';
import useNotification from '../../hooks/useNotification';
import { LoadingState, ErrorState } from './components/CatalogStates';

const CatalogById: React.FC = () => {
  const navigate = useNavigate();
  const notify = useNotification();
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '0');
  
  const {
    product,
    loading,
    error,
    selectedColor,
    selectedSize,
    availableStock,
    setSelectedColor,
    setSelectedSize,
    canAddToCart
  } = useProductDetail(productId);

  const { addToCart, loading: cartLoading } = useCart();

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    if (canAddToCart && product && selectedColor && selectedSize) {
      const success = await addToCart(product, selectedColor, selectedSize, quantity);
      if (success) {
        setQuantity(1); // Reset quantity after successful add
      }
    } else {
      notify('Por favor selecciona color y talla', 'warning');
    }
  };

  const handleColorSelect = (color: Color) => {
    setSelectedColor(color);
    setQuantity(1); // Reset quantity when color changes
  };

  const handleSizeSelect = (size: Size) => {
    setSelectedSize(size);
    setQuantity(1); // Reset quantity when size changes
  };

  const adjustQuantity = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= availableStock) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <LoadingState />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ErrorState 
            message={error || 'Producto no encontrado'} 
            onRetry={() => navigate('/catalog')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-900">Inicio</Link>
            <span className="text-gray-400">/</span>
            <Link to="/catalog" className="text-gray-500 hover:text-gray-900">Catálogo</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </nav>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          
          {/* Imagen del producto */}
          <div className="flex flex-col-reverse">
            <div className="aspect-w-1 aspect-h-1 w-full">
              <div className="w-full h-96 sm:h-[500px] lg:h-[600px] bg-gray-100 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Información del producto */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <div className="flex items-center">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-black text-white">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mt-4">
              {product.name}
            </h1>
            
            <div className="mt-3">
              <p className="text-3xl text-gray-900 font-bold">
                ${typeof product.price === 'string' ? parseFloat(product.price).toLocaleString() : product.price.toLocaleString()}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Descripción</h3>
              <p className="text-base text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <form className="mt-8">
              {/* Selector de color */}
              {product.colors.length > 0 && (
                <div>
                  <h3 className="text-sm text-gray-900 font-medium">Color</h3>
                  <fieldset className="mt-4">
                    <legend className="sr-only">Elige un color</legend>
                    <div className="flex items-center space-x-3">
                      {product.colors.map((color) => (
                        <label
                          key={color.id_color}
                          className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                        >
                          <input
                            type="radio"
                            name="color-choice"
                            value={color.name}
                            className="sr-only"
                            checked={selectedColor?.id_color === color.id_color}
                            onChange={() => handleColorSelect(color)}
                          />
                          <span
                            className={`h-8 w-8 border border-black border-opacity-10 rounded-full flex items-center justify-center text-xs font-medium text-gray-900 ${
                              selectedColor?.id_color === color.id_color
                                ? 'ring-2 ring-black'
                                : ''
                            }`}
                          >
                            {color.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}

              {/* Selector de talla */}
              {product.sizes.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm text-gray-900 font-medium">Talla</h3>
                  </div>

                  <fieldset className="mt-4">
                    <legend className="sr-only">Elige una talla</legend>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {product.sizes.map((size) => (
                        <label
                          key={size.id_size}
                          className="group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="size-choice"
                            value={size.name}
                            className="sr-only"
                            checked={selectedSize?.id_size === size.id_size}
                            onChange={() => handleSizeSelect(size)}
                          />
                          <span
                            className={selectedSize?.id_size === size.id_size
                              ? 'bg-black text-white'
                              : 'text-gray-900'
                            }
                          >
                            {size.name}
                          </span>
                          <span
                            className={`absolute -inset-px rounded-md pointer-events-none ${
                              selectedSize?.id_size === size.id_size
                                ? 'border-2 border-black'
                                : 'border border-transparent'
                            }`}
                            aria-hidden="true"
                          />
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}

              {/* Stock y cantidad */}
              {selectedColor && selectedSize && (
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm text-gray-900 font-medium">Cantidad</h3>
                    <span className="text-sm text-gray-500">
                      Stock disponible: {availableStock}
                    </span>
                  </div>
                  
                  {availableStock > 0 ? (
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => adjustQuantity(-1)}
                        disabled={quantity <= 1}
                        className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        <span className="sr-only">Disminuir cantidad</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      
                      <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                      
                      <button
                        type="button"
                        onClick={() => adjustQuantity(1)}
                        disabled={quantity >= availableStock}
                        className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        <span className="sr-only">Aumentar cantidad</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-red-600">Sin stock disponible</p>
                  )}
                </div>
              )}

              {/* Botón agregar al carrito */}
              <div className="mt-10 flex sm:flex-col1">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!canAddToCart || cartLoading}
                  className="max-w-xs flex-1 bg-black border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cartLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Agregando...
                    </>
                  ) : (
                    'Agregar al carrito'
                  )}
                </button>
              </div>

              {/* Información adicional */}
              <div className="mt-6 text-center">
                <div className="group inline-flex text-sm text-gray-500">
                  <svg className="flex-shrink-0 mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Envío gratis en compras mayores a $50.000
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Product Reviews Section */}
        <div className="mt-16 lg:mt-24">
          <div className="border-t border-gray-200 pt-16">
            <div className="max-w-2xl mx-auto lg:max-w-none">
              <div className="text-center">
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                  Detalles del Producto
                </h2>
                <p className="mt-4 text-gray-600">
                  Información adicional sobre este producto
                </p>
              </div>
              
              <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
                <div className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white mx-auto">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-sm font-medium text-gray-900">Calidad Premium</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Materiales de la más alta calidad para mayor durabilidad y comfort.
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white mx-auto">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-sm font-medium text-gray-900">Envío Rápido</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Entrega en 24-48 horas en área metropolitana.
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white mx-auto">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-sm font-medium text-gray-900">Garantía</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    30 días de garantía en defectos de manufactura.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogById;