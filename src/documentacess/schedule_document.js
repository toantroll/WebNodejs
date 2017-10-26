import BaseDocument from './base_document';
import CateDocument from './cate_document';
import Common from '../util/common';
var ObjectID = require('mongodb').ObjectID;
export default class scheduleDocument {
  updateOne(s){
    const baseDocument = new BaseDocument();
    const collection = 'schedule';
    const query = {};
    const updateData = {'description':s.description, 'pid': s.pid, 'view':0};
    const queryUpdate = {'$set':updateData};
    return baseDocument.updateOne(collection, query, queryUpdate);
  }

  getAggregateOne(){
    const collection = 'schedule';
    const joinCollecion = 'products';
    const query = {};
    const localField = 'pid';
    const foreignField = '_id';
    const alias = joinCollecion;
    const baseDocument = new BaseDocument();
    var promise = new Promise(function(resolve, reject){
      baseDocument.getAggregateOne(collection, joinCollecion, query, localField, foreignField, alias)
      .then(function(result){
      resolve(result);
    }).catch(function(e){reject(e)});
  });
  return promise;
  }

}
