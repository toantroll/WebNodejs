'use strict';

import React from 'react';

export default class SingleBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state= {cateName: props.data.name, cateId: props.data._id};
  }

  render(){
    const bgimg = 'url(/img/category/'+this.state.cateId+'.png) no-repeat center';
    return(
      <div className="page-head_agile_info_w3l" style={{background:bgimg }}>
    		<div className="container">
    			<h3>{this.state.cateName}</h3>
    				 <div className="services-breadcrumb">
    						<div className="agile_inner_breadcrumb">

    						   <ul className="w3_short">
    								<li><a href="/">Trang chủ</a><i>|</i></li>
    								<li>{this.state.cateName}</li>
    							</ul>
    						 </div>
    				</div>
    	</div>
    </div>
    );
  }
}
