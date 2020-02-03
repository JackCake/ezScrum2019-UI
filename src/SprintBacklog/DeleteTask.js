import React from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import Config from '../config.js';

class DeleteTask extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show : false,
            taskId: ''
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.submitTask = this.submitTask.bind(this);
    }
    handleShow(){
        let isSprintOverdue = this.props.isSprintOverdue;
        let confirmDelete = true;
        if(isSprintOverdue === true){
            confirmDelete = window.confirm("The sprint is overdue, are you sure to delete the task?");
        }
        if(confirmDelete === true){
            this.setState({
                show : true,
                taskId : this.props.task.taskId
            });
        }
    }

    handleClose(){
        this.setState({
            show : false,
            taskId : ''
        });
    }

    submitTask(){
        let self = this;
        axios.delete(Config.back_end_host + Config.ezScrum_api + '/tasks/' + this.state.taskId)
        .then(function (response) {
            let deleteSuccess = response.data.deleteSuccess;
            let errorMessage = response.data.errorMessage;
            if(deleteSuccess === false){
                alert(errorMessage);
                return;
            }
            self.handleClose();
            self.props.getAllCommittedBacklogItem(self.props.selectedSprintId);
        }).catch(function (error){
            console.log(error);
            window.location.href = Config.front_end_host;
        });
    }

    render(){
        return (
            <div>
                <Button bsStyle="link" bsSize="xsmall" onClick={this.handleShow}>
                    <img src="../delete.png" alt="Delete Task"/>
                </Button>
                
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            Do you want to delete task?
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.submitTask}>Submit</Button>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default DeleteTask;