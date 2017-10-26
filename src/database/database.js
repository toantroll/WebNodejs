var MongoClient = require('mongodb').MongoClient;
ObjectID = require('mongodb').ObjectID
var url = "mongodb://toantroll2305:anlolnhe@ds147544.mlab.com:47544/shoes_shop";

MongoClient.connect(url, function(err, db) {
if (err) throw err;

  var main_menu = [{
    _id: new ObjectID(),
    cate_id: ObjectID("59ccadcda4b88a2550daa54d"),
    name:'LOL',
    img: ['/view/s1.jpg', '/view/s1.jpg', '/view/s1.jpg'],
    description: "sdfggasfasf",
    price: 1450000,
    webprice: 10000000,
    hot:1,
    rating:4,
    viewtotal:1
  },
  {
    _id: new ObjectID(),
    cate_id: ObjectID("59ccadcda4b88a2550daa54d"),
    name:'LOL 2',
    img: ['/view/s1.jpg', '/view/s1.jpg', '/view/s1.jpg'],
    description: "sdfggasfasf",
    price: 100000,
    webprice: 10000000,
    hot:1,
    rating:4,
    viewtotal:1
    }
  ];
  if (err) throw err;
  var query = {user_name:'admin', password:'admin'};
  // db.collection('category').updateOne({ _id: ObjectID('59e4e2fc9159ec25fc80a480') }, { '$set':
  //  { sub_cate:[
  //     { _id: ObjectID('59e4df4c05c5b42874ce056c'),
  //       name: 'test sub cate 3',
  //       sort: 999,
  //       url: '/test-sub-cate' }] } }, function(err, result) {
  //   if (err) throw err;
  //     console.log(result);
  //   db.close();
  // });

  // db.collection("category").updateOne({_id: ObjectID('59e4f5c54ce1bc2d18f32e7e') },
  //    { '$set': { _id: ObjectID('59e4f5c54ce1bc2d18f32e7e'),
  // name: 'asdw',
  // sort: 999,
  // url: '/asdw' }}
  //    , function(err, result) {
  //   if (err) throw err;
  //   console.log(result);
  //   db.close();
  // });

//   var query = {user_name:'admin', password: 'admin'};
//   db.collection("user").find(query).toArray(function(err, result) {
//   if (err) throw err;
//   console.log(result);
//   db.close();
// });

db.collection("checkout").aggregate([
   {$match : { '_id' :  ObjectID('59ef795111a3ef029c488f76')}},
    {
      $lookup:
       {
         from: 'products',
         localField: 'pid',
         foreignField: '_id',
         as: 'product'
       }
     }
    ], function(err, res) {
    if (err) throw err;
    console.log(res[0]);
    db.close();
  });
});
