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
import CheckoutDocument from '../documentacess/checkout_document';
import ScheduleDocument from '../documentacess/schedule_document';
import Common from '../util/common.js';
import lazyModel from '../model/lazy-model';
var ObjectID = require('mongodb').ObjectID;
import checkout from '../model/checkout';

router.use(function(req, res, next) { // run for any & all requests
    console.log("Connection to the GET"); // set up logging for every API call
    next(); // ..to the next routes from here..
});

router.route('/getschedule')
.get(function(req, res){
  const scheduleDocument = new ScheduleDocument();
  scheduleDocument.getAggregateOne().then(function(result){
    console.log(result);
    var data = {pid:result.products[0]._id, description:result.description,
                image:result.products[0].img[0], price:result.products[0].price,
                webPrice:result.products[0].webprice};
    res.json(data);
  }).catch(function(e){console.log(e);res.json('Count Error'); return;});
});

router.route('/get-checkout/:first/:rows/:sortBy/:sortType')
.get(function(req,res){
    const common = new Common();
    let lazy = lazyModel;
    lazy.first = !common.isNumber(req.params.first)? 0 : req.params.first;
    lazy.rows = !common.isNumber(req.params.rows)? 0 : req.params.rows;
    lazy.sortType = req.params.sortType == 1 || req.params.sortType == -1 ? req.params.sortType : 1;
    let resData = {totalRecords:0, data:[]};

    //limit 0
    if(lazy.rows === 0){
      res.json(resData);
      return;
    }
    const query = {'status':0};
    //create sort - sort by date
    let sort = {'create_at': 1};

    const checkoutDocument = new CheckoutDocument();
    //get total records
    checkoutDocument.getCount(query).then(function(result){
      if(result > 0){
          resData.totalRecords = result;
        checkoutDocument.getAggregateLimitAndSkipWithSort(
          query, lazy.rows*1, lazy.first * 10, sort
        ).then(function(result){
            var cAray =[];
            //filter data
            for(var i = 0; i < result.length; i++){
            cAray.push({id:result[i]._id, cusName:result[i].cus_name, cusTel:result[i].cus_tel,
            cusAdd:result[i].cus_add, pName:result[i].products[0].name, pImage:result[i].products[0].img[0],
            cusSize:result[i].cus_size, pPrice:result[i].products[0].webprice, createAt:result[i].create_at});
            }
            //put to client
            resData.data = cAray;
            res.json(resData);
    }).catch(function(err){console.log(err);res.json('Sys Error'); return;});
  } else {
    res.json(resData);
  }
}).catch(function(e){console.log(e);res.json('Count Error'); return;});
});

//checkout
router.route('/checkout')
.post(function(req,res){
  const common = new Common();
  const data = req.body;

  //validate
  if(common.isEmpty(data.id) || !ObjectID.isValid(data.id)){
    res.json('Id Error');
    return;
  }
  if(common.isEmpty(data.cusSize) || common.isEmpty(data.cusName) || common.isEmpty(data.cusTel) || common.isEmpty(data.cusAdd)
      || !common.isNumber(data.cusSize) || !common.isNumber(data.cusTel)){
        res.json('Info Error');
        return;
  }

  //fill data into model
  var c = checkout;
  c._id = new ObjectID();
  c.pid = ObjectID(data.id);
  c.cus_size = data.cusSize;
  c.cus_name = data.cusName;
  c.cus_tel = data.cusTel;
  c.cus_add = data.cusAdd;
  c.create_at = (new Date).getTime();

  const checkoutDocument = new CheckoutDocument();
      checkoutDocument.insertOne(c).then(function(result){
        res.json('OK');
      }).catch(function(err){res.json('Sys Error'); return;});
});


router.route('/banner').get(function(req, res){
  const bannerAccess =  new BannerDocument();
  bannerAccess.getBanner().then(function(data){
      res.json(data);
  }).catch(function(e){console.log(e); res.json({})});
});

router.route('/auth').get(function(req, res){
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
    productDocument.getProductByCateId(id, limit*1, offset*10).then(function(result){
      data.data = result;
      const common = new Common();
      var query = common.isEmpty(id)?{}:{cate_id:baseDocument.convertToObjectId(id)};
      productDocument.getCount(query).then(function(result){
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
  }).catch(function(e){console.log(e)});
});

module.exports = router;
