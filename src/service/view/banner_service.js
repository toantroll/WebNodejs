'use strict';

import $ from 'jquery';
import header from '../../service/common/header';

export default class BannerService {
  constructor(props) {

  }

 GetBanner(){
   var data = {};
     var promise = new Promise(function(resolve, reject){
       $.ajax({
     url: '/get/banner',
      type: "GET",
     dataType: 'json',
     cache: false,
     success: function(data) {
        resolve(data);
     },
     error: function(xhr, status, err) {
       console.error('this.props.url', status, err.toString());
       return false;
     }
   });
    });
   return promise;
 }

}
