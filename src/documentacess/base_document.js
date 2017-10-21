import dbs from './connection';
import config from '../config';
var ObjectID = require('mongodb').ObjectID;
export default class bannerDocument {

  createObjectId(){
      return new ObjectID();
  }

  convertToObjectId(id){
    if(id ===''){
      return null;
    }
    return ObjectID.isValid(id) ? ObjectID(id) : null;
  }

  getCount(collection, query){
    var promise = new Promise(function(resolve, reject){
      dbs.connect(config.connectionString, function(err, db){
            if (err)  reject(err);
            db.collection(collection).count(query,function(err, result) {
            if (err)  reject(err);
            resolve(result);
            db.close();
          });
        });
    });
    return promise;
  }

  getOne(collection, query){
    var promise = new Promise(function(resolve, reject){
    dbs.connect(config.connectionString, function(err, db) {
    if (err) reject(err);
    db.collection(collection).findOne(query, function(err, result) {
      if (err) reject(err);
        resolve(result);
      db.close();
    });
  });
});
return promise;
  }

  updateOne(collection, query, updateData){
    var promise = new Promise(function(resolve, reject){
    dbs.connect(config.connectionString, function(err, db) {
    if (err) reject(err);
    db.collection(collection).updateOne(query, updateData, function(err, result) {
      if (err) reject(err);
        resolve(result);
      db.close();
    });
  });
  });
  return promise;
  }

  insertOne(collection, query){
    var promise = new Promise(function(resolve, reject){
    dbs.connect(config.connectionString, function(err, db) {
    if (err) reject(err);
    db.collection(collection).insertOne(query, function(err, result) {
      if (err) reject(err);
        resolve(result);
      db.close();
    });
  });
  });
  return promise;
  }

  getMany(collection, query){
    var data = {};
    var promise = new Promise(function(resolve, reject){
      dbs.connect(config.connectionString, function(err, db){
            if (err)  reject(err);
            db.collection(collection).find(query).toArray(function(err, result) {
            if (err)  reject(err);
            resolve(result);
            db.close();
          });
        });
    });
    return promise;
  }
  getManyAndSort(collection, query, sort){
    var data = {};
    var promise = new Promise(function(resolve, reject){
      dbs.connect(config.connectionString, function(err, db){
            if (err)  reject(err);
            db.collection(collection).find(query).sort(sort).toArray(function(err, result) {
            if (err)  reject(err);
            resolve(result);
            db.close();
          });
        });
    });
    return promise;
  }

  getManyAndLimitWithSort(collection, query, limit, skip, sort){
    var promise = new Promise(function(resolve, reject){
      dbs.connect(config.connectionString, function(err, db){
            if (err)  reject(err);
            db.collection(collection).find(query).limit(limit).skip(skip).sort(sort).toArray(function(err, result) {
            if (err)  reject(err);
            resolve(result);
            db.close();
          });
        });
    });
    return promise;
  }

  getManyAndLimit(collection, query, limit, skip){
    var data = {};
    var promise = new Promise(function(resolve, reject){
      dbs.connect(config.connectionString, function(err, db){
            if (err)  reject(err);
            db.collection(collection).find(query).limit(limit).skip(skip).toArray(function(err, result) {
            if (err)  reject(err);
            resolve(result);
            db.close();
          });
        });
    });
    return promise;
  }
}
