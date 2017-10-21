'use strict';
import React from 'react';
export default class Loading extends React.Component{
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <div className="spinner">
	  <div className="rect1"></div>
	  <div className="rect2"></div>
	  <div className="rect3"></div>
	  <div className="rect4"></div>
	  <div className="rect5"></div>
		</div>
    )
  }
}
