'use strict';
import $ from 'jquery';
import React from 'react';

export default class ImportJs extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount(){
  //       console.log("contruoc");
  //       $("#libs").attr("src", "/client/js/custom.js");
  // }
  render(){
    return(<script id="libss"></script>);
  }
}
