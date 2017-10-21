'use strict';

import $ from "jquery";
import header from './common/header';

const userService = {
	getByName(name){
	$.ajax({
		 url: '/api/user',
		  type: "POST",
		 dataType: 'json',
		 data: {name:name},
		 cache: false,
		 success: function(data) {
				console.log(data);
				console.log(header());
		 }.bind(this),
		 error: function(xhr, status, err) {
			 console.error('this.props.url', status, err.toString());
		 }.bind(this)
	 });
}
}

export default userService
