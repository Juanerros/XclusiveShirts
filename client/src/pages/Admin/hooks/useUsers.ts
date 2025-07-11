import { useState, useEffect } from 'react';
import { UserService } from '../services';
import type { User } from '../services';
import useNotification from '../../../hooks/useNotification';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const notify = useNotification();

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const usersData = await UserService.getAllUsers();
      setUsers(usersData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener usuarios';
      setError(errorMessage);
      notify(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const toggleAdminRole = async (userId: number) => {
    setLoading(true);
    try {
      await UserService.toggleAdminRole(userId);
      notify('Rol de administrador actualizado', 'success');
      await fetchUsers(); // Recargar la lista
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar rol';
      notify(errorMessage, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    toggleAdminRole,
  };
}; 