'use strict';
import $ from 'jquery';
import React from 'react';
import Loading from'../Loading';
import BannerService from '../../../service/view/banner_service';

function CreateSlideNode(props){
  return( <li data-target="#myCarousel" data-slide-to={props.id} className={props.id == 1? 'active' : ''}></li>);
}

function CreateSlideItem(props){
  return(

      <div className={props.cl}>
        <div className="container">
          <div className="carousel-caption">
            <h3>{props.title}</h3>
            <p>{props.content}</p>
            <a className="hvr-outline-out button2" href={props.url}>Shop Now </a>
          </div>
        </div>
    </div>
  );
}

function CreateBanner(props){
  if(props.data.length === 0){
    return(<Loading/>)
  } else {
  const bannerData = props.data;
  var slideItemArray = [];
  var sildeNodeArray = [];
  const className = 'item item1 active';
  sildeNodeArray.push(<CreateSlideNode id={1}/>);
  slideItemArray.push(<CreateSlideItem cl={className} title={bannerData[0].title} content={bannerData[0].content} url={bannerData[0].url}/>);
  for(var i = 1; i < bannerData.length; i++){
    const className = 'item item'+(i+1);
    sildeNodeArray.push(<CreateSlideNode id={i+1}/>);
    slideItemArray.push(<CreateSlideItem cl={className} title={bannerData[i].title} content={bannerData[i].content} url={bannerData[i].url}/>);
  }

  return(
    <div id="myCarousel" className="carousel slide" data-ride="carousel">
     <ol className="carousel-indicators">
       {sildeNodeArray}
     </ol>
     <div className="carousel-inner" role="listbox">
     {slideItemArray}
     </div>
     <a className="left carousel-control" href="https://p.w3layouts.com/demos_new/template_demo/20-06-2017/elite_shoppy-demo_Free/143933984/web/index.html#myCarousel" role="button" data-slide="prev">
       <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
       <span className="sr-only">Previous</span>
     </a>
     <a className="right carousel-control" href="https://p.w3layouts.com/demos_new/template_demo/20-06-2017/elite_shoppy-demo_Free/143933984/web/index.html#myCarousel" role="button" data-slide="next">
       <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
       <span className="sr-only">Next</span>
     </a>
     </div>
  );
}
}

export default class IndexBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data:[]};
  }

componentDidMount(){
  var sefl = this;
  $.ajax({
 url: '/get/banner',
 type: "GET",
 dataType: 'json',
 cache: false
 }).done(function(data) {
   sefl.setState({data: data});
 }).fail(function(err){

 });
}
  render(){
    return(
<div>
<CreateBanner data={this.state.data}/>
 <div className="banner_bottom_agile_info">
   <div className="container">
         <div className="banner_bottom_agile_info_inner_w3ls">
              <div className="col-md-6 wthree_banner_bottom_grid_three_left1 grid">
         <figure className="effect-roxy">
           <img src="./view/bottom1.jpg" alt=" " className="img-responsive"/>
           <figcaption>
             <h3><span>F</span>all Ahead</h3>
             <p>New Arrivals</p>
           </figcaption>
         </figure>
       </div>
        <div className="col-md-6 wthree_banner_bottom_grid_three_left1 grid">
         <figure className="effect-roxy">
           <img src="./view/bottom2.jpg" alt=" " className="img-responsive"/>
           <figcaption>
             <h3><span>F</span>all Ahead</h3>
             <p>New Arrivals</p>
           </figcaption>
         </figure>
       </div>
       <div className="clearfix"></div>
     </div>
  </div>
 </div>
</div>
    );
  }
}
