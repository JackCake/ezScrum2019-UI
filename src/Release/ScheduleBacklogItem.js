import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import Config from '../config.js';

// Import React Table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

class ScheduleBacklogItem extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show : false,
            data : [],
            selectedBacklogItemIds : []
        };

        this.handleRowSelect = this.handleRowSelect.bind(this);

        this.options = {
            sortIndicator: true,
            noDataText: 'No data'
        };
        this.selectRow = {
            mode: 'checkbox',
            bgColor: 'skyblue',
            clickToSelect: true,
            hideSelectColumn: true,
            onSelect: this.handleRowSelect
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getAllNotYetScheduledBacklogItem = this.getAllNotYetScheduledBacklogItem.bind(this);
        this.submitScheduledBacklogItem = this.submitScheduledBacklogItem.bind(this);
    }

    handleShow(){
        this.setState({show : true});
        this.getAllNotYetScheduledBacklogItem();
    }

    handleClose(){
        this.setState({
            show : false,
            selectedBacklogItemIds : []
        });
    }

    handleRowSelect(row, isSelected) {
        let selectedBacklogItemIds = this.state.selectedBacklogItemIds;
        if (isSelected) {
            selectedBacklogItemIds.push(row.backlogItemId);
        } else {
            selectedBacklogItemIds.splice(selectedBacklogItemIds.indexOf(row.backlogItemId), 1);
        }
        this.setState({selectedBacklogItemIds});
      }

      getAllNotYetScheduledBacklogItem(){
        let self =this;
        axios.get(Config.back_end_host + Config.ezScrum_api + '/products/' + this.props.selectedProduct.productId + '/not_yet_scheduled_backlog_items')
        .then(function (response) {
            let notYetScheduledBacklogItemList = response.data.notYetScheduledBacklogItemList;
            self.setState({data : notYetScheduledBacklogItemList});
        })
        .catch(function (error){
            console.log(error);
            window.location.href = Config.front_end_host;
        });
    }

    submitScheduledBacklogItem(){
        if(this.state.selectedBacklogItemIds.length === 0){
            alert("Please choose backlog item.");
            return;
        }
        let self = this;
        axios.post(Config.back_end_host + Config.ezScrum_api + '/releases/' + this.props.selectedRelease.releaseId + '/scheduled_backlog_items',{
            backlogItemIds : this.state.selectedBacklogItemIds
            }).then(function (response) {
                let scheduleSuccess = response.data.scheduleSuccess;
                let errorMessage = response.data.errorMessage;
                if(scheduleSuccess === false){
                    alert(errorMessage);
                    return;
                }
                self.handleClose();
                self.props.getAllScheduledBacklogItem(self.props.selectedRelease.releaseId);
                self.getAllNotYetScheduledBacklogItem();
            }).catch(function (error){
                console.log(error);
                window.location.href = Config.front_end_host;
            });
    }

    render(){
        return (
            <div>
                <Button className="Function_Button" bsStyle="link" bsSize="small" onClick={this.handleShow} disabled={this.props.disabled}>
                    <img src="../add.gif" alt="Schedule Backlog Item"/>Schedule Backlog Item
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Schedule Backlog Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <BootstrapTable data={this.state.data}  selectRow={this.selectRow}  options={this.options} bordered={true} pagination={ true } striped hover condensed>
                            <TableHeaderColumn dataField="backlogItemId" isKey hidden>Id</TableHeaderColumn>
                            
                            <TableHeaderColumn 
                                dataField="orderId"
                                width="10%"
                                dataSort={true}
                                columnTitle
                            >
                                Id
                            </TableHeaderColumn>

                            <TableHeaderColumn 
                                dataField="description"
                                width="60%"
                                dataSort={false}
                                filter={{type: 'TextFilter', delay: 100}}
                                columnTitle
                            >
                                Description
                            </TableHeaderColumn>

                            <TableHeaderColumn 
                                dataField="estimate"
                                width="18%"
                                dataSort={true}
                                columnTitle
                            >
                                Estimate
                            </TableHeaderColumn>  

                            <TableHeaderColumn 
                                dataField="importance"
                                width="20%"
                                dataSort={true}
                                columnTitle
                            >
                                Importance
                            </TableHeaderColumn>               
                        </BootstrapTable>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.submitScheduledBacklogItem}>Submit</Button>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ScheduleBacklogItem;