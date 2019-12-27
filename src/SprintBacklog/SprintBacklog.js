import React from 'react';
import axios from 'axios';
import Select from 'react-select';
import SideBar from '../SideBar.js';
import AddBacklogItem from './AddBacklogItem.js';
import CommitBacklogItem from './CommitBacklogItem.js';
import PrintCommittedBacklogItem from './PrintCommittedBacklogItem.js';
import PrintTask from './PrintTask.js';
import ShowSprintInformation from './ShowSprintInformation.js';
import StoryBurndownChart from './StoryBurndownChart.js';
import TaskBurndownChart from './TaskBurndownChart.js';
import ViewCommittedBacklogItem from './ViewCommittedBacklogItem.js';
import { Redirect } from 'react-router-dom';

class SprintBacklog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedCommittedBacklogItem : undefined,
      storyData : [],
      taskData : [],
      sprintList : [],
      sprintOptions : [],
      selectedSprintOption : undefined,
      selectedSprintId : undefined,
      isSprintOverdue : true, 
      storyRealPoints : [], 
      storyIdealPoints : [], 
      storySprintDates : [], 
      taskRealPoints : [], 
      taskIdealPoints : [], 
      taskSprintDates : []
    };
    this.getAllSprintList = this.getAllSprintList.bind(this);
    this.getStoryBurndownChart = this.getStoryBurndownChart.bind(this);
    this.getTaskBurndownChart = this.getTaskBurndownChart.bind(this);
    this.getAllCommittedBacklogItem = this.getAllCommittedBacklogItem.bind(this);
    this.getAllTask = this.getAllTask.bind(this);
    this.getAllSprintList();
  }

  getAllSprintList(){
    if(this.props.location.state === undefined){
      return <Redirect to={"/"}/>
    }
    let self =this;
    let options = [];
    axios.get('http://localhost:8080/ezScrum/products/' + this.props.location.state.selectedProduct.productId + '/sprints')
    .then(function (response) {
        let sprintList = response.data.sprintList;
        sprintList.forEach(element => {
            options.push({value : element.sprintId, label : "Sprint#" + element.orderId});
        });
        self.setState({
          sprintOptions : options,
          sprintList : sprintList
        });
        if(options.length > 0){
          let lastSprintOption = options[options.length-1];
          let lastSprintId = lastSprintOption.value;
          self.setState({
            selectedSprintOption : lastSprintOption,
            selectedSprintId : lastSprintId,
            isSprintOverdue : sprintList[sprintList.length-1].sprintOverdue
          });
          self.getAllCommittedBacklogItem(lastSprintId);
        }
    })
    .catch(function (error){
        console.log(error);
    });
  }

  getStoryBurndownChart(selectedSprintId){
    let self =this;
    axios.get('http://localhost:8080/ezScrum/products/' + this.props.location.state.selectedProduct.productId + '/sprints/' + selectedSprintId + '/backlog_item_burndown_chart')
    .then(function (response) {
        let realPoints = response.data.realPoints;
        let idealPoints = response.data.idealPoints;
        let sprintDates = response.data.sprintDates;
        self.setState({
          storyRealPoints: realPoints, 
          storyIdealPoints: idealPoints, 
          storySprintDates: sprintDates
        });
    })
    .catch(function (error){
        console.log(error);
    });
  }

  getTaskBurndownChart(selectedSprintId){
    let self =this;
    axios.get('http://localhost:8080/ezScrum/products/' + this.props.location.state.selectedProduct.productId + '/sprints/' + selectedSprintId + '/task_burndown_chart')
    .then(function (response) {
        let realPoints = response.data.realPoints;
        let idealPoints = response.data.idealPoints;
        let sprintDates = response.data.sprintDates;
        self.setState({
          taskRealPoints: realPoints, 
          taskIdealPoints: idealPoints, 
          taskSprintDates: sprintDates
        });
    })
    .catch(function (error){
        console.log(error);
    });
  }

  getAllCommittedBacklogItem(selectedSprintId){
    let self = this;
    axios.get('http://localhost:8080/ezScrum/products/' + this.props.location.state.selectedProduct.productId + '/sprints/' + selectedSprintId + '/committed_backlog_items')
    .then(function (response) {
        self.setState({taskData : []})
        let committedBacklogItemList = response.data.committedBacklogItemList;
        committedBacklogItemList.forEach(element => {
          self.getAllTask(element.backlogItemId)
        });
        self.setState({storyData : committedBacklogItemList});
        self.getStoryBurndownChart(selectedSprintId);
        self.getTaskBurndownChart(selectedSprintId);
    })
    .catch(function (error){
        console.log(error);
    });
  }

  getAllTask(backlogItemId){
    let self =this;
    axios.get('http://localhost:8080/ezScrum/committed_backlog_items/' + backlogItemId + '/tasks')
    .then(function (response) {
      let taskList = response.data.taskList;
      let taskData = self.state.taskData;
      taskData.push({backlogItemId : backlogItemId, taskList : taskList});
      self.setState({taskData : taskData});
    })
    .catch(function (error){
        console.log(error);
    });
  }

  selectSprintOnChange(selectedSprint){
    let selectedSprintId = selectedSprint.value;
    this.setState({
      selectedSprintOption : selectedSprint,
      selectedSprintId : selectedSprintId
    });
    this.getAllCommittedBacklogItem(selectedSprintId);
    this.state.sprintList.forEach(element => {
      if(element.sprintId === selectedSprintId){
        this.setState({isSprintOverdue : element.sprintOverdue})
      }
    });
  }

  render() {
    if(this.props.location.state === undefined){
      return <Redirect to={"/"}/>
    }
    return (
      <div className="SideBar_Div_All">
        <div className="SideBar_Div">
          <SideBar selectedProduct={this.props.location.state.selectedProduct}/>
        </div>
        <div className="SideBar_Div_Main">
          <div>
            <div style = {{display : 'flex'}}>
              <AddBacklogItem getAllCommittedBacklogItem={this.getAllCommittedBacklogItem} selectedSprintId={this.state.selectedSprintId} selectedProduct={this.props.location.state.selectedProduct} disabled={this.state.isSprintOverdue}/>
              <CommitBacklogItem getAllCommittedBacklogItem={this.getAllCommittedBacklogItem} selectedSprintId={this.state.selectedSprintId} selectedProduct={this.props.location.state.selectedProduct} disabled={this.state.isSprintOverdue}/>
              <PrintCommittedBacklogItem selectedSprintId={this.state.selectedSprintId} selectedProduct={this.props.location.state.selectedProduct}/>
              <PrintTask selectedSprintId={this.state.selectedSprintId} selectedProduct={this.props.location.state.selectedProduct}/>
              <ShowSprintInformation selectedSprintId={this.state.selectedSprintId} selectedProduct={this.props.location.state.selectedProduct}/>
            </div>
            <Select name="form-field-name" value={this.state.selectedSprintOption} onChange={this.selectSprintOnChange.bind(this)} options={this.state.sprintOptions} isClearable={false}/>
            <div style = {{display : 'flex'}}>
              <StoryBurndownChart storyRealPoints={this.state.storyRealPoints} storyIdealPoints={this.state.storyIdealPoints} storySprintDates={this.state.storySprintDates}/>
              <TaskBurndownChart taskRealPoints={this.state.taskRealPoints} taskIdealPoints={this.state.taskIdealPoints} taskSprintDates={this.state.taskSprintDates}/>
            </div>
            <ViewCommittedBacklogItem storyData={this.state.storyData} taskData={this.state.taskData} 
            getAllCommittedBacklogItem={this.getAllCommittedBacklogItem} selectedSprintId={this.state.selectedSprintId} selectedProduct={this.props.location.state.selectedProduct} isSprintOverdue={this.state.isSprintOverdue}/>
          </div>
        </div>
      </div>
    );
  }
}

export default SprintBacklog;