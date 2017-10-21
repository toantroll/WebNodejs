import dbs from './connection';
import BaseDocument from './base_document';
import config from '../config';

export default class bannerDocument {

  getBanner(){
    const collection = 'banner';
    const query = {};
    return new BaseDocument().getMany(collection,query);
  }

  updateOne(b){
    console.log(b);
    const baseDocument = new BaseDocument();
    const collection = 'banner';
    const query = {'_id': b._id};
    const queryUpdate = {'$set':{'title':b.title, 'content':b.content, 'url':b.url}};
    return baseDocument.updateOne(collection, query, queryUpdate);
  }
}
