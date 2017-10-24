import dbs from './connection';
import config from '../config';
import user from '../model/user';
export default class userDocument {
  findByUserNameAndPassword(userName, password){
    var promise = new Promise(function(resolve, reject){
    dbs.connect(config.connectionString, function(err, db){
      if (err) throw err;
      var query = {user_name:userName, password: password};
      db.collection("user").find(query).toArray(function(err, result) {
      if (err) throw err;
      resolve(result[0]);
      db.close();
    });
    });
  });

    return promise;
  }
}
