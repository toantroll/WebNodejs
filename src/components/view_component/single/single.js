'use strict';

import $ from 'jquery';
import React from 'react';
import IndexHeader from '../index/index_header';
import SingleBanner from './single_banner';
import SingleMain from './single_main';
import IndexView from '../index/index';
import Loading from'../Loading';


export default class Single extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.params.id);
    this.state = {productId:props.params.id, data: undefined};
  }

  componentDidMount(){
    console.log('Did');
    var sefl = this;
    const id = this.state.productId;
    if(id){
      $.ajax({
     url: '/get/product/'+id,
     type: "GET",
     dataType: 'json',
     cache: false
     }).done(function(data) {
       sefl.setState({data:data});
       console.log(this.state);
     }).fail(function(err){

     });
    }
  }

  render(){
    const data = this.state.data;

    console.log('data');
    console.log(data);
    if(!data){
      return(<Loading/>);
    } else {
      return(
        <div>
          <IndexHeader/>
          <SingleBanner data={data.category}/>
          <SingleMain data={data.product} cateId={data.category._id}/>
        </div>
      );
    }
  }
}
