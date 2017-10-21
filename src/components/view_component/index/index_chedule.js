'use strict';
import $ from 'jquery';
import React from 'react';
import Loading from'../Loading';

export default class IndexSchedule extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    var sefl = this;
    $.ajax({
   url: '/get/schedule',
   type: "GET",
   dataType: 'json',
   cache: false
   }).done(function(data) {
     sefl.setState({data: data});
   }).fail(function(err){

   });
  }

  render(){
    return(
      <div>
      	<div className="schedule-bottom">
      		<div className="col-md-6 agileinfo_schedule_bottom_left">
      			<img src="/view/mid.jpg" alt=" " className="img-responsive"/>
      		</div>
      		<div className="col-md-6 agileits_schedule_bottom_right">
      			<div className="w3ls_schedule_bottom_right_grid">
      				<h3>Save up to <span>50%</span> in this week</h3>
      				<p>Suspendisse varius turpis efficitur erat laoreet dapibus.
      					Mauris sollicitudin scelerisque commodo.Nunc dapibus mauris sed metus finibus posuere.</p>
      				<div className="col-md-4 w3l_schedule_bottom_right_grid1">
      					<i className="fa fa-user-o" aria-hidden="true"></i>
      					<h4>Customers</h4>
      					<h5 className="counter">653</h5>
      				</div>
      				<div className="col-md-4 w3l_schedule_bottom_right_grid1">
      					<i className="fa fa-calendar-o" aria-hidden="true"></i>
      					<h4>Events</h4>
      					<h5 className="counter">823</h5>
      				</div>
      				<div className="col-md-4 w3l_schedule_bottom_right_grid1">
      					<i className="fa fa-shield" aria-hidden="true"></i>
      					<h4>Awards</h4>
      					<h5 className="counter">45</h5>
      				</div>
      				<div className="clearfix"> </div>
      			</div>
      		</div>
      		<div className="clearfix"> </div>
      	</div>
      </div>
    );
  }
}
