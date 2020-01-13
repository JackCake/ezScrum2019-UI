import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

// Import React Table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

class ViewBacklogItemHistory extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show : false,
            backlogItemHistoryList : []
        };

        this.options = {
            sortIndicator: true,
            noDataText: 'No data'
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getBacklogItemHistories = this.getBacklogItemHistories.bind(this);
    }

    handleShow(){
        this.setState({show : true});
        this.getBacklogItemHistories();
    }

    handleClose(){
        this.setState({show : false});
    }

    getBacklogItemHistories(){
        let self =this;
        axios.get('http://localhost:8080/ezScrum/backlog_items/' + this.props.backlogItem.backlogItemId + '/histories')
        .then(function (response) {
            let backlogItemHistoryList = response.data.backlogItemHistoryList;
            self.setState({backlogItemHistoryList : backlogItemHistoryList});
        })
        .catch(function (error){
            console.log(error);
        });
    }

    render(){
        return (
            <div>
                <Button bsStyle="link" bsSize="xsmall" onClick={this.handleShow}>
                    <img src="../history.png" alt="Backlog Item Histories"/>
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Backlog Item History List</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <BootstrapTable data={this.state.backlogItemHistoryList} options={this.options} bordered={true} pagination={true} striped hover condensed>
                            <TableHeaderColumn dataField="historyId" isKey hidden>Id</TableHeaderColumn>

                            <TableHeaderColumn 
                                dataField="occurredOn"
                                width="30%"
                                dataSort={false}
                                columnTitle
                            >
                                Modified Date
                            </TableHeaderColumn>

                            <TableHeaderColumn 
                                dataField="behavior"
                                width="20%"
                                dataSort={false}
                                columnTitle
                            >
                                Behavior
                            </TableHeaderColumn>  


                            <TableHeaderColumn 
                                dataField="description"
                                width="50%"
                                dataSort={false}
                                columnTitle
                            >
                                Description
                            </TableHeaderColumn>
                        </BootstrapTable>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ViewBacklogItemHistory;