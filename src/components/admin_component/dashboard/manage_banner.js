'use strict';
import $ from 'jquery';
import React from 'react';
import Loading from '../Loading';

function RenderListBanner(props){
  if(props.banner.length===0){
    return(<loading/>);
  } else {
    var bannerArray = [];
    for(var i = 0; i < props.banner.length; i++){
      bannerArray.push(<a href="#" data-sort={i+1} data-id={props.banner[i]._id} data-url={props.banner[i].url} data-title={props.banner[i].title}
      data-content={props.banner[i].content} onClick={props.onClick}
      className="btn btn-info" role="button" data-toggle="modal" data-target="#crusdmodal">Banner {i+1}</a>);
    }
    return(
      <div>
        {bannerArray}
      </div>
    );
  }
}

function RenderBannerForm(props){
  return(
    <form id="upload" action="/api/upload" enctype="multipart/form-data" method="post" onSubmit={props.onSubmit}>
    <div className="form-group">
      <label>Tiêu đề</label>
      <input type="hidden" name="id" value={props.currentItem.id}/>
      <input type="hidden" name="sort" value={props.currentItem.sort}/>
      <input type="text"className="form-control" name="title" value={props.currentItem.title} onChange={props.onChange}/>
    </div>
    <div className="form-group">
      <label>Nội dung</label>
      <input type="text"className="form-control" name="content" value={props.currentItem.content} onChange={props.onChange}/>
    </div>
    <div className="form-group">
      <label>Link</label>
      <input type="text"className="form-control" name="url" value={props.currentItem.url} onChange={props.onChange}/>
    </div>
    <div className="form-group">
      <label>anh</label>
      <input type="file" multiple  name="img"/>
    </div>
      <input type="submit" value="Gửi" />
    </form>
  );
}

export default class ManageBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {banner:[],  currentItem :{id:'', title:'', content:'', url:'', sort:0}};
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getAllBanner = this.getAllBanner.bind(this);
    this.submitUpload = this.submitUpload.bind(this);
  }

  handleClick(e){
    const data = {id:'', title:'', content:'', url:'', sort:0}
    var errorForm ={cateName:'', img:''};
    data.id = e.target.getAttribute('data-id');
    data.title = e.target.getAttribute('data-title');
    data.content = e.target.getAttribute('data-content');
    data.url = e.target.getAttribute('data-url');
    data.sort = e.target.getAttribute('data-sort');
    this.setState({currentItem :data});
  }

  handleChange(e){
    const fieldName = e.target.name;
    const data = this.state.currentItem;
    data[fieldName]= e.target.value
    this.setState({currentItem :data});
  }

  submitUpload(e){
    e.preventDefault();
    var data = new FormData();
    data.append('id', e.target.id.value);
    data.append('url', e.target.url.value);
    data.append('title', e.target.title.value);
    data.append('content', e.target.content.value);
    data.append('sort', e.target.sort.value);
    const img =  e.target.img;
    if(img.files[0] != undefined){
      data.append('img', img.files[0]);
    }
      var sefl = this;
      $.ajax({
         url: '/api/updatebanner',
          type: "POST",
        //contentType: 'multipart/form-data; boundary="WebKitFormBoundaryUucA6DiAhQeYNgIm"',
        contentType:false,
         processData: false,
         //dataType:'json',
         data: data,
         cache: false,
         success: function(data) {
          alert('Thành công');
          sefl.getAllBanner();
         }.bind(this),
         error: function(xhr, status, err) {
          alert('thất bại');
         }.bind(this)
       });

}

  componentDidMount(){
    this.getAllBanner();
  }

  getAllBanner(){
      var sefl = this;
      $.ajax({
     url: '/get/banner',
     type: "GET",
     dataType: 'json',
     cache: false
     }).done(function(data) {
       sefl.setState({banner: data});
     }).fail(function(err){
        sefl.setState({banner: []});
     });
  }

  render(){
    const currentItem = this.state.currentItem;
    return(
      <div>
        <RenderListBanner banner={this.state.banner} onClick={this.handleClick}/>
      <div id="crusdmodal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Chỉnh Sửa</h4>
            </div>
            <div className="modal-body">
            {
              currentItem.id =='' ? <Loading/>: <RenderBannerForm currentItem={currentItem} onSubmit={this.submitUpload} onChange={this.handleChange}/>
            }
            </div>
          </div>
        </div>
      </div>
   </div>
    );
  }
}
