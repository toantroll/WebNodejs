'use strict';

import $ from 'jquery';
import React from 'react';
import Loading from'../Loading';


  function RenderSubMenu(props){
    var parentArray = {};
      const parent = props.data;
      if(parent){
        const i = props.index;
        if(parent.sub_cate.length === 0){
          parentArray = <li><a href={'/danh-muc'+parent.url+"/"+parent._id}>{parent.name}</a></li>;
        } else {

          parentArray = <li><input type="checkbox" id={'item-'+i}/><label for={'item-'+i}><i className="fa fa-long-arrow-right" aria-hidden="true"></i>{parent.name}</label><RenderChildMenu data={parent.sub_cate}/></li>;
      }
      return(
        {parentArray}
      );
    } else {
      return(<Loading/>);
    }

  }


    function RenderChildMenu(props){
      const subCate = props.data;
      var childArray = [];
      for(var i = 0; i < subCate.length; i++){
        childArray.push(<li><a href={'/danh-muc'+subCate[i].url+"/"+subCate[i]._id}>{subCate[i].name}</a></li>);
      }
      return(
        <ul>
          {childArray}
        </ul>
      );
    }

  function RenderMenu(props){
    const data = props.data;
    var subMenu = [];
    for(var i = 0; i < data.length; i++){
      var parentArray = {};
        const parent = props.data[i];
          if(parent.sub_cate.length === 0){
            parentArray = <li><a href={'/danh-muc'+parent.url+"/"+parent._id}>{parent.name}</a></li>;
          } else {

            parentArray = <li><input type="checkbox" id={'item-'+i}/><label htmlFor={'item-'+i}><i className="fa fa-long-arrow-right" aria-hidden="true"></i>{parent.name}</label><RenderChildMenu data={parent.sub_cate}/></li>;
        }
        subMenu.push(parentArray);
    }

    return(
<ul className="tree-list-pad">
  {subMenu}
</ul>

    );
  }

export default class ClassName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data:[]}
  }

  componentDidUpdate(){
    const slider = document.createElement("script");
        slider.src = "/client/js/slider_bar.js";
        //script.async = true;
    document.body.appendChild(slider);
    }

    componentDidMount(){
      var sefl = this;
        $.ajax({
       url: '/get/allcategory/',
       type: "GET",
       dataType: 'json',
       cache: false
       }).done(function(data) {
         sefl.setState({data:data});
       }).fail(function(err){

       });
    }

  render(){
    const data = this.state.data;
    if(data.length === 0){
      return(<Loading/>)
    } else {
      return(
        <div className="col-md-4 products-left">
			<div className="filter-price">
				<h3>Filter By <span>Price</span></h3>
					<ul className="dropdown-menu6">
						<li>
							<div id="slider-range" className="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all">
              <a className="ui-slider-handle ui-state-default ui-corner-all" href="#" style={{left: '11.1111%'}}></a>
              <a className="ui-slider-handle ui-state-default ui-corner-all" href="#" style={{left: '77.7778%'}}></a>
              </div>
							<input type="text" id="amount" style={{border: '0', color: '#ffffff', 'font-weight': 'normal'}}/>
						</li>
					</ul>
			</div>
			<div className="css-treeview">
				<h4>Categories</h4>
				<RenderMenu data={data}/>
			</div>
			<div className="clearfix"></div>
		</div>
      );
      }
  }
}
