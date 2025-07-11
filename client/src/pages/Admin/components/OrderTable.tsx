import React, { useState } from 'react';
import type { Order } from '../services';
import { formatPrice } from '../utils';

interface OrderTableProps {
  orders: Order[];
  onUpdateStatus: (orderId: number, status: Order['status']) => void;
  loading: boolean;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, onUpdateStatus, loading }) => {
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmado':
        return 'bg-blue-100 text-blue-800';
      case 'enviado':
        return 'bg-purple-100 text-purple-800';
      case 'entregado':
        return 'bg-green-100 text-green-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-lg text-gray-600">Cargando pedidos...</span>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No hay pedidos</h3>
          <p className="mt-1 text-gray-500">No se encontraron pedidos registrados.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          Lista de Pedidos ({orders.length})
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                # Pedido
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <React.Fragment key={order.id_order}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id_order}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.user_name}</div>
                      <div className="text-sm text-gray-500">{order.user_email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatPrice(order.total_amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => onUpdateStatus(order.id_order, e.target.value as Order['status'])}
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border-0 focus:ring-2 focus:ring-black ${getStatusColor(order.status)}`}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="confirmado">Confirmado</option>
                      <option value="enviado">Enviado</option>
                      <option value="entregado">Entregado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.order_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => toggleOrderDetails(order.id_order)}
                      className="text-black hover:text-gray-700 transition-colors"
                    >
                      {expandedOrder === order.id_order ? 'Ocultar' : 'Ver'} Detalles
                    </button>
                  </td>
                </tr>
                
                {/* Order Details */}
                {expandedOrder === order.id_order && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 bg-gray-50">
                      <div className="space-y-4">
                        {/* Customer Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Información del Cliente</h4>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Teléfono:</span> {order.phone || 'No especificado'}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Dirección:</span> {order.delivery_address || 'No especificada'}
                            </p>
                            {order.notes && (
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Notas:</span> {order.notes}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Order Items */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Productos del Pedido</h4>
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Color</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Talla</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Precio Unit.</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {order.items.map((item) => (
                                  <tr key={item.id_order_item}>
                                    <td className="px-4 py-2 text-sm text-gray-900">{item.product_name}</td>
                                    <td className="px-4 py-2 text-sm text-gray-900">{item.color_name}</td>
                                    <td className="px-4 py-2 text-sm text-gray-900">{item.size_name}</td>
                                    <td className="px-4 py-2 text-sm text-gray-900">{item.quantity}</td>
                                    <td className="px-4 py-2 text-sm text-gray-900">{formatPrice(item.unit_price)}</td>
                                    <td className="px-4 py-2 text-sm text-gray-900">{formatPrice(item.subtotal)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable; 