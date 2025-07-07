import { createContext, useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

interface User {
  id_login?: number;
  name?: string;
  email?: string;
  is_admin?: boolean;
}

interface UserContextType {
  user: User | null;
  handleLogin: (user: User) => void;
  handleLogout: () => void;
  loading: boolean;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  handleLogin: () => {},
  handleLogout: () => {},
  loading: false,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkSession = async () => {
    try {
      const response = await axios.get('/auth/me');

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Error al verificar sesión:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (user: User) => {
    setUser(user);
    navigate('/');
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('/auth/logout');
      if (response.status === 200) {
        navigate('/');
      }
    } catch (err) {
      console.error('Error al cerrar sesión', err);
    } finally {
      setUser(null);
      navigate('/');
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
