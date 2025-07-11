import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { UserContext } from '../../contexts/UserContext';
import useConfirmation from '../../hooks/useConfirmation';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const confirm = useConfirmation();
  const { user } = useContext(UserContext);
  const {
    cartItems,
    cartTotal,
    cartItemCount,
    loading,
    updateItemQuantity,
    removeFromCart,
    clearCart,
    createOrder
  } = useCart();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      confirm(
        '¿Estás seguro de que quieres remover este producto del carrito?',
        () => removeFromCart(itemId),
        () => {}
      );
    } else {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    confirm(
      '¿Estás seguro de que quieres remover este producto del carrito?',
      () => removeFromCart(itemId),
      () => {}
    );
  };

  const handleClearCart = () => {
    confirm(
      '¿Estás seguro de que quieres vaciar el carrito?',
      () => clearCart(),
      () => {}
    );
  };

  const handleCheckout = async () => {
    if (!user) {
      confirm(
        'Debes iniciar sesión para realizar una compra. ¿Quieres ir a la página de login?',
        () => navigate('/auth'),
        () => {}
      );
      return;
    }

    const success = await createOrder();
    if (success) {
      navigate('/');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Tu carrito está vacío</h2>
            <p className="mt-2 text-sm text-gray-600">
              ¡Agrega algunos productos para comenzar tu compra!
            </p>
            <div className="mt-6">
              <Link
                to="/catalog"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
              >
                Explorar productos
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Tu Carrito ({cartItemCount} {cartItemCount === 1 ? 'producto' : 'productos'})
            </h1>
            <button
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
            >
              Vaciar carrito
            </button>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          
          {/* Lista de productos */}
          <div className="lg:col-span-7">
            <ul className="border border-gray-200 rounded-md divide-y divide-gray-200 shadow-sm bg-white">
              {cartItems.map((item) => (
                <li key={item.id} className="p-6">
                  <div className="flex items-center">
                    
                    {/* Imagen del producto */}
                    <div className="flex-shrink-0">
                      <div className="h-20 w-20 rounded-md bg-gray-200 flex items-center justify-center">
                        <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>

                    {/* Información del producto */}
                    <div className="ml-6 flex-1">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <Link to={`/product/${item.product.id_product}`} className="font-medium text-gray-700 hover:text-gray-800">
                              {item.product.name}
                            </Link>
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Color: {item.color.name} | Talla: {item.size.name}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            Categoría: {item.product.category}
                          </p>
                        </div>
                        
                        <div className="ml-4 flex-shrink-0 flow-root">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <span className="sr-only">Remover</span>
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        {/* Controles de cantidad */}
                        <div className="flex items-center space-x-3">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          
                          <span className="text-gray-900 font-medium w-8 text-center">{item.quantity}</span>
                          
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-50"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>

                        {/* Precio */}
                        <div className="text-right">
                          <p className="text-sm text-gray-900 font-medium">
                            ${(typeof item.price === 'string' ? parseFloat(item.price) : item.price).toLocaleString()} c/u
                          </p>
                          <p className="text-lg text-gray-900 font-bold">
                            ${((typeof item.price === 'string' ? parseFloat(item.price) : item.price) * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Resumen del pedido */}
          <div className="mt-16 lg:mt-0 lg:col-span-5">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-medium text-gray-900">Resumen del pedido</h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">${cartTotal.toLocaleString()}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Envío</p>
                  <p className="text-sm font-medium text-gray-900">
                    {cartTotal >= 50000 ? 'Gratis' : '$5.000'}
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-base font-medium text-gray-900">Total</p>
                    <p className="text-xl font-bold text-gray-900">
                      ${(cartTotal + (cartTotal >= 50000 ? 0 : 5000)).toLocaleString()}
                    </p>
                  </div>
                </div>

                {cartTotal >= 50000 && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-3">
                    <div className="flex">
                      <svg className="flex-shrink-0 h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="ml-3">
                        <p className="text-sm text-green-800">
                          ¡Felicidades! Tu pedido califica para envío gratis.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-black border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </>
                  ) : (
                    'Realizar pedido'
                  )}
                </button>

                <div className="text-center">
                  <Link
                    to="/catalog"
                    className="text-sm text-gray-600 hover:text-gray-800 font-medium"
                  >
                    ← Continuar comprando
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 