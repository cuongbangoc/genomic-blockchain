import { v4 as uuidv4 } from 'uuid';
import { GEN_DB, GENS } from '../models/gendata.model.js';

class GenDataService {
  static create({ userId, encryptedData, signature, hashContent }) {
    if (!userId || !encryptedData || !signature) {
      throw new Error('User id, encrypted data and signature are required');
    }

    const genData = {
      id: uuidv4(),
      userId,
      encryptedData,
      signature,
      hashContent,
    };

    GENS.push(genData);
    GEN_DB[genData.id] = genData;

    return genData;
  }

  static getById(id) {
    if (!id) {
      throw new Error('Id is required');
    }

    return GEN_DB[id];
  }
}

export default GenDataService;
