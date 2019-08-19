import React from 'react';
import axios from 'axios';
import AddRelease from './AddRelease.js';
import EditRelease from './EditRelease.js';
import DeleteRelease from './DeleteRelease.js';
import ViewRelease from './ViewRelease.js';
import AddBacklogItem from './AddBacklogItem.js';
import ScheduleBacklogItem from './ScheduleBacklogItem.js';
import UnscheduleBacklogItem from './UnscheduleBacklogItem.js';
import EditBacklogItem from './EditBacklogItem.js';
import DeleteBacklogItem from './DeleteBacklogItem.js';
import ViewScheduledBacklogItem from './ViewScheduledBacklogItem.js';
import { Redirect } from 'react-router-dom';

class Release extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedRelease : undefined, 
      selectedScheduledBacklogItem : undefined, 
      releaseData : [], 
      scheduledBacklogItemData : [], 
      isReleaseOverdue : true
    };
    this.getAllRelease = this.getAllRelease.bind(this);
    this.getAllScheduledBacklogItem = this.getAllScheduledBacklogItem.bind(this);
    this.handleReleaseRowSelect = this.handleReleaseRowSelect.bind(this);
    this.handleScheduledBacklogItemRowSelect = this.handleScheduledBacklogItemRowSelect.bind(this);
    this.clearAllScheduledBacklogItemAfterDeleteRelease = this.clearAllScheduledBacklogItemAfterDeleteRelease.bind(this);
    this.getAllRelease();
  }

  getAllRelease(){
    if(this.props.selectedProduct === undefined){
      return <Redirect to={"/"}/>
    }
    let self =this;
    axios.get('http://localhost:8080/ezScrum/products/' + this.props.selectedProduct.productId + '/releases')
    .then(function (response) {
        let releaseList = response.data.releaseList;
        let selectedRelease = self.state.selectedRelease;
        if(selectedRelease !== undefined){
          let selectedReleaseList = releaseList.filter(function(release){
            return release.releaseId === selectedRelease.releaseId;
          });
          if(selectedReleaseList === []){
            self.setState({selectedRelease : undefined});
          }else{
            self.setState({selectedRelease : selectedReleaseList[0]});
          }
        }
        self.setState({releaseData : releaseList});
    })
    .catch(function (error){
        console.log(error);
    });
  }

  getAllScheduledBacklogItem(selectedReleaseId){
    let self = this;
    axios.get('http://localhost:8080/ezScrum/products/' + this.props.selectedProduct.productId + '/releases/' + selectedReleaseId + '/scheduled_backlog_items')
    .then(function (response) {
        let scheduledBacklogItemList = response.data.scheduledBacklogItemList;
        let selectedScheduledBacklogItem = self.state.selectedScheduledBacklogItem;
        if(selectedScheduledBacklogItem !== undefined){
          let selectedScheduledBacklogItemList = scheduledBacklogItemList.filter(function(scheduleBacklogItem){
            return scheduleBacklogItem.backlogItemId === selectedScheduledBacklogItem.backlogItemId;
          });
          if(selectedScheduledBacklogItemList === []){
            self.setState({scheduleBacklogItem : undefined});
          }else{
            self.setState({scheduleBacklogItem : selectedScheduledBacklogItemList[0]});
          }
        }
        self.setState({scheduledBacklogItemData : scheduledBacklogItemList});
    })
    .catch(function (error){
        console.log(error);
    });
  }

  handleReleaseRowSelect(row, isSelected) {
    if (isSelected) {
        this.getAllScheduledBacklogItem(row.releaseId);
        this.setState({
          selectedRelease: row, 
          isReleaseOverdue: row.releaseOverdue
        });
    } else {
      this.setState({
        selectedRelease: undefined, 
        isReleaseOverdue: true
      });
    }
  }

  handleScheduledBacklogItemRowSelect(row, isSelected) {
    if (isSelected) {
        this.setState({selectedScheduledBacklogItem: row});
    } else {
      this.setState({selectedScheduledBacklogItem: undefined});
    }
  }

  clearAllScheduledBacklogItemAfterDeleteRelease(){
    this.setState({scheduledBacklogItemData: []});
  }

  render() {
    return (
      <div>
        <div style = {{display : 'flex'}}>
          <AddRelease getAllRelease={this.getAllRelease} selectedProduct={this.props.selectedProduct}/>
          <EditRelease getAllRelease={this.getAllRelease} selectedRelease={this.state.selectedRelease} selectedProduct={this.props.selectedProduct}/>
          <DeleteRelease getAllRelease={this.getAllRelease} clearAllScheduledBacklogItemAfterDeleteRelease={this.clearAllScheduledBacklogItemAfterDeleteRelease} selectedRelease={this.state.selectedRelease} selectedProduct={this.props.selectedProduct}/>
          <AddBacklogItem getAllScheduledBacklogItem={this.getAllScheduledBacklogItem} selectedRelease={this.state.selectedRelease} selectedProduct={this.props.selectedProduct} disabled={this.state.isReleaseOverdue}/>
          <ScheduleBacklogItem getAllScheduledBacklogItem={this.getAllScheduledBacklogItem} selectedRelease={this.state.selectedRelease} selectedProduct={this.props.selectedProduct} disabled={this.state.isReleaseOverdue}/>
        </div>
        <ViewRelease releaseData={this.state.releaseData} handleReleaseRowSelect={this.handleReleaseRowSelect}/>
        <div style = {{display : 'flex'}}>
          <EditBacklogItem getAllScheduledBacklogItem={this.getAllScheduledBacklogItem} selectedScheduledBacklogItem={this.state.selectedScheduledBacklogItem} selectedRelease={this.state.selectedRelease}/>
          <DeleteBacklogItem getAllScheduledBacklogItem={this.getAllScheduledBacklogItem} selectedScheduledBacklogItem={this.state.selectedScheduledBacklogItem} selectedRelease={this.state.selectedRelease} selectedProduct={this.props.selectedProduct}/>
          <UnscheduleBacklogItem getAllScheduledBacklogItem={this.getAllScheduledBacklogItem} selectedScheduledBacklogItem={this.state.selectedScheduledBacklogItem} 
          selectedRelease={this.state.selectedRelease} selectedProduct={this.props.selectedProduct} isReleaseOverdue={this.state.isReleaseOverdue}/>
        </div>
        <ViewScheduledBacklogItem scheduledBacklogItemData={this.state.scheduledBacklogItemData} handleScheduledBacklogItemRowSelect={this.handleScheduledBacklogItemRowSelect}/>
      </div>
    );
  }
}

export default Release;