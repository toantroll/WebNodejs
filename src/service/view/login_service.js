'use strict';

import $ from 'jquery';
import header from '../../service/common/header';
import localStorage from 'local-storage';
import config from '../../config';

export default function LoginService(){
  $.ajax({
     url: '/auth',
      type: "POST",
     dataType: 'json',
     data: this.state,
     cache: false,
     success: function(data) {
        localStorage.set(config.cookieKey, data.token);
        return true;
     }.bind(this),
     error: function(xhr, status, err) {
       console.error('this.props.url', status, err.toString());
       return false;
     }.bind(this)
   });
}
