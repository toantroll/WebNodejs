'use strict';

import $ from 'jquery';
import React from 'react';
import IndexHeader from '../index/index_header';
import Loading from'../Loading';
import SingleBanner from '../single/single_banner';
import CategoryMain from './category_main';


export default class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cateId:props.params.id, data: undefined};
  }

  componentDidMount(){
    var sefl = this;
    const id = this.state.cateId;
    if(id){
      $.ajax({
     url: '/get/category/'+id,
     type: "GET",
     dataType: 'json',
     cache: false
     }).done(function(data) {
       sefl.setState({data:data});
       document.title = data.name;
     }).fail(function(err){

     });
    }
  }

  render(){
    const data = this.state.data;
    const id = this.state.cateId;
    if(!data){
      return(<Loading/>);
    } else {
      return(
        <div>
          <IndexHeader/>
          <SingleBanner data={data}/>
          <CategoryMain id={id}/>
        </div>
      );
    }
  }
}
