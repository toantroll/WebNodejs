'use strict';
import $ from 'jquery';
import React from 'react';
import Loading from'../Loading';
import ReactDOM from 'react-dom';
import convertNumber from '../convert-number';

function RenderImg(props){
  return(<img src={props.url} alt="" className={'pro-image-'+props.position}/>);
}

function RenderProductListItem(props){
  var data = props.data;
  var listProducts = [];
  for(var i = 0; i < data.length; i++){
    listProducts.push(<RenderProductItem data={data[i]}/>);
  }
  return(<div>{listProducts}</div>);
}
function RenderHeaderTab(props){
  return(  <h2 className={props.classH2} role="tab" aria-controls={props.aria}><span className="resp-arrow"></span>{props.cateName}</h2>);
}
function RenderTab(props){
  const data = [] = props.data;
  if(data.length === 0){
    return(<Loading/>);
  } else {
    const aria = props.aria;
    return(
      /*/tab_one*/
        <div className={props.classDivTab} style={props.styles} aria-labelledby={aria}>
          <RenderProductListItem data={data}/>
        </div>
      /*//tab_one*/
    );
  }
}

function RenderLi(props){
      return(<li className={props.classNameLi} aria-controls={props.aria} role="tab">{props.cateName}</li>);
  }

function RenderUlTab(props){
  var data = props.data;
  if(data.length === 0){
    return(<Loading/>);
  } else {
  var i = 0;
  var classNameLi = 'resp-tab-item resp-tab-active';
  var aria = 'tab_item-0 ';
  var liArray = [];
  for(i; i <data.length; i++){
    liArray.push(<RenderLi classNameLi={classNameLi} aria={aria} cateName={data[i].cateName}/>);
    classNameLi = "resp-tab-item";
    aria = "tab_item-"+(i+1);
  }
  //return(<ul className="resp-tabs-list">{liArray}</ul>);
  return(
    <ul className="resp-tabs-list">
							<li className="resp-tab-item" aria-controls="tab_item-0" role="tab"> Men's</li>
							<li className="resp-tab-item" aria-controls="tab_item-1" role="tab"> Women's</li>
							<li className="resp-tab-item resp-tab-active" aria-controls="tab_item-2" role="tab"> Bags</li>
							<li className="resp-tab-item" aria-controls="tab_item-3" role="tab"> Footwear</li>
						</ul>
  );
  }
}

function RenderProductItem(props){
  var data = props.data;
  let listImg = [];
  for(var i = 0; i < 2; i++){
    listImg.push(<RenderImg url={data.img[i]} position={i===0?'front':'back'}/>);
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
																	<input type="button" name="submit" value="Add to cart" className="button minicart-showing"/>
																</fieldset>
															</form>
														</div>
									</div>
								</div>
							</div>

  );
}


export default class IndexNewArrival extends React.Component{
  constructor(props){
    super(props);
    this.state = {data:[]};
  }

  componentDidUpdate(){
    console.log('updated');
    const script = document.createElement("script");

        script.src = "/client/js/custom.js";
        //script.async = true;

        document.body.appendChild(script);
        console.log('Header Updated');
        const cart = document.createElement("script");
            cart.src = "/client/js/cart_active.js";
            //script.async = true;
            document.body.appendChild(cart);
  }

  componentDidMount(){
    var sefl = this;
    $.ajax({
   url: '/get/newarrival',
   type: "GET",
   dataType: 'json',
   cache: false
   }).done(function(data) {
     sefl.setState({data:data});
   }).fail(function(err){

   });
  }

  render(){
    if(this.state.data.length === 0){
      return(<Loading/>);
    } else {
      const data = this.state.data;
      var i = 0;
       var classNameLi = 'resp-tab-item resp-tab-active';
       var aria = 'tab_item-'+i;
       var classDivTab = "tab"+(i+1)+ " resp-tab-content resp-tab-content-active";
       var classH2 = "resp-accordion resp-tab-active";
       var style = {"display":"block"}
      var liArray = [];
      var tabArray=[];
      for(i; i <data.length; i++){
        var cateName = data[i].cateName;
        liArray.push(<RenderLi classNameLi={classNameLi} aria={aria} cateName={cateName}/>);
        tabArray.push(<RenderHeaderTab aria={aria}  cateName={cateName} classH2={classH2}/>)
        tabArray.push(<RenderTab data={data[i].data} aria={aria} classDivTab={classDivTab} styles={i===0?style:{}} />);
        classNameLi = "resp-tab-item ";
        aria = "tab_item-"+(i+1);
        classDivTab = "tab"+(i+2)+" resp-tab-content";
        classH2 = "resp-accordion ";
      }
      //
    return(
      <div>
      	<div className="new_arrivals_agile_w3ls_info">
      		<div className="container">
      		    <h3 className="wthree_text_info">New <span>Arrivals</span></h3>
      				<div id="horizontalTab" style={{display: 'block', width: '100%', margin: '0px'}}>
              <ul className="resp-tabs-list">{liArray}</ul>
      					<div className="resp-tabs-container">
                  {tabArray}
                </div>
      			</div>
      		</div>
          </div>
        </div>

    );
  }

}
}
