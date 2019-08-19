import React from 'react';
import axios from 'axios';

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
    if(this.props.selectedProduct === undefined){
      return <Redirect to={"/"}/>
    }
    let self =this;
    axios.get('http://localhost:8080/ezScrum/products/' + this.props.selectedProduct.productId + '/retrospectives')
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
          if(selectedRetrospectiveList === []){
            self.setState({selectedRetrospective : undefined});
          }else{
            self.setState({selectedRetrospective : selectedRetrospectiveList[0]});
          }
        }
        self.setState({retrospectiveData : retrospectiveList});
    })
    .catch(function (error){
        console.log(error);
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
    return (
      <div>
        <div style = {{display: 'flex'}}>
          <EditRetrospective getAllRetrospective={this.getAllRetrospective} selectedRetrospective={this.state.selectedRetrospective} selectedProduct={this.props.selectedProduct}/>
        </div>
        <ViewRetrospective retrospectiveData={this.state.retrospectiveData} handleRowSelect={this.handleRowSelect}/>
      </div>
    );
  }
}

export default Retrospective;