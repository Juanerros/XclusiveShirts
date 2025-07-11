import handleError from '../utils/handleError.js';

class UserAdminController {
  constructor(service) {
    this.service = service;
  }

  getUsers = async (req, res) => {
    try {
      const users = await this.service.getUsers();
      res.status(200).json({
        success: true,
        users
      });
    } catch (err) {
      handleError(res, err);
    }
  }

  toggleAdmin = async (req, res) => {
    const { id_login } = req.params;

    try {
      if (!id_login) throw { status: 400, message: 'ID de usuario es requerido' };

      await this.service.toggleAdmin(id_login);

      res.status(200).json({
        success: true,
        message: 'Rol de admin actualizado'
      });
    } catch (err) {
      handleError(res, err);
    }
  }
}

export default UserAdminController;