import BaseDocument from './base_document';
import CateDocument from './cate_document';
import Common from '../util/common';
var ObjectID = require('mongodb').ObjectID;
export default class ProductDocument {

  updateOne(p){
    const baseDocument = new BaseDocument();
    const collection = 'products';
    const query = {'_id': p._id};
    const updateData = p.img.length === 0? {'name':p.name, 'cate_id':p.cate_id, 'price':p.price, 'webprice': p.webprice}
                                    :{'name':p.name, 'cate_id':p.cate_id, 'price':p.price, 'webprice': p.webprice, 'img':p.img};
    const queryUpdate = {'$set':updateData};
    return baseDocument.updateOne(collection, query, queryUpdate);
  }

  getManyAndLimitWithSort(query, limit, skip, sort){
    const baseDocument = new BaseDocument();
    const collection = 'products';
    var promise = new Promise(function(resolve, reject){
      baseDocument.getManyAndLimitWithSort(collection, query, limit, skip, sort).then(function(result){
        resolve(result);
      }).catch(function(e){reject(e)});
  });
  return promise;
  }
  getRandom(count){
    const base = new BaseDocument();
    const collection = 'products';
    const query = {};
    const limit = 3
    const skip = 0;
    var total = -1;
    var promise = new Promise(function(resolve, reject){
      base.getCount(collection, query).then(function(result){
      total = result;
      const rand = Math.floor((Math.random() * (total- count)) + 1);
      resolve(base.getManyAndLimit(collection ,query, count, rand));
    }).catch(function(e){reject(e)});
  });
  return promise;
  }

  getCount(cateId){
    const baseDocument = new BaseDocument();
    const common = new Common();
    const collection = 'products';
    var query = common.isEmpty(cateId)?{}:{cate_id:baseDocument.convertToObjectId(cateId)};
    var promise = new Promise(function(resolve, reject){
      baseDocument.getCount(collection, query).then(function(result){
      resolve(result);
    }).catch(function(e){reject(e)});
  });
  return promise;
  }

  insertOne(product){
    const baseDocument = new BaseDocument();
    const collection = 'products';
    product.cate_id = baseDocument.convertToObjectId(product.cate_id);
    var promise = new Promise(function(resolve, reject){
      baseDocument.insertOne(collection, product).then(function(result){
      resolve(result);
    }).catch(function(e){reject(e)});
  });
  return promise;
  }

  getProductByCateId(cateId, limit, skip){
    const baseDocument = new BaseDocument();
    const collection = 'products';
    const query = {cate_id:baseDocument.convertToObjectId(cateId)};//{cate_id:ObjectID(cateId)};
    console.log(query);
    return baseDocument.getManyAndLimit(collection, query, limit, skip);
  }

  getProductByParentCateId(cateId, limit, skip){
    const collection = 'products';
    const cateDocument = new CateDocument();
    const baseDocument = new BaseDocument();
    var data={product:{}, category:{}};
      var promise = new Promise(function(resolve, reject){
        var isEnd = false;
        cateDocument.getSubCateById(cateId).then(function(result){
          console.log(result);
          console.log("cate");
            const inQuery = {cate_id:{'$in':result}};
              resolve(baseDocument.getManyAndLimit(collection, inQuery, limit, skip));
        }).catch(function(e){reject(e)});

        });

    return promise;
  }

  getProductByArrayCateId(cate, limit, skip){

  }

  getById(id){
    const collection = 'products';
    const cateDocument = new CateDocument();
    const baseDocument = new BaseDocument();
    const query = {_id:baseDocument.convertToObjectId(id)};
    var data={product:{}, category:{}};
      var promise = new Promise(function(resolve, reject){
        if(id){
        baseDocument.getOne(collection, query).then(function(result){
          if(result != null){
          var isEnd= false;
          data.product = result;
            const cateId = data.product['cate_id'];
            cateDocument.getById(cateId).then(function(result){
            data.category = result;
            isEnd = true;
          }).catch(function(e){reject(e);isEnd = true;});;

        var call = setInterval(function(){
          if(isEnd){
              resolve(data);
              clearInterval(call);
          }
        }, 100);
          } else {
            resolve(data);
          }


        }).catch(function(e){reject(e);});
      } else {
        resolve(data);
      }
      });
    return promise;
    ;
  }

  getNewArrial(count){
    const cateDocument = new CateDocument();
    const productDocument = new ProductDocument();
      var promise = new Promise(function(resolve, reject){
         cateDocument.getSubCategory(4).then(function(result){
            var data=[];
            var isEnd= false;
              for(var i = 0; i < result.length; i++){
                let subCateProduct= {cateName:'', data:[]};
                subCateProduct.cateName = result[i].name;
                productDocument.getProductByCateId(result[i]._id, count, 0).then(function(result){
                    subCateProduct.data = result;
                    data.push(subCateProduct);
                    isEnd= true;
                }).catch(function(e){reject(e);  isEnd= true;});
              }
              var call = setInterval(function(){
                if(isEnd){
                    resolve(data);
                    clearInterval(call);
                }
              }, 100);

         }).catch(function(err){reject(err)});
      });
      return promise;
  }

}
