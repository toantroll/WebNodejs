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
    listProducts.push(<RenderProductItem onClick={props.onClick} data={data[i]}/>);
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
          <RenderProductListItem onClick={props.onClick} data={data}/>
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
  var classNameLi = 'resp-tab-item';
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
                        	<input type="button" onClick={(e) => {window.location.href = '/san-pham/'+data._id}} value="Xem" className="button"/>
														</div>
									</div>
								</div>
							</div>

  );
}


export default class IndexNewArrival extends React.Component{
  constructor(props){
    super(props);
    this.state = {data:[], isSubmit: false,
      currentItem:{id:'',name:'', webPrice: 0, cusName:'', cusTel:'', cusAdd:'', cusSize: ''},
      errorForm:{cusName:'', cusTel:'', cusAdd:'', cusSize:''}};
    this.checkOutHandle = this.checkOutHandle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(){
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

  checkOutHandle(e){
    var data = this.state.currentItem;
    data.id = e.target.getAttribute('data-cate-id');;
    data.name = e.target.getAttribute('data-name');
    data.webPrice = e.target.getAttribute('data-web-price');
    this.setState({
      currentItem:data
    });
  }

  handleChange(e){
    const fieldName = e.target.name;
    const data = this.state.currentItem;
    var errorForm = {id:'',name:'', webPrice: 0, cusName:'', cusTel:'', cusAdd:'', cusSize: ''};
    const common = new Common();
    var isSubmit = true;
    data[fieldName]= e.target.value
    if(common.isEmpty(data[fieldName])){
      errorForm[fieldName] = "Hãy Nhập trường này";
       isSubmit = false;
    }
    if(fieldName == 'cusTel' && !common.isNumber(data[fieldName])){
        errorForm[fieldName] = "Trường này cần nhập số";
        isSubmit = false;
    }
    if(fieldName == 'cusSize' && !common.isNumber(data[fieldName])){
        errorForm[fieldName] = "Trường này cần nhập số";
        isSubmit = false;
    }
    this.setState({currentItem:data, errorForm: errorForm, isSubmit:isSubmit});
  }

  submitCheckOut(e){
    e.preventDefault();
    const common = this.state.common;
    //cusName
    const cusName = e.target.cusName.value;
    if(this.state.isSubmit){
      alert("Dữ liệu OK");
    } else {
      alert("Nhập dữ liệu lỗi");
    }

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
      const currentItem = this.state.currentItem;
      const errorForm = this.state.errorForm;
      const isSubmit = this.state.isSubmit;
      var i = 0;
       var classNameLi = 'resp-tab-item';
       var aria = 'tab_item-'+i;
       var classDivTab = "tab"+(i+1)+ " resp-tab-content";
       var classH2 = "resp-accordion";
      var liArray = [];
      var tabArray=[];
      for(i; i <data.length; i++){
        var cateName = data[i].cateName;
        liArray.push(<RenderLi classNameLi={classNameLi} aria={aria} cateName={cateName}/>);
        tabArray.push(<RenderHeaderTab aria={aria}  cateName={cateName} classH2={classH2}/>)
        tabArray.push(<RenderTab onClick={this.checkOutHandle} data={data[i].data} aria={aria} classDivTab={classDivTab} />);
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
          <div id="checkout" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">Chỉnh Sửa</h4>
                </div>
                <div className="modal-body">
                {
                  currentItem.id =='' ? <Loading/>:
                  <form id="upload" action="/api/checkout" enctype="multipart/form-data" method="post" onSubmit={this.submitCheckOut}>
                  <input type="hidden" value={currentItem.id}/>
                  <p><span>{currentItem.name}</span>____<b>{currentItem.webPrice}</b></p>
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
                    { isSubmit ? <input type="submit" value="Đặt hàng" /> : <input type="submit" value="Đặt hàng" disabled />}
                  </form>
                }
                </div>
              </div>
            </div>
          </div>
        </div>

    );
  }

}
}
