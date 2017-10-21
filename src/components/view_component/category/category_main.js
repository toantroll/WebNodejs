'use strict';

import $ from 'jquery';
import React from 'react';
import Loading from'../Loading';
import CategoryMainLeft from './category_main_left';
import CategoryMainRight from './category_main_right';

export default class CategoryMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {id:props.id};
  }

  render(){
    return(
      <div>
        <CategoryMainLeft/>
        <CategoryMainRight id={this.state.id}/>
      </div>
    );
  }
}
