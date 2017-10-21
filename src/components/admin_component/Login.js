'use strict';

import React from 'react';
import $ from 'jquery';
import header from '../../service/common/header';
import localStorage from 'local-storage';

export default class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.submitLogin = this.submitLogin.bind(this);
		this.state = {loginName: '',
									password: ''};
	}

	handleChange(e){
		const fieldName = e.target.name;
		const data = {};
		data[fieldName]= e.target.value
		this.setState(data);
		console.log('Run'+ e.target.value);
		console.log(fieldName);
		console.log(this.state);
	}

	submitLogin(e){
		e.preventDefault();
		$.ajax({
			 url: '/auth',
				type: "POST",
			 dataType: 'json',
			 data: this.state,
			 cache: false,
			 success: function(data) {
				 if(data.auth){
					 localStorage.set('nppToken', data.token);
					//send to Dashboard
					window.location = '/admin/dashboard';
				 }
			 }.bind(this),
			 error: function(xhr, status, err) {
				 console.error('this.props.url', status, err.toString());
			 }.bind(this)
		 });
	}
	render(){
		const loginName = this.state.loginName;
		return(
		<div className="page-md login">
			<div className="menu-toggler sidebar-toggler">
</div>
<div className="logo">
	<a href="index.html">
	<img src="/admin/layout4/img/logo-big.png" alt=""/>
	</a>
</div>
<div className="content">
	<form className="login-form" action="/auth" method="post" onSubmit={this.submitLogin}>
		<h3 className="form-title">Sign In</h3>
		<div className="alert alert-danger display-hide">
			<button className="close" data-close="alert"></button>
			<span>
			Enter any username and password. </span>
		</div>
		<div className="form-group">
			<label className="control-label visible-ie8 visible-ie9">Username</label>
			<input className="form-control form-control-solid placeholder-no-fix" type="text" value={loginName} autocomplete="off" placeholder="Username" name="loginName"  onChange={this.handleChange}/>
		</div>
		<div className="form-group">
			<label className="control-label visible-ie8 visible-ie9">Password</label>
			<input className="form-control form-control-solid placeholder-no-fix" type="password"  autocomplete="off" placeholder="Password" name="password" onChange={this.handleChange}/>
		</div>
		<div className="form-actions">
			<button type="submit" className="btn btn-success uppercase" >Login</button>
			<a href="javascript:;" id="forget-password" className="forget-password">Forgot Password?</a>
		</div>
		<div className="login-options">
			<h4>Or login with</h4>
			<ul className="social-icons">
				<li>
					<a className="social-icon-color facebook" data-original-title="facebook" href="javascript:;"></a>
				</li>
				<li>
					<a className="social-icon-color twitter" data-original-title="Twitter" href="javascript:;"></a>
				</li>
				<li>
					<a className="social-icon-color googleplus" data-original-title="Goole Plus" href="javascript:;"></a>
				</li>
				<li>
					<a className="social-icon-color linkedin" data-original-title="Linkedin" href="javascript:;"></a>
				</li>
			</ul>
		</div>
		<div className="create-account">
			<p>
				<a href="javascript:;" id="register-btn" className="uppercase">Create an account</a>
			</p>
		</div>
	</form>
	<form className="forget-form" action="index.html" method="post">
		<h3>Forget Password ?</h3>
		<p>
			 Enter your e-mail address below to reset your password.
		</p>
		<div className="form-group">
			<input className="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="Email" name="email"/>
		</div>
		<div className="form-actions">
			<button type="button" id="back-btn" className="btn btn-default">Back</button>
			<button type="submit" className="btn btn-success uppercase pull-right">Submit</button>
		</div>
	</form>
	<form className="register-form" action="index.html" method="post">
		<h3>Sign Up</h3>
		<p className="hint">
			 Enter your personal details below:
		</p>
		<div className="form-group">
			<label className="control-label visible-ie8 visible-ie9">Full Name</label>
			<input className="form-control placeholder-no-fix" type="text" placeholder="Full Name" name="fullname"/>
		</div>
		<div className="form-group">
			<label className="control-label visible-ie8 visible-ie9">Email</label>
			<input className="form-control placeholder-no-fix" type="text" placeholder="Email" name="email"/>
		</div>
		<div className="form-group">
			<label className="control-label visible-ie8 visible-ie9">Address</label>
			<input className="form-control placeholder-no-fix" type="text" placeholder="Address" name="address"/>
		</div>
		<div className="form-group">
			<label className="control-label visible-ie8 visible-ie9">City/Town</label>
			<input className="form-control placeholder-no-fix" type="text" placeholder="City/Town" name="city"/>
		</div>
		<div className="form-group">
			<label className="control-label visible-ie8 visible-ie9">Country</label>
			<select name="country" className="form-control">
				<option value="">Country</option>
				<option value="AF">Afghanistan</option>
				<option value="ZW">Zimbabwe</option>
			</select>
		</div>
		<p className="hint">
			 Enter your account details below:
		</p>
		<div className="form-group">
			<label className="control-label visible-ie8 visible-ie9">Username</label>
			<input className="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="Username" name="username"/>
		</div>
		<div className="form-group">
			<label className="control-label visible-ie8 visible-ie9">Password</label>
			<input className="form-control placeholder-no-fix" type="password" autocomplete="off" id="register_password" placeholder="Password" name="password"/>
		</div>
		<div className="form-group">
			<label className="control-label visible-ie8 visible-ie9">Re-type Your Password</label>
			<input className="form-control placeholder-no-fix" type="password" autocomplete="off" placeholder="Re-type Your Password" name="rpassword"/>
		</div>
		<div className="form-group margin-top-20 margin-bottom-20">
			<div id="register_tnc_error">
			</div>
		</div>
		<div className="form-actions">
			<button type="button" id="register-back-btn" className="btn btn-default">Back</button>
			<button type="submit" id="register-submit-btn" className="btn btn-success uppercase pull-right">Submit</button>
		</div>
	</form>
</div>
<div className="copyright">
	 2014 © Metronic. Admin Dashboard Template.
</div>
</div>
		);
	}
}
