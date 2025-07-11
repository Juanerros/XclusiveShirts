import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from '../../contexts/UserContext';
import { ToastContainer } from 'react-toastify';

// Components
import Layout from '../../components/Layout';

// Pages
import Auth from '../Auth/Auth';
import Home from '../Home/Home';
import NotFound from '../NotFound/NotFound';
import Catalog from '../Catalog/Catalog';
import CatalogById from '../Catalog/CatalogById';
import Admin from '../Admin/Admin';

const App: React.FC = () => {
  return (
    <Router>
      {/* Proveedor de contexto de usuario */}
      <UserProvider>
        {/* Contenedor de notificacion */}
        <ToastContainer
          theme='dark'
          position="top-left"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          limit={3}
          pauseOnFocusLoss
          pauseOnHover />

        <Routes>
          {/* Ruta de Login sin Layout */}
          <Route path="/auth" element={<Auth />} />

          {/* Rutas con Layout */}
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/catalog" element={
                  <Catalog />
                } />

                <Route path="/product/:id" element={
                  <CatalogById />
                } />

                <Route path="/cart" element={
                  <div className="p-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Carrito</h1>
                    <p className="text-gray-600 mt-4">Próximamente...</p>
                  </div>
                } />

                <Route path="/contact" element={
                  <div className="p-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Contacto</h1>
                    <p className="text-gray-600 mt-4">Próximamente...</p>
                  </div>
                } />

                <Route path="/admin" element={
                  <Admin />
                } />
                
                <Route path="/*" element={
                  <NotFound />
                } />
              </Routes>
            </Layout>
          } />
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
