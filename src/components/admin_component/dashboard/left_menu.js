'use strict';

import React from 'react';
import user from '../../../service/getuser';

export default class DashBoardPage extends React.Component {
	constructor(props) {
		super(props);
	}

  render(){
    return(
      <div className="page-sidebar-wrapper">

		<div className="page-sidebar md-shadow-z-2-i  navbar-collapse collapse">

			<ul className="page-sidebar-menu " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
				<li className="start ">
					<a href="#">
					<i className="icon-home"></i>
					<span className="title">Dashboard</span>
					</a>
				</li>
				<li className="start ">
					<a href="/manage-category">
					<i className="icon-home"></i>
					<span className="title">Quản lý danh mục</span>
					</a>
				</li>
				<li className="start ">
					<a href="/list-product">
					<i className="icon-home"></i>
					<span className="title">Quản lý sản phẩm</span>
					</a>
				</li>
				<li className="start ">
					<a href="/manage-banner">
					<i className="icon-home"></i>
					<span className="title">Quản lý banner</span>
					</a>
				</li>
			</ul>

		</div>
	</div>
    );
  }
}
