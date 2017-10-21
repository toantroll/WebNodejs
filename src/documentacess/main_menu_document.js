
import BaseDocument from './base_document';
export default class MainMenuDocument {
  getMainMenu(){
    const collection = 'category';
    const query = {};
    return new  BaseDocument().getMany(collection ,query);
  }
}
