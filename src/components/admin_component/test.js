'use strict';

import React from 'react';
import user from '../../service/getuser';

export default class TestPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
	console.log('asdadasdasd');
	const data = user.getByName('admin');
	console.log(data);
	}
	getUser12(props){
	console.log('asdadasdasd');
	return(
		<div>
			<h1>Runnning......</h1>
		</div>
	);
}
	render(){
		return(
		<div>
			<input type="button" value="test" onClick={this.handleClick}/>
		</div>
		)
	}
}
