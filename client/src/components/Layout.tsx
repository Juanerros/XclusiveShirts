import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, handleLogout } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-black hover:text-gray-700 transition-colors">
                XclusiveShirts
              </Link>
            </div>
            <nav className="hidden md:block">
              <div className="flex items-center space-x-12">
                <Link to="/home" className="text-gray-700 hover:text-black transition-colors font-medium">
                  Inicio
                </Link>
                <Link to="/catalog" className="text-gray-700 hover:text-black transition-colors font-medium">
                  Catálogo
                </Link>
                <Link to="/cart" className="text-gray-700 hover:text-black transition-colors font-medium">
                  Carrito
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-black transition-colors font-medium">
                  Contacto
                </Link>
                {(user && user.is_admin) ? (
                  <Link to="/admin" className="text-gray-700 hover:text-black transition-colors font-medium">
                    Admin
                  </Link>
                ): null}
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors font-medium"
                  >
                    Cerrar Sesión
                  </button>
                ) : (
                  <Link to="/auth" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium">
                    Iniciar Sesión
                  </Link>
                )}
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-black">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div >
      </header >

      {/* Main Content */}
      < main className="flex-1" >
        {children}
      </main >

      {/* Footer */}
      < footer className="bg-black text-white mt-auto" >
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-bold mb-4">XclusiveShirts</h3>
              <p className="text-gray-300 mb-4">
                La mejor selección de camisas exclusivas para tu estilo único.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.324-1.297C4.198 14.894 3.708 13.743 3.708 12.446s.49-2.448 1.297-3.324C5.801 8.245 6.952 7.755 8.249 7.755s2.448.49 3.324 1.297c.876.807 1.366 1.958 1.366 3.255s-.49 2.448-1.297 3.324c-.876.876-2.027 1.366-3.324 1.366zm7.718 0c-1.297 0-2.448-.49-3.324-1.297-.876-.876-1.366-2.027-1.366-3.324s.49-2.448 1.297-3.324c.876-.876 2.027-1.366 3.324-1.366s2.448.49 3.324 1.297c.876.876 1.366 2.027 1.366 3.324s-.49 2.448-1.297 3.324c-.876.876-2.027 1.366-3.324 1.366z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/home" className="hover:text-white transition-colors">Inicio</Link></li>
                <li><Link to="/catalog" className="hover:text-white transition-colors">Catálogo</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Soporte</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Ayuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Devoluciones</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Envíos</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300 text-sm">
              © 2024 XclusiveShirts. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer >
    </div >
  );
};

export default Layout; 