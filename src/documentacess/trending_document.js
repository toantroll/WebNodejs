import BaseDocument from './base_document';
export default class TrendingDocument {

  getTrending(){
    const collection = 'trending';
    const query = {};
    const limit = 3;
    const skip = 0;
    return new  BaseDocument().getManyAndLimit(collection ,query, limit, skip);
  }

}
