import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import useConfirmation from '../../hooks/useConfirmation';
import { useProducts, useUsers, useStock, useOrders } from './hooks';
import { 
  Dashboard, 
  ProductTable, 
  UserTable, 
  ProductModal, 
  OrderTable 
} from './components';
import type { Product } from './services';

type TabType = 'dashboard' | 'products' | 'orders' | 'users';

const Admin: React.FC = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const confirm = useConfirmation();
  
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Hooks para manejar todos los datos (siempre se deben llamar)
  const {
    products,
    loading: productsLoading,
    createProduct,
    updateProduct,
    deleteProduct
  } = useProducts();

  const {
    users,
    loading: usersLoading,
    toggleAdminRole
  } = useUsers();

  const {
    colors,
    sizes,
    stockAlerts,
    loading: stockLoading,
    fetchStockAlerts
  } = useStock();

  const {
    orders,
    orderStats,
    loading: ordersLoading,
    updateOrderStatus
  } = useOrders();

  // Verificar permisos de administrador en useEffect
  useEffect(() => {
    if (!user?.is_admin) {
      navigate('/');
    }
  }, [user?.is_admin, navigate]);

  // Si no es admin, no renderizar el contenido
  if (!user?.is_admin) {
    return null;
  }

  // Manejadores para productos
  const handleOpenProductModal = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleProductSubmit = async (data: any) => {
    if (editingProduct) {
      const success = await updateProduct(editingProduct.id_product, data);
      if (success) {
        setEditingProduct(null);
        setIsProductModalOpen(false);
        fetchStockAlerts(); // Actualizar alertas después de actualizar producto
      }
      return success;
    } else {
      const success = await createProduct(data);
      if (success) {
        setIsProductModalOpen(false);
        fetchStockAlerts(); // Actualizar alertas después de crear producto
      }
      return success;
    }
  };

  const handleProductEdit = (product: Product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleProductCancel = () => {
    setEditingProduct(null);
    setIsProductModalOpen(false);
  };

  const handleProductDelete = (id: number) => {
    confirm(
      '¿Estás seguro de eliminar este producto?',
      async () => {
        await deleteProduct(id);
        fetchStockAlerts(); // Actualizar alertas después de eliminar producto
      },
      () => {} // Cancelar no hace nada
    );
  };

  // Manejadores para usuarios
  const handleUserToggleAdmin = async (userId: number) => {
    await toggleAdminRole(userId);
  };

  // Manejadores para pedidos
  const handleOrderStatusUpdate = async (orderId: number, status: any) => {
    await updateOrderStatus(orderId, status);
  };

  const tabs = [
    {
      key: 'dashboard' as TabType,
      label: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v14l-5-3-5 3V5z" />
        </svg>
      )
    },
    {
      key: 'products' as TabType,
      label: 'Productos',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      key: 'orders' as TabType,
      label: 'Pedidos',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      key: 'users' as TabType,
      label: 'Usuarios',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center px-4 py-2 text-sm text-gray-500">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Bienvenido, {user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
                {/* Badge para alertas en productos */}
                {tab.key === 'products' && stockAlerts.length > 0 && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {stockAlerts.length}
                  </span>
                )}
                {/* Badge para pedidos pendientes */}
                {tab.key === 'orders' && orderStats?.pending_orders && orderStats.pending_orders > 0 && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {orderStats.pending_orders}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            orderStats={orderStats}
            stockAlerts={stockAlerts}
            loading={stockLoading || ordersLoading}
          />
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Header con botón agregar */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Gestión de Productos</h2>
                <p className="text-gray-500">Administra tu inventario y productos</p>
              </div>
              <button
                onClick={handleOpenProductModal}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Agregar Producto
              </button>
            </div>

            {/* Alertas de stock si las hay */}
            {stockAlerts.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5l-6.928-12C8.828 4.167 7.172 4.167 6.34 5.5l-6.928 12c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      ⚠️ {stockAlerts.length} productos con stock bajo
                    </h3>
                    <p className="text-sm text-red-700 mt-1">
                      Ve al Dashboard para ver los detalles de los productos que necesitan restock.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Product Table */}
            <ProductTable
              products={products}
              onEdit={handleProductEdit}
              onDelete={handleProductDelete}
              loading={productsLoading}
            />
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Gestión de Pedidos</h2>
              <p className="text-gray-500">Administra y actualiza el estado de los pedidos</p>
            </div>

            <OrderTable
              orders={orders}
              onUpdateStatus={handleOrderStatusUpdate}
              loading={ordersLoading}
            />
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <strong>Gestión de Usuarios:</strong> Aquí puedes administrar los roles de los usuarios. 
                    Los administradores tienen acceso completo al panel de administración.
                  </p>
                </div>
              </div>
            </div>

            <UserTable
              users={users}
              onToggleAdmin={handleUserToggleAdmin}
              loading={usersLoading}
            />
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={handleProductCancel}
        product={editingProduct}
        onSubmit={handleProductSubmit}
        loading={productsLoading}
        colors={colors}
        sizes={sizes}
      />
    </div>
  );
};

export default Admin;