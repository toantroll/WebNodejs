var express = require('express');
var app     = express();
var router  = express.Router();
import product from '../model/product';
import banner from '../model/banner';
import category from '../model/category';
import lazyModel from '../model/lazy-model';
import productView from '../model/product-view';
import ProductDocument from'../documentacess/product_document';
import CategoryDocument from'../documentacess/cate_document';
import BannerDocument from'../documentacess/banner_document';
import config from '../config';
import Common from '../util/common.js';
var ObjectID = require('mongodb').ObjectID;

var multer = require('multer'); // v1.0.5

// var Flickr = require("flickrapi");
// var flickrOptions = {
//       api_key: config.api_key,
//       secret: config.secret,
//       user_id: config.flickr_user_id,
//       access_token: config.flickr_access_token,
//       access_token_secret: config.flickr_access_token_secret
//     };
//     var photo = require('flickr-photo-info')({
//     key: config.api_key
//   })
//
//     const stream = require("stream");
//     var streamBuffers = require('stream-buffers');
router.use(function(req, res, next) { // run for any & all requests
    console.log("Connection to the API"); // set up logging for every API call
    next(); // ..to the next routes from here..
});

router.route('/get-product/:first/:rows/:sortBy/:sortType')
.get(function(req,res){
  const common = new Common();
  let lazy = lazyModel;
  lazy.first = !common.isNumber(req.params.first)? 0 : req.params.first;
  lazy.rows = !common.isNumber(req.params.rows)? 0 : req.params.rows;
  lazy.sortType = req.params.sortType == 1 || req.params.sortType == -1 ? req.params.sortType : 1;
  let resData = {totalRecords:0, data:[]};
  if(lazy.rows === 0){
    res.json(resData);
    return;
  }
  const query = {};
  let sort = {};
  if(req.params.sortBy ==='price'){
    sort = {price:parseInt(lazy.sortType)};
  } else if(req.params.sortBy ==='webPrice'){
    sort = {webprice:parseInt(lazy.sortType)};
  } else {
    sort = {name:parseInt(lazy.sortType)};
  }
  const productDocument = new ProductDocument();
  //get total records
  productDocument.getCount().then(function(result){
    if(result > 0){
      resData.totalRecords = result;
      productDocument.getManyAndLimitWithSort(query, lazy.rows*1, 1*lazy.first, sort).then(function(result){
        console.log(sort);
        var pAray =[];
        for(var i = 0; i < result.length; i++){
          // var p = productView;
          // p.id = result[i]._id;
          // p.image = result[i].img[0];
          // p.name = result[i].name;
          // p.price = result[i].price;
          // p.webPrice = result[i].webprice;
          pAray.push({id:result[i]._id, image:result[i].img[0], name:result[i].name,
             price:result[i].price, webPrice:result[i].webprice, originPrice: result[i].originprice});
        }
        resData.data = pAray;
        res.json(resData);
      }).catch(function(e){console.log(e);res.json('Record Error'); return;});
    } else {
      res.json(resData);
    }
  }).catch(function(e){console.log(e);res.json('Count Error'); return;});
});

