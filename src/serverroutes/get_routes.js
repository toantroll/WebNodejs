var express = require('express');
var app     = express();
var router  = express.Router();
import user from '../model/user';//get data test
import jwt from'jsonwebtoken';
import config from '../config';
import BannerDocument from '../documentacess/banner_document';
import TrendingDocument from'../documentacess/trending_document';
import ProductDocument from'../documentacess/product_document';
import MainMenuDocument from '../documentacess/main_menu_document';
import CategoryDocument from '../documentacess/cate_document';
var ObjectID = require('mongodb').ObjectID;

router.use(function(req, res, next) { // run for any & all requests
    console.log("Connection to the GET"); // set up logging for every API call
    next(); // ..to the next routes from here..
});

router.route('/banner').get(function(req, res){
  const bannerAccess =  new BannerDocument();
  bannerAccess.getBanner().then(function(data){
      res.json(data);
  }).catch(function(e){console.log(e); res.json({})});
});

router.route('/auth').get(function(req, res){
    console.log(req.body);
    res.json(req.body);
});

router.route('/product/:id').get(function(req, res){
  const id = req.params.id;
  var data= {};
  if(id){
    const productDocument = new ProductDocument();
    productDocument.getById(id).then(function(data){
      res.json(data);
    }).catch(function(e){console.log(e); res.json(data)});
  } else {
      res.json(data);
  }
});

router.route('/productpage/:id/:offset').get(function(req, res){
  const id = req.params.id;
  const offset = req.params.offset;
  const limit = 10;
  var data= {total:0, data:[]};
  if(id !='' && ObjectID.isValid(id) && offset >= 0){
    const productDocument = new ProductDocument();
    productDocument.getProductByCateId(id, limit, offset*10).then(function(result){
      data.data = result
      productDocument.getCount(id).then(function(result){
        data.total = result;
        res.json(data);
      }).catch(function(e){
        res.json({total:0, data:[]});
      });

    }).catch(function(e){console.log(e); res.json(data)});
  } else {
      res.json(data);
  }
});


router.route('/category/:id').get(function(req, res){
  const id = req.params.id;
  var data= {};
  if(id !='' && ObjectID.isValid(id)){
    const categoryDocument = new CategoryDocument();
    categoryDocument.getById(id).then(function(data){

      res.json(data);
    }).catch(function(e){console.log(e); res.json(data)});
  } else {
      res.json(data);
  }
});

router.route('/allcategory').get(function(req, res){
  var data= {};
    const categoryDocument = new CategoryDocument();
    categoryDocument.getAllCategory().then(function(data){
      res.json(data);
    }).catch(function(e){console.log(e); res.json(data)});
});

router.route('/allsubcategory').get(function(req, res){
  var data= {};
    const categoryDocument = new CategoryDocument();
    categoryDocument.getSubCategory().then(function(data){
      res.json(data);
    }).catch(function(e){console.log(e); res.json(data)});
});

router.route('/newarrival').get(function(req, res){
  const product =  new ProductDocument();
  product.getNewArrial(config.newArrival).then(function(data){
      res.json(data);
  }).catch(function(e){console.log(e)});
});

router.route('/newarrivalcate/:id').get(function(req, res){
  const id = req.params.id;
  var data= {};
  if(id !='' && ObjectID.isValid(id)){
  const product =  new ProductDocument();
  product.getProductByParentCateId(id, 4, 0).then(function(data){
    console.log(data);
    console.log("product");
      res.json(data);
  }).catch(function(e){console.log(e)});
} else {
  res.json(data);
}
});

router.route('/mainMenu').get(function(req, res){
  const menu =  new MainMenuDocument();
  menu.getMainMenu().then(function(data){
      res.json(data);
  }).catch(function(e){console.log(e)});
});

router.route('/trending').get(function(req, res){
const trending =  new TrendingDocument();
const product =  new ProductDocument();
let data = {}
  trending.getTrending().then(function(result){
      data.trending = result;
      product.getRandom(2).then(function(result){
          data.lastItem = result;
          res.json(data);
      }).catch(function(e){console.log(e)});
    // console.log(product.getRandom(2));
    // res.json(data);
  }).catch(function(e){console.log(e)});
});

module.exports = router;
