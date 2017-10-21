'use strict';
import React from 'react';
import Loading from'../Loading';
import convertNumber from '../convert-number';

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
													<a href={'/san-pham/'+data._id} className="link-product-add-cart">Quick View</a>
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
															<form action="#" method="post">
																<fieldset>
																	<input type="hidden" name="cmd" value="_cart"/>
																	<input type="hidden" name="add" value="1"/>
																	<input type="hidden" name="business" value=" "/>
																	<input type="hidden" name="item_name" value={data._id}/>
																	<input type="hidden" name="amount" value="30.99"/>
																	<input type="hidden" name="discount_amount" value="1.00"/>
																	<input type="hidden" name="currency_code" value="USD"/>
																	<input type="hidden" name="return" value=" "/>
																	<input type="hidden" name="cancel_return" value=" "/>
																	<input type="button" name="submit" value="Add to cart" className="button"/>
																</fieldset>
															</form>
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
    this.state={cateId: props.cateId,newArrival:[]}
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

  render(){
    const data = this.props.data;
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
    					<p><span className="item_price">{data.webprice} VND</span> <del>{data.webprice < data.price ? data.price + ' VND': ''}</del></p>
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
    															<form action="#" method="post">
    																<fieldset>
    																	<input type="hidden" name="cmd" value="_cart"/>
    																	<input type="hidden" name="add" value="1"/>
    																	<input type="hidden" name="business" value=" "/>
    																	<input type="hidden" name="item_name" value="Wing Sneakers"/>
    																	<input type="hidden" name="amount" value="650.00"/>
    																	<input type="hidden" name="discount_amount" value="1.00"/>
    																	<input type="hidden" name="currency_code" value="USD"/>
    																	<input type="hidden" name="return" value=" "/>
    																	<input type="hidden" name="cancel_return" value=" "/>
    																	<input type="button" name="submit" value="Add to cart" className="button"/>
    																</fieldset>
    															</form>
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
                                                                    <div className="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count" data-size="small" data-mobile-iframe="true"><a className="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">Chia sẻ</a></div>
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
    	        </div>
     </div>
    );
  }
}
