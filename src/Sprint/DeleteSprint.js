import React from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import Config from '../config.js';

class DeleteSprint extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show : false,
            sprintId: ''
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.submitSprint = this.submitSprint.bind(this);
    }
    handleShow(){
        if(this.props.selectedSprint === undefined){
            return;
        }
        let isSprintOverdue = this.props.selectedSprint.sprintOverdue;
        let confirmDelete = true;
        if(isSprintOverdue === true){
            confirmDelete = window.confirm("The sprint is overdue, are you sure to delete it?");
        }
        if(confirmDelete === true){
            this.setState({
                show : true,
                sprintId : this.props.selectedSprint.sprintId
            });
        }
    }

    handleClose(){
        this.setState({
            show : false,
            sprintId : ''
        });
    }

    submitSprint(){
        let self = this;
        axios.delete(Config.back_end_host + Config.ezScrum_api + '/sprints/' + this.state.sprintId)
        .then(function (response) {
            let deleteSuccess = response.data.deleteSuccess;
            let errorMessage = response.data.errorMessage;
            if(deleteSuccess === false){
                alert(errorMessage);
                return;
            }
            self.handleClose();
            self.props.getAllSprint();
        }).catch(function (error){
            console.log(error);
            window.location.href = Config.front_end_host;
        });
    }

    render(){
        return (
            <div>
                <Button className="Function_Button" bsStyle="link" bsSize="small" onClick={this.handleShow}>
                    <img src="../delete.png" alt="Delete Sprint"/>Delete Sprint
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Sprint</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            Do you want to delete sprint?
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.submitSprint}>Submit</Button>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default DeleteSprint;