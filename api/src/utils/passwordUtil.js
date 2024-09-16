import bcryptjs from 'bcryptjs';

class PasswordUtil {
  static generateHashPass(password) {
    return bcryptjs.hashSync(password);
  }

  static comparePassword(rawPassword, hashPassword) {
    return bcryptjs.compareSync(rawPassword, hashPassword);
  }
}

export default PasswordUtil;
