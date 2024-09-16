import jsonwebtoken from 'jsonwebtoken';

const { verify, sign } = jsonwebtoken;

class TokenUtil {
  static verifyToken(accessToken) {
    return verify(accessToken, process.env.JWT_SECRET);
  }

  static generateToken(payload, expiresIn = '7d') {
    return sign(payload, process.env.JWT_SECRET, { expiresIn });
  }
}
export default TokenUtil;
