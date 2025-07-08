import handleError from '../utils/handleError.js';
import { generateToken } from '../utils/jwt.js';

class AuthController {
  constructor(service) {
    this.service = service;
  }

  login = async (req, res) => {
    const { email, password } = req.body;

    try {
      if (!email || !password) throw { status: 400, message: 'Email y contraseña son requeridos' };

      const user = await this.service.login(email, password);

      const token = generateToken({
        id_login: user.id_login,
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
      });

      res.cookie('token', token, {
        httpOnly: true,
        secure: true, // usar HTTPS en producción
        sameSite: 'Strict',
        maxAge: 1000 * 60 * 60 * 24, // 1 día
      });

      res.status(200).json({
        success: true,
        message: 'Se logueó correctamente',
        user
      });

    } catch (err) {
      handleError(res, err);
    }
  }

  logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Sesión cerrada' });
  };

  register = async (req, res) => {
    try {
      const { email, password, name } = req.body;
      
      // Validar datos de entrada
      if (!email || !password || !name) {
        return handleError(res, { status: 400, message: 'Email, contraseña y nombre son requeridos' });
      }

      const user = await this.service.register(req.body);

      const token = generateToken({
        id_login: user.id_login,
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
      });

      res.cookie('token', token, {
        httpOnly: true,
        secure: true, // usar HTTPS en producción
        sameSite: 'Strict',
        maxAge: 1000 * 60 * 60 * 24, // 1 día
      });

      res.status(201).json({
        success: true,
        message: 'Usuario registrado correctamente',
        user
      });
    } catch (err) {
      handleError(res, err);
    }
  }
}

export default AuthController;
