'use strict';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import React from 'react';
import Loading from'../Loading';
import Header from '../../../service/common/header.js';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';

function RenderSelectCategory(props){
  console.log(props.values);
  console.log('props.values');
  var option = [];
  option.push(<option value="0">SELECT</option>);
  const data = props.data;
  for(var i = 0; i < data.length; i++){
    option.push(<option value={data[i]._id}>{data[i].name}</option>);
  }
  return(
    <select name="category" value={props.values} onChange={props.onChange}>
    {option}
    </select>
  );
};

export default class ListProdcuts extends React.Component {

    constructor() {
        super();
        this.state = {
                      formUpload:{title:'', image:''},
                      select:[],
                      products:[],
                      totalRecords:0,
                      globalFilter:'',
                      currentItem:{id:'', name:'', price:'', webPrice:'', category:''}};
        this.onLazyLoad = this.onLazyLoad.bind(this);
        this.submitUpload = this.submitUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getSubCategory = this.getSubCategory.bind(this);
        this.onClickHandle = this.onClickHandle.bind(this);
        this.actionTemplate = this.actionTemplate.bind(this);
        this.addNew = this.addNew.bind(this);
    }

    onLazyLoad(event){
      var self = this;
      self.setState({products:[]});
      const urlData = (event.first === null ? 0 : event.first)+'/'+ (event.rows) +'/'+
                      (event.sortField)+'/'+
                      (event.sortOrder === null ? 1 : event.sortOrder);
        $.ajax({
       url: '/api/get-product/'+urlData,
       type: "GET",
       dataType: 'json',
       headers:Header(),
       cache: false
       }).done(function(data) {
         self.setState({totalRecords: data.totalRecords, products:data.data});
       }).fail(function(err){
         self.setState({totalRecords: -1, products:[]});
       });
    }

    onClickHandle(e){
      var sefl = this;
      sefl.setState({currentItem:{id:'', name:'', price:'', webPrice:'', category:''}});
      const id = e.target.getAttribute('data-id');
      if(id){
        $.ajax({
       url: '/get/product/'+id,
       type: "GET",
       headers:Header(),
       dataType: 'json',
       cache: false
     }).done(function(result) {
         const data = result.product;
         sefl.setState({currentItem:{id:data._id, name:data.name, price:data.price, webPrice:data.webprice, category:data.cate_id}});
         console.log(sefl.state);
       }).fail(function(err){

       });
      }
    }

    imageTemplate(rowData, column){
      return(<img style={{'width':'100px', 'height':'100px'}} src={rowData.image}/>);
    }

    actionTemplate(rowData, column) {
           return <div>
               <a href="#" data-toggle="modal" data-target="#crusdmodal"><i data-id={rowData.id} onClick={this.onClickHandle} className="fa fa-edit"></i></a>
           </div>;
       }

    handleChange(e){
      const fieldName = e.target.name;
      const data = this.state.currentItem;
      data[fieldName]= e.target.value
      this.setState({currentItem:data});
    }

    getSubCategory(){
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

    componentDidMount() {
      this.getSubCategory();
    }

    submitUpload(e){
e.preventDefault();
    const file = [];
      var data = new FormData();
      data.append('image',e.target.image.files[0]);
      data.append('image',e.target.image.files[1]);
      data.append('image',e.target.image.files[2]);
    data.append('name', e.target.name.value);
    data.append('category', e.target.category.value);
    data.append('originPrice', e.target.originPrice.value);
    data.append('price', e.target.price.value);
    data.append('webPrice', e.target.webPrice.value);
    data.append('id', this.state.currentItem.id);

  		$.ajax({
  			 url: '/api/product',
  				type: "POST",
  			//contentType: 'multipart/form-data; boundary="WebKitFormBoundaryUucA6DiAhQeYNgIm"',
        contentType:false,
         processData: false,
         headers:Header(),
         //dataType:'json',
  			 data: data,
  			 cache: false,
  			 success: function(data) {
  				if(data =='OK'){
            alert('Thành công');
          } else {
            alert('Thất bại');
          }
  			 }.bind(this),
  			 error: function(xhr, status, err) {
  				alert('thất bại');
  			 }.bind(this)
  		 });

  	}

    addNew(){
      this.setState({currentItem:{id:'0', name:'', price:'', webPrice:'', category:''}})
    }

    render() {
      const currentItem = this.state.currentItem;
        return (
        <div>
          <input type="button" value="Add New" data-toggle="modal" data-target="#crusdmodal" onClick={this.addNew}/>
          <input type="text" placeholder="Global Search" size="50" value={this.state.globalFilter} onChange={(e)=>{this.setState({globalFilter:e.target.value});console.log(this.state.globalFilter);}}/>
          <DataTable value={this.state.products} paginator={true} rows={10} totalRecords={this.state.totalRecords}
                lazy={true} onLazyLoad={this.onLazyLoad} globalFilter={this.state.globalFilter} emptyMessage={this.state.totalRecords == -1? 'No record':<Loading/>} loading={true} loadingIcon={<Loading/>}>
              <Column field="id" header="Mã" />
              <Column field="image" body={this.imageTemplate} header="ảnh" />
              <Column field="name" header="tên" sortable={true} />
              <Column field="originPrice" header="giá gốc" sortable={true} />
              <Column field="price" header="giá thật" sortable={true} />
              <Column field="webPrice" header="giá bán" sortable={true} />
              <Column field="options" header="Tùy chọn" body={this.actionTemplate} style={{textAlign:'center', width: '6em'}} />
          </DataTable>

          <div id="crusdmodal" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">Chỉnh Sửa</h4>
                </div>
                <div className="modal-body">
                {
                  currentItem.id =='' ? <Loading/>:
                  <form id="upload" action="/api/upload" enctype="multipart/form-data" method="post" onSubmit={this.submitUpload}>
                  <div className="form-group">
                <label>ten</label>
                <input type="text"className="form-control" name="name" value={currentItem.name} onChange={this.handleChange}/>
                </div>

                  <div className="form-group">
                  <label>Danh muc</label>
                    <RenderSelectCategory data={this.state.select} values={currentItem.category} onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                <label>Giá gốc</label>
                <input type="text"className="form-control" name="originPrice" value={currentItem.originPrice} onChange={this.handleChange} />
              </div>
                  <div className="form-group">
                <label>Giá bán</label>
                <input type="text"className="form-control" name="price" value={currentItem.price} onChange={this.handleChange} />
              </div>
              <div className="form-group">
            <label>Giá sale</label>
            <input type="text"className="form-control" name="webPrice" value={currentItem.webPrice} onChange={this.handleChange} />
            </div>
                  <div className="form-group">
                <label>anh</label>
                    <input type="file" multiple  name="image"/>
                    </div>
                    <input type="submit" value="Gui" />
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
