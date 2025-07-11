import axios from '../../../api/axios';

export interface User {
  id_login: number;
  name: string;
  email: string;
  is_admin: boolean;
}

export class UserService {
  static async getAllUsers(): Promise<User[]> {
    const response = await axios.get('/admin');
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al obtener usuarios');
    }
    return response.data.users;
  }

  static async toggleAdminRole(userId: number): Promise<void> {
    const response = await axios.patch(`/admin/${userId}/toggle-admin`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al actualizar rol');
    }
  }
} 