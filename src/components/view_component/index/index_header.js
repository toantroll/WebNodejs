'use strict';
import $ from 'jquery';
import React from 'react';
import Loading from'../Loading';
import config from '../../../config';

function RenderLi(props){
  if(props.data != undefined && props.data.length > 0){
    const data = props.data;
    var liArray = [];
      for(var i = 0; i < data.length; i++){
        liArray.push(<li><a className="" href={'/danh-muc'+data[i].url+"/"+data[i]._id} >{data[i].name}</a></li>);
      }
    return(
        <li><a className="menu__link" href={props.url} data-toggle="dropdown" >{props.name}<b className="caret"></b></a>
            <ul className="dropdown-menu agile_short_dropdown">
              {liArray}
            </ul>
        </li>
    )
  } else {
    return(
      <li><a className="menu__link" href={props.url} >{props.name}</a></li>
    );

  }

}
function RenderSubMenu(props){
  return(
    <ul className="dropdown-menu agile_short_dropdown">
      <li><a href="#">Web Icons</a></li>
      <li><a href="#">Typography</a></li>
    </ul>
  );
}

function RenderMainMenu(props){
  if(props.data.length ===0){
    return(<div></div>);
  } else {
    const data = props.data;
    var menuArray = [];
    for(var i = 0; i < data.length ; i++){
      menuArray.push(<RenderLi data={data[i].sub_cate} url={data[i].url} name={data[i].name}/>);
    }
    return(
      <div className="collapse navbar-collapse menu--shylock" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav menu__list">
          {menuArray}
        </ul>
      </div>
    );
  }
}

