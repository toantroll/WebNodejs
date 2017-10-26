'use strict';
import $ from 'jquery';
import React from 'react';
import Loading from'../Loading';

export default class IndexSchedule extends React.Component {
  constructor(props){
    super(props);
    this.state= {data:undefined, sale:-1};
  }
  componentDidMount(){
    var sefl = this;
    $.ajax({
   url: '/get/getschedule',
   type: "GET",
   dataType: 'json',
   cache: false
   }).done(function(data) {
     sefl.setState({data: data, sale:parseInt(((data.price-data.webPrice)/data.price)*100)});
   }).fail(function(err){

   });
  }

  render(){
    // <div className="col-md-4 w3l_schedule_bottom_right_grid1">
    //   <i className="fa fa-user-o" aria-hidden="true"></i>
    //   <h4>Customers</h4>
    //   <h5 className="counter">653</h5>
    // </div>
    // <div className="col-md-4 w3l_schedule_bottom_right_grid1">
    //   <i className="fa fa-calendar-o" aria-hidden="true"></i>
    //   <h4>Events</h4>
    //   <h5 className="counter">823</h5>
    // </div>
    // <div className="col-md-4 w3l_schedule_bottom_right_grid1">
    //   <i className="fa fa-shield" aria-hidden="true"></i>
    //   <h4>Awards</h4>
    //   <h5 className="counter">45</h5>
    const data = this.state.data;
    if(this.state.sale == -1){
      return(<div></div>);
    } else {
    return(
      <div>
      	<div className="schedule-bottom">
      		<div className="col-md-6 agileinfo_schedule_bottom_left">
      			<a href={'/san-pham/'+data.pid}><img style={{'max-height':'400px'}} src={data.image} alt=" " className="img-responsive"/></a>
      		</div>
      		<div className="col-md-6 agileits_schedule_bottom_right">
      			<div className="w3ls_schedule_bottom_right_grid">
      				<h3>Giảm giá <span>{this.state.sale}%</span></h3>
      				<p>{data.description}</p>
      			</div>
      			<div className="clearfix"> </div>
      			</div>
      		<div className="clearfix"> </div>
      	</div>
      </div>
    );
  }
  }
}