router.route('/updatecategory').post(function(req,res){
  var ms = multer.memoryStorage();
  var upload = multer({storage:ms}).single('img');

  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      res.json('Error');
      return;
    }
    //get data
    const data = req.body;
    const img = req.file;
    const common = new Common();
    //validate
    if(common.isEmpty(data.parent)){
      res.json('parent Error');
      return;
    }
    if(common.isEmpty(data.cateId)){
      res.json('category id Error');
      return;
    }
    if(common.isEmpty(data.cateName)){
      res.json('category name Error');
      return;
    }
    if(data.parent === '0' && data.cateId === '0' && !common.isImage(img)){
      res.json('image Error');
      return;
    }

    //fill data into model
    var c = category;
    c._id = data.cateId === '0'? new ObjectID(): ObjectID(data.cateId);
    c.name = data.cateName;
    c.url = '/'+common.changeAlias(data.cateName);
    console.log('cate ID: '+c._id);

    //init path
    const imageRealPath = './src/static';
    const imageFolder = '/img/category/';
    const fileType = '.png';

    console.log(c);

    //create category
    const categoryDocument = new CategoryDocument();
    if(data.parent === '0'){
        if(data.cateId === '0'){
          console.log('create paremt');
          //create parent cate
          c['sub_cate'] = [];
            common.writeFile(imageRealPath+imageFolder+c._id+fileType, req.file.buffer);
          categoryDocument.insertOne(c).then(function(result){
            res.json('OK');
          }).catch(function(e){console.log(e);res.json('Create Error'); return;});
        } else {
          console.log('update parent');
          //update parent cate
          if(!common.isEmpty(img)){
            common.writeFile(imageRealPath+imageFolder+c._id+fileType, req.file.buffer);
          }
          const query ={'_id':c._id};
          const updateData = {'$set':c};
          categoryDocument.updateOne(query, updateData).then(function(result){
            console.log(result.result.nModified);
            res.json('OK');
          }).catch(function(e){console.log(e);res.json('Update Error'); return;});
        }

    } else {
      if(data.cateId === '0'){
        //create sub cate
        const query ={'_id':new ObjectID(data.parent)};
        const updateData = {'$push':{'sub_cate':c}};
        categoryDocument.updateOne(query, updateData).then(function(result){
          res.json('OK');
        }).catch(function(e){console.log(e);res.json('Update Error'); return;});
      } else {
        //update sub cate
        const query ={'$and': [{'_id':new ObjectID(data.parent)}, {'sub_cate':{'$elemMatch':{_id:c._id}}}]};
        const updateData = {'$set':{'sub_cate.$':c}};
        categoryDocument.updateOne(query, updateData).then(function(result){
          res.json('OK');
        }).catch(function(e){console.log(e);res.json('Update Error'); return;});
      }

    }
});
});

router.route('/updatebanner').post(function(req,res){
  var ms = multer.memoryStorage();
  var upload = multer({storage:ms}).single('img');

  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      res.json('Error');
      return;
    }
    const data = req.body;
    console.log(req.file);
    const common = new Common();
    var b = banner;
    if(data.sort > 5 || data.sort < 1){
      res.json('Sort Error');
      return;
    }
    if(!ObjectID.isValid(data.id)){
      res.json('Id Error');
      return;
    }
    b._id = ObjectID(data.id);
    b.title = data.title;
    b.content = data.content;
    b.url = data.url;

    const img = req.file;
    console.log(req.file);
    const bannerDocument = new BannerDocument();
    if(!common.isEmpty(img)){
      const imageRealPath = './src/static';
      const imageFolder = '/img/banner/';
      const fileType = '.jpg';
      console.log(imageRealPath+imageFolder+data.sort+fileType);
      common.writeFile(imageRealPath+imageFolder+data.sort+fileType, req.file.buffer);
    }

    bannerDocument.updateOne(b).then(function(result){
      res.json('OK');
    }).catch(function(e){console.log(e);res.json('Update Error'); return;});
  });
});

