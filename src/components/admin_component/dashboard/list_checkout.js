'use strict';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import React from 'react';
import Loading from'../Loading';
import Header from '../../../service/common/header.js';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';

export default class ListCheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select:[],
      data:[],
      totalRecords:0,
      globalFilter:'',
      currentItem:{id:'', cusName:'', cusTel:'', cusAdd:'', pName:'',
       pImage:'', cusSize:'', pPrice:'', createAt:0},
       lazyData:{first:0, rows:10, sortField: null, sortOrder: 1}
    }
    this.onLazyLoad = this.onLazyLoad.bind(this);
    this.imageTemplate = this.imageTemplate.bind(this);
    this.dateTemplate = this.dateTemplate.bind(this);
    this.actionTemplate = this.actionTemplate.bind(this);
    this.createUrlData = this.createUrlData.bind(this);
    this.getListCheckOut = this.getListCheckOut.bind(this);
    this.acceptCheckOut = this.acceptCheckOut.bind(this);
    this.deleteCheckOut = this.deleteCheckOut.bind(this);
  }

  createUrlData(){
    const event = this.state.lazyData;
    return (event.first === null ? 0 : event.first)+'/'+ (event.rows) +'/'+
                    (event.sortField)+'/'+
                    (event.sortOrder === null ? 1 : event.sortOrder);
  }

  getListCheckOut(){
    var self = this;
    const urlData = this.createUrlData();
      $.ajax({
     url: '/get/get-checkout/'+urlData,
     type: "GET",
     dataType: 'json',
     headers:Header(),
     cache: false
     }).done(function(data) {
       self.setState({totalRecords: data.totalRecords > 0? data.totalRecords: -1, data:data.data});
     }).fail(function(err){
       self.setState({totalRecords: -1, data:[]});
     });
  }

  onLazyLoad(event){
    this.setState({data:[]});
    this.setState({lazyData:{first:event.first, rows:event.rows, sortField:event.sortField, sortOrder:event.sortOrder}});
    this.getListCheckOut();
  }

  imageTemplate(rowData, column){
      return(<img style={{'width':'100px', 'height':'100px'}} src={rowData.pImage}/>);
  }

  dateTemplate(rowData, column){
    var d = rowData.createAt ? new Date(rowData.createAt) : new Date();
    return(<p>{d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+' - '+ d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear()}</p>);
  }

  acceptCheckOut(e){
    var self = this;
    const id = e.target.getAttribute('data-id');
    const flag = confirm("Bạn sẽ nhận đơn hàng này?");
    if(flag){
      self.setState({totalRecords: 0, data:[]});
      var self = this;
        $.ajax({
       url: '/api/acceptcheckout',
       type: "POST",
       dataType: 'json',
       data:{id:id},
       headers:Header(),
       cache: false
       }).done(function(data) {
          self.getListCheckOut();
       }).fail(function(err){
         self.setState({totalRecords: -1, data:[]});
       });
    }
  }

  deleteCheckOut(e){
    var self = this;
    const id = e.target.getAttribute('data-id');
    const flag = confirm("Bạn muốn hủy đơn hàng này?");
    if(flag){
      self.setState({totalRecords: 0, data:[]});
      var self = this;
        $.ajax({
       url: '/api/deletecheckout',
       type: "POST",
       dataType: 'json',
       data:{id:id},
       headers:Header(),
       cache: false
       }).done(function(data) {
          self.getListCheckOut();
       }).fail(function(err){
         self.setState({totalRecords: -1, data:[]});
       });
    }
  }

  actionTemplate(rowData, column) {
         return <div>
             <a data-id={rowData.id} onClick={this.acceptCheckOut}  href="#" data-toggle="modal" data-target="#crusdmodal">
              <i data-id={rowData.id} className="fa fa-check text-primary"></i>
             </a>
             <a data-id={rowData.id} onClick={this.deleteCheckOut} href="#" data-toggle="modal" data-target="#crusdmodal">
              <i data-id={rowData.id} className="fa fa-remove text-danger"></i>
              </a>
         </div>;
     }

  render(){
    return(
      <div>
        <input type="text" placeholder="Global Search" size="50" value={this.state.globalFilter} onChange={(e)=>{this.setState({globalFilter:e.target.value});}}/>
        <DataTable value={this.state.data} paginator={true} rows={10} totalRecords={this.state.totalRecords}
              lazy={true} onLazyLoad={this.onLazyLoad} globalFilter={this.state.globalFilter} emptyMessage={this.state.totalRecords == -1? 'No record':<Loading/>}>
            <Column field="createAt" header="Ngày tạo" body={this.dateTemplate} />
            <Column field="cusName" header="tên KH" />
            <Column field="cusTel" header="SDT" />
            <Column field="cusAdd" header="Địa chỉ" />
            <Column field="pName" header="Tên SP" />
            <Column field="pImage" header="Tên SP" body={this.imageTemplate}/>
            <Column field="cusSize" header="Size" />
            <Column field="pPrice" header="Giá" />
            <Column field="options" header="Tùy chọn" body={this.actionTemplate} style={{textAlign:'center', width: '6em'}} />
        </DataTable>

      </div>
    )
  }
}
