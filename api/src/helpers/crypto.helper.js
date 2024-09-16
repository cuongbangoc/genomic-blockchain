import crypto from 'crypto';

class CryptoHelper {
  static genKeyPair() {
    // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
    const keyPair = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096, // bits - standard for RSA keys
      publicKeyEncoding: {
        type: 'pkcs1', // "Public Key Cryptography Standards 1"
        format: 'pem', // Most common formatting choice
      },
      privateKeyEncoding: {
        type: 'pkcs1', // "Public Key Cryptography Standards 1"
        format: 'pem', // Most common formatting choice
      },
    });

    return {
      privateKey: keyPair.privateKey,
      publicKey: keyPair.publicKey,
    };
  }

  static encryptDataWithPublicKey(data, publicKey) {
    const bufferMessage = Buffer.from(data, 'utf8');
    return crypto.publicEncrypt(publicKey, bufferMessage);
  }

  static decryptDataWithPrivateKey(encryptedData, privateKey) {
    const bufferMessage = Buffer.from(encryptedData, 'base64');
    return crypto.privateDecrypt(privateKey, bufferMessage);
  }

  static createSignature(data, privateKey) {
    const hashString = crypto.createHash('sha256').update(data).digest('hex');
    return crypto.privateEncrypt(privateKey, Buffer.from(hashString, 'hex'));
  }

  static verifySignature(encryptedData, signature, publicKey) {
    const decryptedMessageHex = crypto.publicDecrypt(publicKey, signature).toString('hex');
    const hashString = crypto.createHash('sha256').update(encryptedData).digest('hex');

    return decryptedMessageHex === hashString;
  }

  static createHash(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
  }
}

export default CryptoHelper;
