import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "../../api/axios";
import useNotification from '../../hooks/useNotification';
import { UserContext } from '../../contexts/UserContext';

const Login: React.FC = () => {
  const { user, handleLogin } = useContext(UserContext);
  const notify = useNotification();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rePassword: '',
    name: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid()) return;

    try {
      setLoading(true);

      const response = await axios.post('/auth/' + (isLogin ? 'login' : 'register'), formData)

      if (response.data.success) {
        notify(response.data.message, 'success');
        handleLogin(response.data.user);
      }
    } catch (err: any) {
      const error = err.response?.data?.message || 'Error al procesar la solicitud';
        
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const isValid = () => {
    const regexEspeciales = /[^ a-zA-Z0-9!@#$%^&()_+[\]{};\\|\-/?`.~]/g;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regexEspeciales.test(formData.email) || regexEspeciales.test(formData.password)) {
      notify('No escribas caracteres especiales', 'warning')
      return false;
    }

    if (isLogin) return true;

    if (!regexEmail.test(formData.email)) {
      notify('El formato del email no es válido', 'error');
      return false;
    }

    if (formData.password.length < 6) {
      notify('La contraseña debe tener al menos 6 caracteres', 'error');
      return false;
    }

    if (formData.password !== formData.rePassword) {
      notify('Las contraseñas no coinciden', 'error');
      return false;
    }

    if (formData.name.trim().length < 3) {
      notify('El nombre debe tener al menos 3 caracteres', 'error');
      return false;
    }

    return true;
  }

  // Por alguna razon, no funciona
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.includes('  ')) {
      notify('No puedes escribir espacios dobles', 'warning');
      return;
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Ya estás logueado</h1>
          <p className="text-gray-600 mb-4">Bienvenido de nuevo, {user.name}!</p>
          <Link to="/home" className="text-blue-600 hover:underline">Ir a la página principal</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Left Side - Image/Brand */}
      <div className="lg:w-1/2 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 text-white">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">XclusiveShirts</h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-8">
              Moda exclusiva que define tu estilo
            </p>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-gray-400 max-w-md">
              Descubre nuestra colección única de camisas premium diseñadas para personas que valoran la calidad y el estilo excepcional.
            </p>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-gray-700 rounded-full opacity-50"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 border-2 border-gray-700 opacity-30"></div>
          <div className="absolute top-1/3 right-10 w-8 h-8 bg-gray-800 transform rotate-45 opacity-40"></div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <div className="lg:hidden text-center mb-8">
            <h2 className="text-3xl font-bold text-black">XclusiveShirts</h2>
            <p className="text-gray-600 mt-2">Moda exclusiva</p>
          </div>

          {/* Form Header */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Bienvenido de vuelta' : 'Crear cuenta'}
            </h3>
            <p className="text-gray-600">
              {isLogin
                ? 'Accede a tu cuenta para continuar'
                : 'Únete a nuestra comunidad exclusiva'
              }
            </p>
          </div>

          {/* Login/Register Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${isLogin
                ? 'bg-white text-black shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${!isLogin
                ? 'bg-white text-black shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Registrarse
            </button>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo
                </label>
                <input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder-gray-400"
                  placeholder="Tu nombre completo"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder-gray-400"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder-gray-400"
                placeholder="••••••••"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Repetir contraseña
                </label>
                <input
                  value={formData.rePassword}
                  onChange={(e) => setFormData({ ...formData, rePassword: e.target.value })}
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder-gray-400"
                  placeholder="••••••••"
                />
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-black focus:ring-black" />
                  <span className="ml-2 text-gray-700">Recordarme</span>
                </label>
                <a href="#" className="text-black hover:text-gray-700 font-medium">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 transition-all font-medium text-lg"
            >
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-50 text-gray-500">o continúa con</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-gray-700 font-medium">Google</span>
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              >
                <svg className="w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-gray-700 font-medium">Facebook</span>
              </button>
            </div>

            {/* Continue without login */}
            <div className="text-center pt-4">
              <Link
                to="/home"
                className="text-gray-600 hover:text-black transition-colors font-medium"
              >
                Continuar sin iniciar sesión →
              </Link>
            </div>
          </form>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center mt-8">
            Al continuar, aceptas nuestros{' '}
            <a href="#" className="text-black hover:underline">Términos de Servicio</a>
            {' '}y{' '}
            <a href="#" className="text-black hover:underline">Política de Privacidad</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 