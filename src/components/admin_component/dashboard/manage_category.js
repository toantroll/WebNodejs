'use strict';
import $ from 'jquery';
import React from 'react';
import Loading from '../Loading';
import Header from '../../../service/common/header.js';

function RenderCategory(props){
  var aArray = [];
  for(var i = 0; i < props.data.length; i++){
    aArray.push(<a href="#" data-parent={props.cateId} data-cate-id={props.data[i]._id} data-cate-name={props.data[i].name} className="list-group-item" data-toggle="modal" data-target="#crusdmodal" onClick={props.onclick}>{props.data[i].name}</a>);
  }
  aArray.push(<a href="#" data-parent={props.cateId} data-cate-id={''} data-cate-name={''} className="list-group-item" data-toggle="modal" data-target="#crusdmodal" onClick={props.onclick}>ADD</a>);
  return(
  <div className="list-group"><h3>{props.cateName}<a href="#" data-parent="0" data-cate-id={props.cateId} data-cate-name={props.cateName} onClick={props.onclick} data-toggle="modal" data-target="#crusdmodal"><i data-parent="0" data-cate-id={props.cateId} data-cate-name={props.cateName} className="fa fa-pencil-square-o" aria-hidden="true"></i></a></h3>
  {aArray}
    </div>);
}


function RenderForm(props){
  var option = [];
  for(var i = 0; i < props.combo.length; i++){
    option.push(<option value={props.combo[i]._id}>{props.combo[i].name}</option>);
  }
  const errorForm = props.errorForm;
  return(
    <form action="#" onSubmit={props.onSubmit}>
    {props.data.parent ==='0'?<input type="hidden" className="form-control" name="parent" value={props.data.parent} />:  <div className="form-group"><label>Danh mục cha</label><select value={props.data.parent} name="parent" onChange={props.onChange}>{option}</select></div>}
  <div className="form-group">
    <label>Tên danh mục</label>
    <p className="text-danger">{errorForm.cateName}</p>
    <input type="hidden" className="form-control" name="cateId" value={props.data.cateId ===''?'0':props.data.cateId}/>
    <input type="text" className={'form-control'} name="cateName" value={props.data.cateName} onChange={props.onChange} />
    </div>
    {props.data.parent === '0'? <div className="form-group"><label>Ảnh Banner</label><p className="text-danger">{errorForm.img}</p><input type="file" className={'form-control'} name="img"/></div>:''}
  <button type="submit" className="btn btn-default">Gửi</button>
</form>
  );
}

export default class ManageCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data:null,modal:{cateId:'', cateName:'', parent:'0'}, errorForm:{cateName:'', img:''}};
    this.onClickHandle = this.onClickHandle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getAllCategory = this.getAllCategory.bind(this);
    this.validateCategoryForm = this.validateCategoryForm.bind(this);
    this.submitCategory = this.submitCategory.bind(this);
    this.updateSubCategory = this.updateSubCategory.bind(this);
  }

  handleChange(e){
    const fieldName = e.target.name;
    const data = this.state.modal;
    data[fieldName]= e.target.value
    this.setState({modal:data});
  }

  onClickHandle(e){
    const data = {cateId:'', cateName:'', parent:'0'};
    var errorForm ={cateName:'', img:''};
    data.cateId = e.target.getAttribute('data-cate-id');
    data.cateName = e.target.getAttribute('data-cate-name');
    data.parent = e.target.getAttribute('data-parent');
    this.setState({modal:{cateId:data.cateId, cateName:data.cateName, parent:data.parent}, errorForm:errorForm});
  }

  submitCategory(e){
    e.preventDefault();
    if(this.validateCategoryForm(e)){
      var data = new FormData();
      data.append('parent', e.target.parent.value);
      data.append('cateId', e.target.cateId.value);
      data.append('cateName', e.target.cateName.value);
      const img =  e.target.img;
      if(img != undefined){
        data.append('img', img.files[0]);
      }
      this.updateSubCategory(data);
    }

  }

  validateCategoryForm(e){
    let flag = true;
    const formData = e.target;
    var errorForm ={cateName:'', img:''};
    if(formData.cateName.value === undefined || formData.cateName.value ===''){
      errorForm.cateName='Hãy nhập tên danh mục';
      flag = false;
    }
    if(formData.parent.value === '0' &&
      (formData.img === undefined || formData.img.files.length === 0)){
      errorForm.img = 'Hãy thêm ảnh banner vào';
      flag = false;
    }
    this.setState({errorForm:errorForm});
    return flag;
  }

  componentDidMount(){
    document.title = 'Quản lý danh mục';
    this.getAllCategory();
  }

  updateSubCategory(data){
    var sefl = this;
    $.ajax({
       url: '/api/updatecategory',
        type: "POST",
        headers:Header(),
      //contentType: 'multipart/form-data; boundary="WebKitFormBoundaryUucA6DiAhQeYNgIm"',
      contentType:false,
       processData: false,
       //dataType:'json',
       data: data,
       cache: false,
       success: function(data) {
        alert('Thành công');
        sefl.getAllCategory();
       }.bind(this),
       error: function(xhr, status, err) {
        alert('thất bại');
       }.bind(this)
     })
  }

  getAllCategory(){
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
    if(data == null){
      return(<Loading/>);
    } else {
      var category = [];
      for(var i = 0; i < data.length; i++){
        category.push(<RenderCategory onclick={this.onClickHandle} data={data[i].sub_cate} cateId={data[i]._id} cateName={data[i].name}/>);
      }
      return(
      <div>
      <button type="button" data-cate-id="" data-cate-name="" data-parent="0" data-toggle="modal" data-target="#crusdmodal" onClick={this.onClickHandle}>Thêm Danh mục gốc</button>
      {category}

      <div id="crusdmodal" className="modal fade" role="dialog">
<div className="modal-dialog">

  <div className="modal-content">
    <div className="modal-header">
      <button type="button" className="close" data-dismiss="modal">&times;</button>
      <h4 className="modal-title">Chỉnh Sửa</h4>
    </div>
    <div className="modal-body">
      <RenderForm onSubmit={this.submitCategory} data={this.state.modal} combo={data} errorForm={this.state.errorForm} onChange={this.handleChange}/>
    </div>
  </div>

</div>
</div>
      </div>);
    }
  }
}
