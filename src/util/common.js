import fs from 'fs';
export default class Common {

writeFile(path, data){
  fs.writeFile(path, data, (err) => {
  if (err){
    throw err;
    return false;
  }
  return true;
});
}

isEmpty(a){
  if(a === undefined || a === null || a === ''){
      return true;
  }
  return false;
}

isNumber(a){
  if(this.isEmpty(a) || isNaN(a) || a < 0){
    return false;
  }
  return true;
}

isImage(a){
    if(a === undefined || a === null){
      return false;
    }
    if(a.mimetype === 'image/jpeg' || a.mimetype === 'image/png'){
      return true;
    } else {
      return false;
    }
}

changeAlias(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    str = str.replace(/đ/g,"d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    str = str.replace(/ + /g," ");
    str = str.trim();
    str = str.replace(/ /g,'-');
    return str;
}

}
