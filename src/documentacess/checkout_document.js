import dbs from './connection';
import BaseDocument from './base_document';
import config from '../config';
import Common from '../util/common';

export default class bannerDocument {

  delete(id){
    const baseDocument = new BaseDocument();
    const collection = 'checkout';
    const query = {'_id': id};
    var promise = new Promise(function(resolve, reject){
      baseDocument.delete(collection, query).then(function(result){
      resolve(result);
    }).catch(function(e){reject(e)});
  });
  return promise;
  }

  acceptOne(id){
    const baseDocument = new BaseDocument();
    const collection = 'checkout';
    const access_at = (new Date).getTime();
    const query = {'_id': id};
    const queryUpdate = {'$set':{'status':1, 'access_at':access_at}};
    return baseDocument.updateOne(collection, query, queryUpdate);
  }

  getCount(query){
    const baseDocument = new BaseDocument();
    const common = new Common();
    const collection = 'checkout';
    var promise = new Promise(function(resolve, reject){
      baseDocument.getCount(collection, query).then(function(result){
      resolve(result);
    }).catch(function(e){reject(e)});
  });
  return promise;
  }

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

  getAggregateOne(checkOutId){
    const collection = 'checkout';
    const joinCollecion = 'products';
    const query = {'_id' :  ObjectID(checkOutId)};
    const localField = 'pid';
    const foreignField = '_id';
    const alias = joinCollecion;
    const baseDocument = new BaseDocument();
    var promise = new Promise(function(resolve, reject){
      baseDocument.getAggregate(collection, joinCollecion, query, localField, foreignField, alias)
      .then(function(result){
      resolve(result);
    }).catch(function(e){reject(e)});
  });
  return promise;
  }

  getAggregateLimitAndSkipWithSort(query, limit, skip, sort){
    const collection = 'checkout';
    const joinCollecion = 'products';
    const localField = 'pid';
    const foreignField = '_id';
    const alias = joinCollecion;
    const baseDocument = new BaseDocument();
    var promise = new Promise(function(resolve, reject){
      baseDocument.getAggregateLimitAndSkipWithSort(collection, joinCollecion, query, localField,
         foreignField, alias, limit, skip, sort)
      .then(function(result){
      resolve(result);
    }).catch(function(e){reject(e)});
  });
  return promise;
  }

}
