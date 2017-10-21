'use strict';

import localStorage from 'local-storage';
import config from '../../config';

export default function checkAuth(){
  const token =  localStorage.get(config.cookieKey);
  console.log(token);
  if(token){

  }else {
     //window.location = '/admin/login';
  }
}
