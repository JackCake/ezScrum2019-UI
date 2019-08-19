import React from 'react';
import axios from 'axios';
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
    if(this.props.selectedProduct === undefined){
      return <Redirect to={"/"}/>
    }
    let self =this;
    axios.get('http://localhost:8080/ezScrum/products/' + this.props.selectedProduct.productId + '/sprints')
    .then(function (response) {
        let sprintList = response.data.sprintList;
        let selectedSprint = self.state.selectedSprint;
        if(selectedSprint !== undefined){
          let selectedSprintList = sprintList.filter(function(sprint){
            return sprint.sprintId === selectedSprint.sprintId;
          });
          if(selectedSprintList === []){
            self.setState({selectedSprint : undefined});
          }else{
            self.setState({selectedSprint : selectedSprintList[0]});
          }
        }
        self.setState({sprintData : sprintList});
    })
    .catch(function (error){
        console.log(error);
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
    return (
      <div>
        <div style = {{display : 'flex'}}>
          <AddSprint getAllSprint={this.getAllSprint} selectedProduct={this.props.selectedProduct}/>
          <EditSprint getAllSprint={this.getAllSprint} selectedSprint={this.state.selectedSprint} selectedProduct={this.props.selectedProduct}/>
          <DeleteSprint getAllSprint={this.getAllSprint} selectedSprint={this.state.selectedSprint} selectedProduct={this.props.selectedProduct}/>
        </div>
        <ViewSprint sprintData={this.state.sprintData} handleRowSelect={this.handleRowSelect}/>
      </div>
    );
  }
}

export default Sprint;