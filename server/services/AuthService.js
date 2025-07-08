import bcrypt from 'bcrypt';
import moment from 'moment';

moment.locale('es');
const SALT_ROUNDS = 15;

class AuthService {
  constructor(conex) {
    this.conex = conex
  }

  async login(email, password) {
    try {
      const [result] = await this.conex.execute(
        "SELECT * FROM login WHERE email = ?",
        [email]
      );

      if (result.length === 0) {
        throw { status: 401, message: 'Credenciales incorrectas.' };
      }

      const user = result[0];

      if (user.lock_until && new Date(user.lock_until) > new Date()) {
        const time = moment(user.lock_until).fromNow();
        throw { status: 403, message: `Muchos intentos fallidos. Intente de nuevo ${time}` };
      }
      
      const validPassword = await bcrypt.compare(password, user.pass);
      if (!validPassword) {
        try {
          const attempts = user.failed_attempts + 1;
          const lock_until = attempts >= 3 ? moment().add(15, 'minutes').toDate() : null;

          await this.conex.execute(
            'UPDATE login SET failed_attempts = ?, lock_until = ? WHERE id_login = ?',
            [attempts, lock_until, user.id_login]
          );
        } catch (updateErr) {
          console.error('Error al actualizar intentos fallidos:', updateErr);
        }

        throw { status: 401, message: 'Credenciales incorrectas.' };
      }

      try {
        await this.conex.execute(
          'UPDATE login SET failed_attempts = 0, lock_until = NULL WHERE id_login = ?',
          [user.id_login]
        );
      } catch (updateErr) {
        console.error('Error al resetear intentos fallidos:', updateErr);
      }

      return user;
    } catch (err) {
      if (err.status) {
        throw err;
      }
      console.error('Error interno en login:', err);
      throw { status: 500, message: 'Error interno del servidor', cause: err };
    }
  }

  async register({ email, password, name, }) {
    try {
      const hashed = await bcrypt.hash(password, SALT_ROUNDS);

      const [loginRes] = await this.conex.execute(
        'INSERT INTO login(email, pass, name) VALUES (?, ?, ?)',
        [email, hashed, name]
      );

      return {
        id_login: loginRes.insertId,
        email,
        name,
        is_admin: false,
      };
    } catch (err) {
      if (err.status) throw err;
      if (err.code === 'ER_DUP_ENTRY') throw { status: 409, message: 'El Email ya se encuentra registrado' };

      // Error interno no manejado
      console.error('Error interno en register:', err);
      throw { status: 500, message: 'Error interno del servidor', cause: err };
    }
  }
}

export default AuthService;
