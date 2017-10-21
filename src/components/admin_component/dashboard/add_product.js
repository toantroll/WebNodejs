'use strict';
import $ from 'jquery';
import React from 'react';
import CKEditor from "react-ckeditor-component";
import Header from '../../../service/common/header.js';

function RenderSelectCategory(props){
  var option = [];
  option.push(<option value="0">SELECT</option>);
  const data = props.data;
  for(var i = 0; i < data.length; i++){
    option.push(<option value={data[i]._id}>{data[i].name}</option>);
  }
  return(
    <select name="category">
    {option}
    </select>
  );
};

export default class DashBoardPage extends React.Component {
  constructor(props){
    super(props);
    this.submitUpload = this.submitUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.onChange = this.onChange.bind(this);
        this.state = {
            content: 'content',
            formUpload:{title:'', image:''},
            select:[]
        }
  }

  handleChange(e){
    const fieldName = e.target.name;
    const data = {};
    data[fieldName]= e.target.value
    this.setState({formUpload:data});
  }

  componentDidMount(){
    var sefl = this;
      $.ajax({
     url: '/get/allsubcategory/',
     type: "GET",
     headers:Header(),
     dataType: 'json',
     cache: false
     }).done(function(data) {
       sefl.setState({select:data});
     }).fail(function(err){

     });
  }

  	submitUpload(e){
e.preventDefault();
    const file = [];
      var data = new FormData();
      data.append('image',e.target.image.files[0]);
      data.append('image',e.target.image.files[1]);
      data.append('image',e.target.image.files[2]);
    data.append('name', e.target.name.value);
    data.append('description', e.target.description.value);
    data.append('category', e.target.category.value);
    data.append('price', e.target.price.value);
    data.append('webprice', e.target.webprice.value);

  		$.ajax({
  			 url: '/api/product',
  				type: "POST",
          headers:Header(),
  			//contentType: 'multipart/form-data; boundary="WebKitFormBoundaryUucA6DiAhQeYNgIm"',
        contentType:false,
         processData: false,
         //dataType:'json',
  			 data: data,
  			 cache: false,
  			 success: function(data) {
  				alert('Thêm mớiThành công');
  			 }.bind(this),
  			 error: function(xhr, status, err) {
  				alert('Thêm mới thất bại');
  			 }.bind(this)
  		 });

  	}

  updateContent(newContent) {
        this.setState({
            content: newContent
        })
    }
    onChange(evt){
      console.log("onChange fired with event info: ", evt);
      var newContent = evt.editor.getData();
      this.setState({
        content: newContent
      })
    }

    onBlur(evt){
      console.log("onBlur event called with event info: ", evt);
    }

    afterPaste(evt){
      console.log("afterPaste event called with event info: ", evt);
    }

  render(){
    return(
      <div>
      <form id="upload" action="/api/upload" enctype="multipart/form-data" method="post" onSubmit={this.submitUpload}>
      <div className="form-group">
    <label>ten</label>
    <input type="text"className="form-control" name="name" />
    </div>
          <div className="form-group">
        <label>Mo ta</label>
        <input type="text"className="form-control" name="description" />
      </div>
      <div className="form-group">
      <label>Danh muc</label>
        <RenderSelectCategory data={this.state.select}/>
      </div>
      <div className="form-group">
    <label>Gia</label>
    <input type="text"className="form-control" name="price" />
  </div>
  <div className="form-group">
<label>Gia ban</label>
<input type="text"className="form-control" name="webprice" />
</div>
      <div className="form-group">
    <label>anh</label>
        <input type="file" multiple  name="image"/>
        </div>
        <input type="submit" value="Upload" />
      </form>
      </div>
    );
  }
}
