import React from 'react';
import axios from 'axios';
import Config from '../config.js';
import SideBar from '../SideBar.js';
import AddSprint from './AddSprint.js';
import ViewSprint from './ViewSprint.js';
import EditSprint from './EditSprint.js';
import DeleteSprint from './DeleteSprint.js';
import { Redirect } from 'react-router-dom';

class Sprint extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedSprint : undefined, 
      sprintData : []
    };
    this.getAllSprint = this.getAllSprint.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.getAllSprint();
  }

  getAllSprint(){
    if(this.props.location.state === undefined){
      return <Redirect to={"/"}/>;
    }
    let self =this;
    axios.get(Config.back_end_host + Config.ezScrum_api + '/products/' + this.props.location.state.selectedProduct.productId + '/sprints')
    .then(function (response) {
        let sprintList = response.data.sprintList;
        let selectedSprint = self.state.selectedSprint;
        if(selectedSprint !== undefined){
          let selectedSprintList = sprintList.filter(function(sprint){
            return sprint.sprintId === selectedSprint.sprintId;
          });
          if(selectedSprintList.length === 0){
            self.setState({selectedSprint : undefined});
          }else{
            self.setState({selectedSprint : selectedSprintList[0]});
          }
        }
        self.setState({sprintData : sprintList});
    })
    .catch(function (error){
        console.log(error);
        window.location.href = Config.front_end_host;
    });
  }

  handleRowSelect(row, isSelected) {
    if (isSelected) {
        this.setState({selectedSprint: row});
    } else {
      this.setState({selectedSprint: undefined});
    }
  }

  render() {
    if(this.props.location.state === undefined){
      return <Redirect to={"/"}/>;
    }
    return (
      <div className="SideBar_Div_All">
        <div className="SideBar_Div">
          <SideBar selectedProduct={this.props.location.state.selectedProduct}/>
        </div>
        <div className="SideBar_Div_Main">
        <div>
          <div style = {{display : 'flex'}}>
            <AddSprint getAllSprint={this.getAllSprint} selectedProduct={this.props.location.state.selectedProduct}/>
            <EditSprint getAllSprint={this.getAllSprint} selectedSprint={this.state.selectedSprint} selectedProduct={this.props.location.state.selectedProduct}/>
            <DeleteSprint getAllSprint={this.getAllSprint} selectedSprint={this.state.selectedSprint} selectedProduct={this.props.location.state.selectedProduct}/>
          </div>
          <ViewSprint sprintData={this.state.sprintData} handleRowSelect={this.handleRowSelect}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Sprint;