import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import Config from '../config.js';

// Import React Table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

class CommitBacklogItem extends React.Component{
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
        this.getAllNotYetCommittedBacklogItem = this.getAllNotYetCommittedBacklogItem.bind(this);
        this.submitCommittedBacklogItem = this.submitCommittedBacklogItem.bind(this);
    }

    handleShow(){
        this.setState({show : true});
        this.getAllNotYetCommittedBacklogItem();
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

      getAllNotYetCommittedBacklogItem(){
        let self =this;
        axios.get(Config.back_end_host + Config.ezScrum_api + '/products/' + this.props.selectedProduct.productId + '/not_yet_committed_backlog_items')
        .then(function (response) {
            let notYetCommittedBacklogItemList = response.data.notYetCommittedBacklogItemList;
            self.setState({data : notYetCommittedBacklogItemList});
        })
        .catch(function (error){
            console.log(error);
            window.location.href = Config.front_end_host;
        });
    }

    submitCommittedBacklogItem(){
        if(this.state.selectedBacklogItemIds.length === 0){
            alert("Please choose backlog item.");
            return;
        }
        let self = this;
        axios.post(Config.back_end_host + Config.ezScrum_api + '/sprints/' + this.props.selectedSprintId + '/committed_backlog_items',{
            backlogItemIds : this.state.selectedBacklogItemIds
            }).then(function (response) {
                let commitSuccess = response.data.commitSuccess;
                let errorMessage = response.data.errorMessage;
                if(commitSuccess === false){
                    alert(errorMessage);
                    return;
                }
                self.handleClose();
                self.props.getAllCommittedBacklogItem(self.props.selectedSprintId);
                self.getAllNotYetCommittedBacklogItem();
            }).catch(function (error){
                console.log(error);
                window.location.href = Config.front_end_host;
            });
    }

    render(){
        return (
            <div>
                <Button className="Function_Button" bsStyle="link" bsSize="small" onClick={this.handleShow} disabled={this.props.disabled}>
                    <img src="../add.gif" alt="Commit Backlog Item"/>Commit Backlog Item
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Commit Backlog Item</Modal.Title>
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
                        <Button onClick={this.submitCommittedBacklogItem}>Submit</Button>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default CommitBacklogItem;