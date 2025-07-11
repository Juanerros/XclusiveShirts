import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { useCart } from '../../hooks/useCart';
import type { Order } from '../../services/cartService';

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { orders, loadingOrders, getUserOrders } = useCart();
  const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    getUserOrders();
  }, [user, getUserOrders, navigate]);

  const toggleOrderExpansion = (orderId: number) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Confirmado':
        return 'bg-blue-100 text-blue-800';
      case 'Enviado':
        return 'bg-purple-100 text-purple-800';
      case 'Entregado':
        return 'bg-green-100 text-green-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'Pendiente':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Confirmado':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Enviado':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case 'Entregado':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'Cancelado':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (!user) {
    return null;
  }

  if (loadingOrders) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando tus pedidos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">No tienes pedidos aún</h2>
            <p className="mt-2 text-sm text-gray-600">
              ¡Realiza tu primera compra para ver tus pedidos aquí!
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/catalog')}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
              >
                Explorar productos
              </button>
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
          <h1 className="text-2xl font-bold text-gray-900">
            Mis Pedidos ({orders.length})
          </h1>
          <p className="mt-2 text-gray-600">
            Aquí puedes ver el estado de todos tus pedidos
          </p>
        </div>

        {/* Lista de pedidos */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id_order} className="bg-white rounded-lg shadow-sm overflow-hidden">
              
              {/* Header del pedido */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Pedido #{order.id_order}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(order.order_date).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status}</span>
                    </span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ${order.total.toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleOrderExpansion(order.id_order)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg
                        className={`w-5 h-5 transform transition-transform ${
                          expandedOrders.has(order.id_order) ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Progress bar para estados */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>Pendiente</span>
                    <span>Confirmado</span>
                    <span>Enviado</span>
                    <span>Entregado</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        order.status === 'Cancelado'
                          ? 'bg-red-500'
                          : order.status === 'Pendiente'
                          ? 'bg-yellow-500 w-1/4'
                          : order.status === 'Confirmado'
                          ? 'bg-blue-500 w-2/4'
                          : order.status === 'Enviado'
                          ? 'bg-purple-500 w-3/4'
                          : 'bg-green-500 w-full'
                      }`}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Detalles expandibles */}
              {expandedOrders.has(order.id_order) && (
                <div className="border-t border-gray-200 bg-gray-50 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Información del cliente */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Información del pedido</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Cliente:</span>
                          <span className="text-gray-900">{order.customer_name || user.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Email:</span>
                          <span className="text-gray-900">{order.customer_email || user.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Estado:</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Resumen de costos */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Resumen</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Subtotal:</span>
                          <span className="text-gray-900">${(order.total - (order.total >= 50000 ? 0 : 5000)).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Envío:</span>
                          <span className="text-gray-900">{order.total >= 50000 ? 'Gratis' : '$5.000'}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-medium text-gray-900">Total:</span>
                          <span className="font-bold text-gray-900">${order.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Items del pedido */}
                  {order.items && order.items.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Productos del pedido</h4>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">Producto ID: {item.id_product}</p>
                              <p className="text-xs text-gray-500">
                                Color ID: {item.id_color} | Talla ID: {item.id_size} | Cantidad: {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">
                                ${(item.unit_price * item.quantity).toLocaleString()}
                              </p>
                              <p className="text-xs text-gray-500">
                                ${item.unit_price.toLocaleString()} c/u
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders; 