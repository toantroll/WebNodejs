import dbs from './connection';
import BaseDocument from './base_document';
import config from '../config';

export default class bannerDocument {

insertOne(c){
  const baseDocument = new BaseDocument();
  const collection = 'checkout';
  var promise = new Promise(function(resolve, reject){
    baseDocument.insertOne(collection, c).then(function(result){
    resolve(result);
  }).catch(function(e){reject(e)});
});
return promise;
}

}