export default class IndexHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {loginName:'', password:'', data:[], currentItem:{}};
    this.submitCart = this.submitCart.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }


  submitSearch(e){
    e.preventDefault();
  }

  submitCart(e){
    e.preventDefault();
  }

  submitCheckOut(e){
    e.preventDefault();
  }


  componentDidMount(){
    var sefl = this;
    $.ajax({
   url: '/get/mainMenu',
   type: "GET",
   dataType: 'json',
   cache: false
   }).done(function(data) {
     sefl.setState({data: data});
   }).fail(function(err){

   });
  }

  handleChange(e){
    const fieldName = e.target.name;
    const data = {};
    data[fieldName]= e.target.value
    this.setState(data);
  }

  render(){
    const loginName = this.state.loginName;
    const currentItem = this.state.currentItem;
    return(
      <div>
    <div className="header" id="home">
    	<div className="container">
    		<ul>
    		  <li> <a href="#" data-toggle="modal" data-target="#myModal"><i className="fa fa-unlock-alt" aria-hidden="true"></i> Sign In </a></li>
    			<li> <a href="#" data-toggle="modal" data-target="#myModal2"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Sign Up </a></li>
    			<li><i className="fa fa-phone" aria-hidden="true"></i> Call : {config.tel}</li>
    			<li><i className="fa fa-envelope-o" aria-hidden="true"></i> <a href="#">{config.email}</a></li>
    		</ul>
    	</div>
    </div>
    <div className="header-bot">
    	<div className="header-bot_inner_wthreeinfo_header_mid">
    		<div className="col-md-4 header-middle">
    			<form action="#" method="post" onSubmit={this.submitSearch}>
    					<input type="search" name="search" placeholder="Search here..." required=""/>
    					<input type="submit" value=" "/>
    				<div className="clearfix"></div>
    			</form>
    		</div>
    			<div className="col-md-4 logo_agile">
    				<h1><a href="/"><span>Z</span>elus Store <i className="fa fa-shopping-bag top_logo_agile_bag" aria-hidden="true"></i></a></h1>
    			</div>
    		<div className="col-md-4 agileits-social top_content">
    						<ul className="social-nav model-3d-0 footer-social w3_agile_social">
    						                                   <li className="share">Share On : </li>
    															<li><a href="#" className="facebook">
    																  <div className="front"><i className="fa fa-facebook" aria-hidden="true"></i></div>
    																  <div className="back"><i className="fa fa-facebook" aria-hidden="true"></i></div></a></li>
    															<li><a href="#" className="twitter">
    																  <div className="front"><i className="fa fa-twitter" aria-hidden="true"></i></div>
    																  <div className="back"><i className="fa fa-twitter" aria-hidden="true"></i></div></a></li>
    															<li><a href="#" className="instagram">
    																  <div className="front"><i className="fa fa-instagram" aria-hidden="true"></i></div>
    																  <div className="back"><i className="fa fa-instagram" aria-hidden="true"></i></div></a></li>
    															<li><a href="#" className="pinterest">
    																  <div className="front"><i className="fa fa-linkedin" aria-hidden="true"></i></div>
    																  <div className="back"><i className="fa fa-linkedin" aria-hidden="true"></i></div></a></li>
    														</ul>



    		</div>
    		<div className="clearfix"></div>
    	</div>
    </div>
    <div className="ban-top">
    	<div className="container">
    		<div className="top_nav_left">
    			<nav className="navbar navbar-default">
    			  <div className="container-fluid">
    				<div className="navbar-header">
    				  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
    					<span className="sr-only">Toggle navigation</span>
    					<span className="icon-bar"></span>
    					<span className="icon-bar"></span>
    					<span className="icon-bar"></span>
    				  </button>
    				</div>
              <RenderMainMenu  data={this.state.data}/>
    			  </div>
    			</nav>
    		</div>
    		<div className="top_nav_right">
    			<div className="wthreecartaits wthreecartaits2 cart cart box_1">
    						<form action="#" onSubmit={this.submitCart} method="post" className="last">
    						<input type="hidden" name="cmd" value="_cart"/>
    						<input type="hidden" name="display" value="1"/>
    						<button className="w3view-cart" type="submit" name="submit" value=""><i className="fa fa-cart-arrow-down" aria-hidden="true"></i></button>
    					</form>

    						</div>
    		</div>
    		<div className="clearfix"></div>
    	</div>
    </div>
    		<div className="modal fade" id="myModal" tabindex="-1" role="dialog">
    			<div className="modal-dialog">
    				<div className="modal-content">
    					<div className="modal-header">
    						<button type="button" className="close" data-dismiss="modal">×</button>
    					</div>
    						<div className="modal-body modal-body-sub_agile">
    						<div className="col-md-8 modal_body_left modal_body_left1">
    						<h3 className="agileinfo_sign">Sign In <span>Now</span></h3>
    									<form action="#" method="post">
    							<div className="styled-input agile-styled-input-top">
    								<input type="text" name="loginName" value={loginName} onChange={this.handleChange} autocomplete="off" required="required"/>
    								<label>Name</label>
    								<span></span>
    							</div>
    							<div className="styled-input">
    								<input type="password" name="password" onChange={this.handleChange} required="required"/>
    								<label>Password</label>
    								<span></span>
    							</div>
    							<input type="button" value="Sign In"/>
    						</form>
    						  <ul className="social-nav model-3d-0 footer-social w3_agile_social top_agile_third">
    															<li><a href="#" className="facebook">
    																  <div className="front"><i className="fa fa-facebook" aria-hidden="true"></i></div>
    																  <div className="back"><i className="fa fa-facebook" aria-hidden="true"></i></div></a></li>
    															<li><a href="#" className="twitter">
    																  <div className="front"><i className="fa fa-twitter" aria-hidden="true"></i></div>
    																  <div className="back"><i className="fa fa-twitter" aria-hidden="true"></i></div></a></li>
    															<li><a href="#" className="instagram">
    																  <div className="front"><i className="fa fa-instagram" aria-hidden="true"></i></div>
    																  <div className="back"><i className="fa fa-instagram" aria-hidden="true"></i></div></a></li>
    															<li><a href="#" className="pinterest">
    																  <div className="front"><i className="fa fa-linkedin" aria-hidden="true"></i></div>
    																  <div className="back"><i className="fa fa-linkedin" aria-hidden="true"></i></div></a></li>
    														</ul>
    														<div className="clearfix"></div>
    														<p><a href="#" data-toggle="modal" data-target="#myModal2"> Don/t have an account?</a></p>

    						</div>
    						<div className="col-md-4 modal_body_right modal_body_right1">
    							<img src="./demo_files/log_pic.jpg" alt=" "/>
    						</div>
    						<div className="clearfix"></div>
    					</div>
    				</div>
    			</div>
    		</div>

    		<div className="modal fade" id="myModal2" tabindex="-1" role="dialog">
    			<div className="modal-dialog">
    				<div className="modal-content">
    					<div className="modal-header">
    						<button type="button" className="close" data-dismiss="modal">×</button>
    					</div>
    						<div className="modal-body modal-body-sub_agile">
    						<div className="col-md-8 modal_body_left modal_body_left1">
    						<h3 className="agileinfo_sign">Sign Up <span>Now</span></h3>
    						 <form action="#" method="post">
    							<div className="styled-input agile-styled-input-top">
    								<input type="text" name="Name" required=""/>
    								<label>Name</label>
    								<span></span>
    							</div>
    							<div className="styled-input">
    								<input type="email" name="Email" required=""/>
    								<label>Email</label>
    								<span></span>
    							</div>
    							<div className="styled-input">
    								<input type="password" name="password" required=""/>
    								<label>Password</label>
    								<span></span>
    							</div>
    							<div className="styled-input">
    								<input type="password" name="Confirm Password" required=""/>
    								<label>Confirm Password</label>
    								<span></span>
    							</div>
    							<input type="submit" value="Sign Up"/>
    						</form>
    						  <ul className="social-nav model-3d-0 footer-social w3_agile_social top_agile_third">
    															<li><a href="#" className="facebook">
    																  <div className="front"><i className="fa fa-facebook" aria-hidden="true"></i></div>
    																  <div className="back"><i className="fa fa-facebook" aria-hidden="true"></i></div></a></li>
    															<li><a href="#" className="twitter">
    																  <div className="front"><i className="fa fa-twitter" aria-hidden="true"></i></div>
    																  <div className="back"><i className="fa fa-twitter" aria-hidden="true"></i></div></a></li>
    															<li><a href="#" className="instagram">
    																  <div className="front"><i className="fa fa-instagram" aria-hidden="true"></i></div>
    																  <div className="back"><i className="fa fa-instagram" aria-hidden="true"></i></div></a></li>
    															<li><a href="#" className="pinterest">
    																  <div className="front"><i className="fa fa-linkedin" aria-hidden="true"></i></div>
    																  <div className="back"><i className="fa fa-linkedin" aria-hidden="true"></i></div></a></li>
    														</ul>
    														<div className="clearfix"></div>
    														<p><a href="#">By clicking register, I agree to your terms</a></p>

    						</div>
    						<div className="col-md-4 modal_body_right modal_body_right1">
    							<img src="./demo_files/log_pic.jpg" alt=" "/>
    						</div>
    						<div className="clearfix"></div>
    					</div>
    				</div>
    			</div>
    		</div>
      </div>
    );
  }
}
