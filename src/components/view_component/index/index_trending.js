'use strict';
import $ from 'jquery';
import React from 'react';
import Loading from'../Loading';

export default class IndexTrending extends React.Component{
  constructor(props){
    super(props);
    this.state = {trending:[] , lastItem:[]};
  }

  componentDidMount(){
    var sefl = this;
    $.ajax({
   url: '/get/trending',
   type: "GET",
   dataType: 'json',
   cache: false
   }).done(function(data) {
     sefl.setState({trending: data.trending, lastItem:data.lastItem});
   }).fail(function(err){

   });
  }

  render(){
    if(this.state.trending.length === 0){
      return(
        <Loading/>
      );
    } else {
      const trending = this.state.trending;
      const lastItem = this.state.lastItem;
    return(
      <div className="banner-bootom-w3-agileits">
      <div className="container">
      <h3 className="wthree_text_info">What''s <span>Trending</span></h3>

        <div className="col-md-5 bb-grids bb-left-agileits-w3layouts">
          <a href={trending[0].url}>
             <div className="bb-left-agileits-w3layouts-inner grid">
              <figure className="effect-roxy">
                  <img src={trending[0].img} alt=" " className="img-responsive"/>
                  <figcaption>
                    <h3><span>S</span>ale </h3>
                    <p>Up to {trending[0].sale}%</p>
                  </figcaption>
                </figure>
              </div>
          </a>
        </div>
        <div className="col-md-7 bb-grids bb-middle-agileits-w3layouts">
               <div className="bb-middle-agileits-w3layouts grid">
                     <figure className="effect-roxy">
                  <img src={trending[1].img} alt=" " className="img-responsive"/>
                  <figcaption>
                    <h3><span>S</span>ale </h3>
                    <p>Up to {trending[1].sale}%</p>
                  </figcaption>
                </figure>
                </div>
              <div className="bb-middle-agileits-w3layouts forth grid">
                <figure className="effect-roxy">
                  <img src={trending[2].img} alt=" " className="img-responsive"/>
                  <figcaption>
                    <h3><span>S</span>ale </h3>
                    <p>Up to {trending[2].sale}%</p>
                  </figcaption>
                </figure>
              </div>
        <div className="clearfix"></div>
      </div>
        </div>

        </div>
    );
  }
}
}
