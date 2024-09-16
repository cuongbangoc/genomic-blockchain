/* eslint-disable no-console */
/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();

import AuthService from './services/auth.service.js';
import CommonUtil from './utils/commonUtil.js';
import CryptoHelper from './helpers/crypto.helper.js';
import GenDataService from './services/gendata.service.js';
import TeeService from './services/tee.service.js';

import controllerContract from './contracts/Controller.js';

async function main() {
  // Step 1: Register new User
  console.log('1. Register new User is processing');
  const newUser = AuthService.registerUser({
    email: 'abc@test.com',
    password: '123123123',
  });
  const uPrivateKey = newUser.privateKey;
  console.log('New user registered: ', newUser.email);

  // Step 2: User Login
  console.log('2. User Login is processing');
  const user = AuthService.login('abc@test.com', '123123123');
  const uPublicKey = user.publicKey;
  console.log('User logged in: ', user.email);

  // Step 3: Generate GenData
  console.log('3. Generate GenData is processing');
  const genRawData = CommonUtil.randomString(32);
  console.log('GenData generated: ', genRawData);

  // Step 4:
  //   4.1: Encrypted genData with PublicKey
  //   4.2: Create EncryptedGenData's signature with PrivateKey
  //   4.3: Save genData to DB
  console.log('4. Save genData to DB is processing');
  const encryptedGenData = CryptoHelper.encryptDataWithPublicKey(genRawData, uPublicKey);
  const hashGenData = CryptoHelper.createHash(genRawData);
  const signature = CryptoHelper.createSignature(encryptedGenData, uPrivateKey);
  const genData = {
    userId: user.id,
    encryptedData: encryptedGenData,
    signature,
    hashContent: hashGenData,
  };
  const newGenData = GenDataService.create(genData);
  console.log('GenData created: ', newGenData.id);

  // Step 5: Verify signature
  console.log('5. Verify signature is processing');
  const genDataFromDB = GenDataService.getById(newGenData.id);
  const signatureVerified = CryptoHelper.verifySignature(genDataFromDB.encryptedData, genDataFromDB.signature, uPublicKey);
  console.log('Signature verified: ', signatureVerified);

  // Step 6: Get Risk Score
  console.log('6. Get Risk Score is processing');
  const riskScore = TeeService.getRiskScoreByGenData(genRawData);
  console.log('Risk Score: ', riskScore);

  // Step 7: Upload genData to Blockchain
  console.log('7. Upload genData to Blockchain is processing');
  const sessionId = await controllerContract.methods.uploadData(newGenData.id).call();
  console.log('SessionId: ', sessionId);

  // Step 8: Listen UploadData event
  console.log('8. Listen UploadData event is processing');
  controllerContract.events.UploadData(
    {
      fromBlock: 0,
    },
    (error, event) => {
      if (error) {
        console.log('Event UploadData Error', error);
      } else {
        console.log('Event UploadData Data', event.returnValues);
      }
    }
  );

  // Step 9: Confirm genData
  console.log('9. Confirm genData is processing');
  await controllerContract.methods.confirm(newGenData.id, newGenData.hashContent, 'success', sessionId, riskScore).call();
  console.log('GenData confirmed');

  // Step 10: Get Raw genData from DB with privateKey
  console.log('10. Get Raw genData from DB is processing');
  const _genDataFromDB = GenDataService.getById(newGenData.id);
  const decryptedGenData = CryptoHelper.decryptDataWithPrivateKey(_genDataFromDB.encryptedData, uPrivateKey);
  console.log('Decrypted GenData: ', decryptedGenData.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