router.route('/product').post(function(req,res){
  var ms = multer.memoryStorage();
  var upload = multer({storage:ms}).array('image');

  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      res.json('Error');
      return;
    }

    //get data from form-data
    const data = req.body;
    const common = new Common();
    if(common.isEmpty(data.id)){
      res.json('Data Error');
      return;
    }

    if(!common.isNumber(data.price) || !common.isNumber(data.webPrice) || !common.isNumber(data.originPrice)){
      console.log(data.price+', '+ data.webPrice +', '+data.originPrice);
      res.json('price Error');
      return;
    }

    var p = product;
    p.cate_id = data.category;
    p.description = data.description;
    p.name = data.name;
    p.price = parseInt(data.price);
    p.webprice = parseInt(data.webPrice);
    p.originprice = parseInt(data.originPrice);

    p._id = data.id == '0' ?new ObjectID(): ObjectID(data.id);
    if(data.id == '0' && req.files.length === 0){
      res.json('Image Error');
      return;
    } else {

      if(data.id == '0'){
    const imageRealPath = './src/static';
    const imageFolder = '/img/product/';
    const fileType = '.png';

    var isError = false;
    var imageUrlArray = [];
    //get image buffer
    for(var i = 0; i <req.files.length; i++){
          //save image and create url
          const imageUrl = imageFolder+p._id+"_"+i+fileType;
          isError = common.writeFile(imageRealPath+imageFolder+p._id+"_"+i+fileType, req.files[i].buffer);
          imageUrlArray.push(imageUrl);
  }
    if(isError){
      res.json('Can not get image');
      return;
    }
    //image
    p.img = imageUrlArray;
    const productDocument = new ProductDocument();
        //insert product
        productDocument.insertOne(p).then(function(data){
          res.json('OK');
        }).catch(function(e){console.log(e);res.json('Insert Error');return;});

  }
}
  if(data.id != '0'){
    console.log('Go Update');
    var imageUrlArray = [];
    console.log(req.files.length);
    if(req.files.length > 0){

      const imageRealPath = './src/static';
      const imageFolder = '/img/product/';
      const fileType = '.png';

      var isError = false;
      //get image buffer
      for(var i = 0; i <req.files.length; i++){
            //save image and create url
            const imageUrl = imageFolder+p._id+"_"+i+fileType;
            isError = common.writeFile(imageRealPath+imageFolder+p._id+"_"+i+fileType, req.files[i].buffer);
            imageUrlArray.push(imageUrl);
    }
      if(isError){
        res.json('Can not get image');
        return;
      }

    }
    //image
    p.img = imageUrlArray;
    console.log(p.img);
    console.log('come document');
    const productDocument = new ProductDocument();
        //update product
        productDocument.updateOne(p).then(function(data){
          res.json('OK');
        }).catch(function(e){console.log(e);res.json('Update Error');return;});
  }

  // console.log(flickrOptions);
  // //auth
  // Flickr.authenticate(flickrOptions, function(error, flickr) {
  // var uploadOptions = {};
  // var photos = [];
  //
  // for(var i = 0; i <req.files.length; i++){
  //   //create stream for each image
  //   let readStream = new stream.PassThrough();
  //   readStream.write(req.files[i].buffer);
  //   readStream.end();
  //   readStream.path='./upload/image.png';
  //   photos.push({
  //     title: "Shoes",
  //     tags: [
  //       "shoes"
  //     ],
  //     photo:  readStream
  //   });
  // }
  // uploadOptions = {photos:photos};
  // //upload all file
  // Flickr.upload(uploadOptions, flickrOptions, function(err, result) {
  //   if(err) {
  //     return console.error(error);
  //   }
  //   //get ember url
  //   getUrls(result).then(function(data){
  //     p.img = data;
  //     console.log(p);
  //     const productDocument = new ProductDocument();
  //     //insert product
  //     productDocument.insertOne(p).then(function(data){
  //       res.json(data);
  //     }).catch(function(e){res.json(e)});
  //   });
  //
  // });
});
});

//getUrls
function getUrls(result){
  var promise = new Promise(function(resolve, reject){
    var flag = 0;
    var urlArray = [];
    for(var i = 0; i < result.length; i++){
      photo(result[i], function (error, p) {
          urlArray.push(p.urls.original);
          flag++;
      });
    }
    var call = setInterval(function(){
      if(flag == result.length){
          resolve(urlArray);
          clearInterval(call);
      }
    }, 100);
});
return promise;
}


//http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
//https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=7536d7af245a346836deab66a041a02e&photo_id=37560229926&format=json

module.exports = router;
