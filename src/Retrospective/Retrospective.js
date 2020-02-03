import React from 'react';
import axios from 'axios';
import Config from '../config.js';

import SideBar from '../SideBar.js';

import ViewRetrospective from './ViewRetrospective.js';
import EditRetrospective from './EditRetrospective.js';

import { Redirect } from 'react-router-dom';

class Retrospective extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedRetrospective: undefined,
        retrospectiveData : []
    };
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.getAllRetrospective = this.getAllRetrospective.bind(this);
    this.getAllRetrospective();
  }

  getAllRetrospective(){
    if(this.props.location.state === undefined){
      return <Redirect to={"/"}/>;
    }
    let self =this;
    axios.get(Config.back_end_host + Config.ezScrum_api + '/products/' + this.props.location.state.selectedProduct.productId + '/retrospectives')
    .then(function (response) {
        let retrospectiveList = response.data.retrospectiveList;
        for(var i=0; i<retrospectiveList.length; i++){
            if(retrospectiveList[i].sprintOrderId === 0){
              retrospectiveList[i].sprintOrderId = '';
            }
        }
        let selectedRetrospective = self.state.selectedRetrospective;
        if(selectedRetrospective !== undefined){
          let selectedRetrospectiveList = retrospectiveList.filter(function(retrospective){
            return retrospective.retrospectiveId === selectedRetrospective.retrospectiveId;
          });
          if(selectedRetrospectiveList.length === 0){
            self.setState({selectedRetrospective : undefined});
          }else{
            self.setState({selectedRetrospective : selectedRetrospectiveList[0]});
          }
        }
        self.setState({retrospectiveData : retrospectiveList});
    })
    .catch(function (error){
        console.log(error);
        window.location.href = Config.front_end_host;
    });
  }

  handleRowSelect(row, isSelected) {
    if (isSelected) {
        this.setState({selectedRetrospective: row});
    } else {
      this.setState({selectedRetrospective: undefined});
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
            <div style = {{display: 'flex'}}>
              <EditRetrospective getAllRetrospective={this.getAllRetrospective} selectedRetrospective={this.state.selectedRetrospective} selectedProduct={this.props.location.state.selectedProduct}/>
            </div>
            <ViewRetrospective retrospectiveData={this.state.retrospectiveData} handleRowSelect={this.handleRowSelect}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Retrospective;