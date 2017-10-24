'use strict';

import $ from 'jquery';
import React from 'react';
import Loading from'../Loading';
import Pagination from './Pagination';
import convertNumber from '../convert-number';

function RenderProductItem(props){
  var data = props.data;
  let listImg = [];
  for(var i = 0; i < 2; i++){
    listImg.push(<RenderImg url={data.img[i]} position={i===0?'front':'back'}/>);
  }

  return(
							<div className="col-md-4 product-men">
								<div className="men-pro-item simpleCart_shelfItem">
									<div className="men-thumb-item">
										{listImg}
											<div className="men-cart-pro">
												<div className="inner-men-cart-pro">
													<a href={'/san-pham/'+data._id} className="link-product-add-cart">Xem</a>
												</div>
											</div>
											<span className="product-new-top">New</span>

									</div>
									<div className="item-info-product ">
										<h4><a href={'san-pham/'+data._id}>{data.name}</a></h4>
										<div className="info-product-price">
											<span className="item_price">{convertNumber(data.webprice)} VND</span>
											<del>{data.webprice < data.price ? convertNumber(data.price)+'VND':''} </del>
										</div>
										<div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out button2">
													<input type="button" onClick={(e) => {window.location.href = '/san-pham/'+data._id}} value="Xem" className="button"/>
														</div>
									</div>
								</div>
							</div>

  );
}

function RenderImg(props){
  return(<img src={props.url} alt="" className={'pro-image-'+props.position}/>);
}

export default class CategoryMainRight extends React.Component{

  constructor(props){
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.state = {
      id: this.props.id,
     activePage: 1,
     data:[],
     total:-1
   };
  }
  handlePageChange(pageNumber) {
    this.setState({total:-1});
     this.getProduct(pageNumber);
 }

 componentDidMount(){
    this.getProduct(1);
 }

 getProduct(page){
   const offset = (page-1);
   const self = this;
   $.ajax({
  url: '/get/productpage/'+  this.state.id+'/'+offset,
  type: "GET",
  dataType: 'json',
  cache: false
  }).done(function(data) {
    self.setState({activePage:page,data:data.data,total:data.total});
  }).fail(function(err){

  });
 }


  render(){
    if(this.state.total === -1){
        return(<Loading/>);
    } else {
      const data = this.state.data;
      var listProducts = []
      for(var i = 0; i < data.length; i++){
        listProducts.push(<RenderProductItem data={data[i]}/>)
      }
      return(<div className="col-md-8 products-right">
      {listProducts}
      <div className="clearfix"></div>
      <Pagination
             activePage={this.state.activePage}
             itemsCountPerPage={10}
             totalItemsCount={this.state.total}
             pageRangeDisplayed={5}
             onChange={this.handlePageChange}
           />
      </div>);
    }

  }

}
