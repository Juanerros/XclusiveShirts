class UserAdminService {
  constructor(conex) {
    this.conex = conex;
  }

  getUsers = async () => {
    try {
      const [rows] = await this.conex.execute(
        "SELECT * FROM login"
      );
      
      return rows;
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
      throw { status: 500, message: 'Error interno del servidor', cause: err };
    }
  }

  async toggleAdmin(id_login) {
    try {
      const [user] = await this.conex.execute(
        "SELECT is_admin FROM login WHERE id_login = ?",
        [id_login]
      );

      if (user.length === 0) throw { status: 404, message: 'Usuario no encontrado' };

      const newStatus = !user[0].is_admin;

      await this.conex.execute(
        "UPDATE login SET is_admin = ? WHERE id_login = ?",
        [newStatus, id_login]
      );

      return {
        id_login,
        is_admin: newStatus
      };
    } catch (err) {
      if (err.status) throw err;
      console.error('Error en toggleAdmin:', err);
      throw { status: 500, message: 'Error interno del servidor', cause: err };
    }
  }
}

export default UserAdminService;