import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import Config from '../config.js';

// Import React Table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

class ViewTaskHistory extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show : false,
            taskHistoryList : []
        };

        this.options = {
            sortIndicator: true,
            noDataText: 'No data'
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getTaskHistories = this.getTaskHistories.bind(this);
    }

    handleShow(){
        this.setState({show : true});
        this.getTaskHistories();
    }

    handleClose(){
        this.setState({show : false});
    }

    getTaskHistories(){
        let self =this;
        axios.get(Config.back_end_host + Config.ezScrum_api + '/tasks/' + this.props.task.taskId + '/histories')
        .then(function (response) {
            let taskHistoryList = response.data.taskHistoryList;
            self.setState({taskHistoryList : taskHistoryList});
        })
        .catch(function (error){
            console.log(error);
            window.location.href = Config.front_end_host;
        });
    }

    render(){
        return (
            <div>
                <Button bsStyle="link" bsSize="xsmall" onClick={this.handleShow}>
                    <img src="../history.png" alt="Task Histories"/>
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Task History List</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <BootstrapTable data={this.state.taskHistoryList} options={this.options} bordered={true} pagination={true} striped hover condensed>
                            <TableHeaderColumn dataField="historyId" isKey hidden>Id</TableHeaderColumn>

                            <TableHeaderColumn 
                                dataField="occurredOn"
                                width="25%"
                                dataSort={false}
                                columnTitle
                            >
                                Modified Date
                            </TableHeaderColumn>

                            <TableHeaderColumn 
                                dataField="behavior"
                                width="25%"
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

export default ViewTaskHistory;