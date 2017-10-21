
import BaseDocument from './base_document';
export default class CateDocument {

  updateOne(query, updateData){
    const baseDocument = new BaseDocument();
    const collection = 'category';
    return baseDocument.updateOne(collection, query, updateData);
  }

  insertOne(query){
      const baseDocument = new BaseDocument();
      const collection = 'category';
      return baseDocument.insertOne(collection, query);
  }

  getAllCategory(){
    const collection = 'category';
    const query = {};
    const sort = {sort:1,'sub_cate.sort':1};
    const baseDocument = new BaseDocument;

    var promise = new Promise(function(resolve, reject){
    new BaseDocument().getManyAndSort(collection ,query, sort).then(function(result){
      resolve(result);
    });
  });
  return promise;
  }
  getSubCategory(number){
    const collection = 'category';
    const query = {};
    const sort = {sort:1,'sub_cate.sort':1};
    const baseDocument = new BaseDocument;

    var promise = new Promise(function(resolve, reject){
    new BaseDocument().getManyAndSort(collection ,query, sort).then(function(result){
      var data = [];
      for(var i = 0; i < result.length; i++){
          for(var j = 0; j < result[i].sub_cate.length; j++){
              data.push(result[i].sub_cate[j]);
          }
      }
      data.sort(function(a,b){return a.sort - b.sort});
      if(number > 0){
      resolve(data.slice(0, 4));
    } else {
        resolve(data);
    }
    });
  });
  return promise;
  }

getById(cateId){
  const baseDocument = new BaseDocument();
  const collection = 'category';
  const id = baseDocument.convertToObjectId(cateId);
  const query = {'$or':[{'_id':id},{'sub_cate._id':id}]};
    return baseDocument.getOne(collection, query);
}

getSubCateById(ids){
  const baseDocument = new BaseDocument;
  const collection = 'category';
  const id = baseDocument.convertToObjectId(ids);
  const query = {'$or':[{'_id':id},{'sub_cate._id':id}]};
  const sort = {};


  var promise = new Promise(function(resolve, reject){
  baseDocument.getOne(collection ,query).then(function(result){
    const subCate = result.sub_cate;
    var data = [];
        for(var j = 0; j < subCate.length; j++){
            data.push(subCate[j]._id);
        }
    resolve(data);
  });
});
return promise;
}

}
