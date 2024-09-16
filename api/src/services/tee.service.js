class TeeService {
  static getRiskScoreByGenData(genData) {
    if (!genData) {
      throw new Error('GenData is required');
    }

    return Math.floor(1 + Math.random() * 4);
  }
}

export default TeeService;
