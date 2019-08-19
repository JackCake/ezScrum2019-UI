import React from 'react';
import axios from 'axios';
import AddBacklogItem from './AddBacklogItem.js';
import EditBacklogItem from './EditBacklogItem.js';
import ViewBacklogItem from './ViewBacklogItem.js';
import DeleteBacklogItem from './DeleteBacklogItem.js';
import { Redirect } from 'react-router-dom';

class BacklogItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedBacklogItem : undefined,
      backlogItemData : []
    };
    this.getAllBacklogItem = this.getAllBacklogItem.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.getAllBacklogItem();
  }

  getAllBacklogItem(){
    if(this.props.selectedProduct === undefined){
      return <Redirect to={"/"}/>
    }
    let self =this;
    axios.get('http://localhost:8080/ezScrum/products/' + this.props.selectedProduct.productId + '/backlog_items')
    .then(function (response) {
      let backlogItemList = response.data.backlogItemList;
      for(var i=0; i<backlogItemList.length; i++){
          if(backlogItemList[i].releaseOrderId === 0){
            backlogItemList[i].releaseOrderId = '';
          }
          if(backlogItemList[i].sprintOrderId === 0){
            backlogItemList[i].sprintOrderId = '';
          }
      }
      let selectedBacklogItem = self.state.selectedBacklogItem;
      if(selectedBacklogItem !== undefined){
          let selectedBacklogItemList = backlogItemList.filter(function(backlogItem){
            return backlogItem.backlogItemId === selectedBacklogItem.backlogItemId;
          });
          if(selectedBacklogItemList === []){
            self.setState({selectedBacklogItem : undefined});
          }else{
            self.setState({selectedBacklogItem : selectedBacklogItemList[0]});
          }
      }
      self.setState({backlogItemData : backlogItemList});
    })
    .catch(function (error){
        console.log(error);
    });
  }

  handleRowSelect(row, isSelected) {
    if (isSelected) {
        this.setState({selectedBacklogItem: row});
    } else {
      this.setState({selectedBacklogItem: undefined});
    }
  }

  render() {
    return (
      <div>
        <div style = {{display : 'flex'}}>
          <AddBacklogItem getAllBacklogItem={this.getAllBacklogItem} selectedProduct={this.props.selectedProduct}/>
          <EditBacklogItem getAllBacklogItem={this.getAllBacklogItem} selectedBacklogItem={this.state.selectedBacklogItem} selectedProduct={this.props.selectedProduct}/>
          <DeleteBacklogItem getAllBacklogItem={this.getAllBacklogItem} selectedBacklogItem={this.state.selectedBacklogItem} selectedProduct={this.props.selectedProduct}/>
        </div>
        <ViewBacklogItem backlogItemData={this.state.backlogItemData} handleRowSelect={this.handleRowSelect}/>
      </div>
    );
  }
}

export default BacklogItem;