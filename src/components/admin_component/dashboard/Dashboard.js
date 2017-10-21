'use strict';

import React from 'react';
import user from '../../../service/getuser';
import LeftMenu from './left_menu';
import AddProduct from './add_product';
import ManageCategory from './manage_category';
import ManageBanner from './manage_banner';
import ListProdcuts from './list_product';
import checkAuth from '../../../service/common/check-auth.js';

export default class DashBoardPage extends React.Component {
	constructor(props) {
		checkAuth();
		super(props);
		this.state = {route:this.props.params.route};
	}

	getUser(props){
	console.log('asdadasdasd');
	const data = user.getByName(props.userName);
	return(
		<div>
		{data}
		</div>
	);
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
		const route = this.state.route;
		var data;
		if(route==='add-product'){
			data = <AddProduct/>;
		} else if(route==='manage-category'){
			data = <ManageCategory/>;
		} else if(route==='manage-banner'){
			data = <ManageBanner/>;
		} else if(route==='list-product') {
			data = <ListProdcuts/>;
		}
		return(
		<div className="page-md page-header-fixed page-sidebar-closed-hide-logo page-sidebar-closed-hide-logo">
			<div className="page-container">
				<LeftMenu/>
				<div className="page-content-wrapper">
					<div className="page-content" id="content">
						{data}
					</div>
				</div>
			</div>
		</div>
		);
	}
}
