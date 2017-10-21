	'use strict';
import React from 'react';
import localStorage from 'local-storage';
import config from '../../config';

export default function Header(){
	const token =  localStorage.get(config.cookieKey);
	return {'x-access-token':token}
}
