import { v4 as uuidv4 } from 'uuid';
import CryptoHelper from '../helpers/crypto.helper.js';
import { USER_DB, USERS } from '../models/user.model.js';
import PasswordUtil from '../utils/passwordUtil.js';

class AuthService {
  static registerUser({ email, password }) {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const hashedPassword = PasswordUtil.generateHashPass(password);
    const keyPair = CryptoHelper.genKeyPair();

    const user = {
      id: uuidv4(),
      email,
      publicKey: keyPair.publicKey,
      pass: hashedPassword,
    };

    USERS.push(user);
    USER_DB[user.email] = user;

    return {
      userId: user.id,
      email: user.email,
      publicKey: keyPair.publicKey,
      privateKey: keyPair.privateKey,
    };
  }

  static login(email, password) {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const user = USER_DB[email];

    if (!user) {
      throw new Error('User not found');
    }

    if (!PasswordUtil.comparePassword(password, user.pass)) {
      throw new Error('Wrong password');
    }

    return user;
  }
}

export default AuthService;
