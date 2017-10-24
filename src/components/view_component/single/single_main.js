'use strict';
import React from 'react';
import Loading from'../Loading';
import convertNumber from '../convert-number';
import Common from '../../common';

function RenderLi(props){
    return(<li>{props.name}</li>);
}

function RenderTab(props){
    return(
        <div>
            <div className="single_page_agile_its_w3ls">
            {props.data}
            </div>
        </div>
    );
}

function RenderProductItem(props){
  var data = props.data;
  let listImg = [];
  for(var i = 0; i < 2; i++){
    listImg.push(<RenderImg url={data.img[0]} position={i===0?'front':'back'}/>);
  }

  return(
							<div className="col-md-3 product-men">
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
													<input type="button" name="submit" value="Add to cart" className="button"/>
														</div>
									</div>
								</div>
							</div>

  );
}

function RenderImg(props){
  return(<img src={props.url} alt="" className={'pro-image-'+props.position}/>);
}

function RenderFlexSilder(props){
  var liArray = [];
    for(var i = 0; i < props.data.length; i++){
      liArray.push(<li data-thumb={props.data[i]}><div className="thumb-image"> <img src={props.data[i]} data-imagezoom="true" className="img-responsive" draggable="false"/> </div></li>);
    }
    return(
      <ul className="slides">
        {liArray}
    </ul>
    );
}

function RenderArrivals(props){
  const data = props.data;
  if(data.length === 0){
    return(<Loading/>);
  } else {
    var listProducts = [];
    for(var i = 0; i < data.length; i++){
      listProducts.push(<RenderProductItem data={data[i]}/>);
    }
  return(
	<div className="w3_agile_latest_arrivals">
    {listProducts}
  </div>
  );
  }
}

export default class SingleBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state={cateId: props.cateId,newArrival:[],  isSubmit: false,
      currentItem:{id:'',name:'', webPrice: 0, cusName:'', cusTel:'', cusAdd:'', cusSize: ''},
      errorForm:{cusName:'', cusTel:'', cusAdd:'', cusSize:''}};
      this.checkOutHandle = this.checkOutHandle.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.validateCheckOut = this.validateCheckOut.bind(this);
      this.submitCheckOut = this.submitCheckOut.bind(this);
  }

componentDidUpdate(){
  const slider = document.createElement("script");
      slider.src = "/client/js/slider.js";
      //script.async = true;
      document.body.appendChild(slider);
  const tabs = document.createElement("script");
      tabs.src = "/client/js/custom.js";
      //script.async = true;
      document.body.appendChild(tabs);
  const fb = document.createElement("script");
          fb.src = "/client/js/fb.js";
          //script.async = true;
          document.body.appendChild(fb);
}

  componentDidMount(){
            var sefl = this;
            const id = this.state.cateId;
            if(id){
              $.ajax({
             url: '/get/newarrivalcate/'+id,
             type: "GET",
             dataType: 'json',
             cache: false
             }).done(function(data) {
               sefl.setState({newArrival:data});
             }).fail(function(err){

             });
            }
  }

  checkOutHandle(e){
    var data = this.state.currentItem;
    data.id = e.target.getAttribute('data-id');;
    data.name = e.target.getAttribute('data-name');
    data.webPrice = e.target.getAttribute('data-web-price');
    this.setState({
      currentItem:data
    });
  }

  handleChange(e){
    const fieldName = e.target.name;
    const value = e.target.value;
    this.validateCheckOut(fieldName, value);
  }

    validateCheckOut(fieldName, value){
      const data = this.state.currentItem;
      var errorForm = this.state.errorForm;;
      const common = new Common();
      var isSubmit = true;
      data[fieldName]=value;
      if(common.isEmpty(data[fieldName])){
        errorForm[fieldName] = "Hãy Nhập trường này";
         isSubmit = false;
      }else if(fieldName == 'cusTel' && !common.isNumber(data[fieldName])){
          errorForm[fieldName] = "Trường này cần nhập số";
          isSubmit = false;
      }else if(fieldName == 'cusSize' && !common.isNumber(data[fieldName])){
          errorForm[fieldName] = "Trường này cần nhập số";
          isSubmit = false;
      } else {
        errorForm[fieldName] = "";
      }
    this.setState({currentItem:data, errorForm: errorForm, isSubmit:isSubmit});
    return isSubmit;
  }

  submitCheckOut(e){
    e.preventDefault();
    const isSubmit =  this.validateCheckOut(e.target.cusSize.name, e.target.cusSize.value)&&
    this.validateCheckOut(e.target.cusName.name, e.target.cusName.value)&&
    this.validateCheckOut(e.target.cusTel.name, e.target.cusTel.value)&&
    this.validateCheckOut(e.target.cusAdd.name, e.target.cusAdd.value)
    if(isSubmit){
      this.setState({isSubmit:false});
      var data = {};
      data['id'] = e.target.id.value;
      data['cusSize'] = e.target.cusSize.value;
      data['cusName'] = e.target.cusName.value;
      data['cusTel'] = e.target.cusTel.value;
      data['cusAdd'] = e.target.cusAdd.value;
      $.ajax({
  			 url: '/get/checkout',
  				type: "POST",
         dataType:'json',
  			 data: data,
  			 cache: false,
  			 success: function(data) {
  				if(data =='OK'){
            alert('Đặt hàng thành công');
            $('#checkout').modal('hide');
            this.setState({isSubmit:true});
          } else {
            alert('Đặt hàng thất bại');
          }
  			 }.bind(this),
  			 error: function(xhr, status, err) {
  				alert('Đặt hàng thất bại');
  			 }.bind(this)
  		 });
    }
  }

  render(){
    const data = this.props.data;
    const currentItem = this.state.currentItem;
    const errorForm = this.state.errorForm;
    const isSubmit = this.state.isSubmit;
    const comment = (<div className="fb-comments" data-href={$(location).attr('href')} data-numposts="5" data-width="100%"></div>);
    return(
      /*<-- banner-bootom-w3-agileits -->*/
    <div className="banner-bootom-w3-agileits">
    	<div className="container">
    	     <div className="col-md-4 single-right-left ">
    			<div className="grid images_3_of_2">
    				<div className="flexslider">
                    <RenderFlexSilder data={data.img}/>
                </div>
    			</div>
    		</div>
    		<div className="col-md-8 single-right-left simpleCart_shelfItem">
    					<h3>{data.name}</h3>
    					<p><span className="item_price">{convertNumber(data.webprice)} VND</span> <del>{data.webprice < data.price ? convertNumber(data.price) + ' VND': ''}</del></p>
    					<div className="rating1">
    						<span className="starRating">
    							<input id="rating5" type="radio" name="rating" value="5"/>
    							<label for="rating5">5</label>
    							<input id="rating4" type="radio" name="rating" value="4"/>
    							<label for="rating4">4</label>
    							<input id="rating3" type="radio" name="rating" value="3" checked=""/>
    							<label for="rating3">3</label>
    							<input id="rating2" type="radio" name="rating" value="2"/>
    							<label for="rating2">2</label>
    							<input id="rating1" type="radio" name="rating" value="1"/>
    							<label for="rating1">1</label>
    						</span>
    					</div>
    					<div className="occasion-cart">
    						<div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out button2">
    										<input onClick={this.checkOutHandle} data-toggle="modal" data-target="#checkout" data-name={data.name} data-web-price={data.webprice} data-id={data._id} type="button" name="submit" value="Đặt hàng" className="button"/>
    														</div>

    					</div>
    					<ul className="social-nav model-3d-0 footer-social w3_agile_social single_page_w3ls">
    						                                   <li className="share">Share On : </li>
    															<li>
                                                                    <a href="#" className="facebook">
    																  <div className="front"><i className="fa fa-facebook" aria-hidden="true"></i></div>
    																  <div className="back"><i className="fa fa-facebook" aria-hidden="true"></i></div>
                                                                    </a></li>
    															<li><a href="#" className="twitter">
    																  <div className="front"><i className="fa fa-twitter" aria-hidden="true"></i></div>
    																  <div className="back"><i className="fa fa-twitter" aria-hidden="true"></i></div></a></li>
    															<li><a href="#" className="instagram">
    																  <div className="front"><i className="fa fa-instagram" aria-hidden="true"></i></div>
    																  <div className="back"><i className="fa fa-instagram" aria-hidden="true"></i></div></a></li>
    															<li><a href="#" className="pinterest">
    																  <div className="front"><i className="fa fa-linkedin" aria-hidden="true"></i></div>
    																  <div className="back"><i className="fa fa-linkedin" aria-hidden="true"></i></div></a></li>
                                                                <li>
                                                                    <div className="fb-share-button" data-href={$(location).attr('href')} data-layout="button_count" data-size="small" data-mobile-iframe="true"><a className="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">Chia sẻ</a></div>
                                                                </li>
    														</ul>

    		      </div>
    	 			<div className="clearfix"> </div>

    	<div className="responsive_tabs_agileits">
    				<div id="horizontalTab" style={{display: 'block', width: '100%', margin: '0px'}}>
    						<ul className="resp-tabs-list">
                                <RenderLi name="Bình luận"/>

    						</ul>
    					<div className="resp-tabs-container">
    						<RenderTab data={comment}/>

    					</div>
    				</div>
    			</div>
          <RenderArrivals  data={this.state.newArrival}/>
          <div id="checkout" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title text-center">Đặt hàng</h4>
                </div>
                <div className="modal-body">
                {
                  currentItem.id =='' ? <Loading/>:
                  <form id="checkout" action="/api/checkout" enctype="multipart/form-data" method="post" onSubmit={this.submitCheckOut}>
                  <input type="hidden" name="id" value={currentItem.id}/>
                  <p className="text-center"><span>{currentItem.name}</span></p>
                  <p className="text-center">Giá: <b>{convertNumber(currentItem.webPrice)+' VND'}</b></p>
                  <div className="form-group">
                    <label>Size</label>
                    <p className="text-danger">{errorForm.cusSize}</p>
                    <input type="text"className="form-control" name="cusSize" value={currentItem.cusSize} onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                    <label>Tên</label>
                    <p className="text-danger">{errorForm.cusName}</p>
                    <input type="text"className="form-control" name="cusName" value={currentItem.cusName} onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                    <label>Số điện thoại</label>
                    <p className="text-danger">{errorForm.cusTel}</p>
                    <input type="text"className="form-control" name="cusTel" value={currentItem.cusTel} onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                    <label>Địa chỉ</label>
                    <p className="text-danger">{errorForm.cusAdd}</p>
                    <input type="text"className="form-control" name="cusAdd" value={currentItem.cusAdd} onChange={this.handleChange} />
                  </div>
                  <div className="text-center">
                    { isSubmit ? <input type="submit" className="btn btn-primary" value="Đặt hàng" /> : <input type="submit" className="btn btn-primary" value="Đặt hàng" disabled />}
                  </div>
                  </form>
                }
                </div>
              </div>
            </div>
          </div>
    	        </div>
     </div>
    );
  }
}
