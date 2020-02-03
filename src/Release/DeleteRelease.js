import React from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import Config from '../config.js';

class DeleteRelease extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show : false,
            releaseId: ''
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.submitRelease = this.submitRelease.bind(this);
    }
    handleShow(){
        if(this.props.selectedRelease === undefined){
            return;
        }
        let isReleaseOverdue = this.props.selectedRelease.releaseOverdue;
        let confirmDelete = true;
        if(isReleaseOverdue === true){
            confirmDelete = window.confirm("The release is overdue, are you sure to delete it?");
        }
        if(confirmDelete === true){
            this.setState({
                show : true,
                releaseId : this.props.selectedRelease.releaseId
            });
        }
    }

    handleClose(){
        this.setState({
            show : false,
            releaseId : ''
        });
    }

    submitRelease(){
        let self = this;
        axios.delete(Config.back_end_host + Config.ezScrum_api + '/releases/' + this.state.releaseId)
        .then(function (response) {
            let deleteSuccess = response.data.deleteSuccess;
            let errorMessage = response.data.errorMessage;
            if(deleteSuccess === false){
                alert(errorMessage);
                return;
            }
            self.handleClose();
            self.props.getAllRelease();
            self.props.clearAllScheduledBacklogItemAfterDeleteRelease();
        }).catch(function (error){
            console.log(error);
            window.location.href = Config.front_end_host;
        });
    }

    render(){
        return (
            <div>
                <Button className="Function_Button" bsStyle="link" bsSize="small" onClick={this.handleShow}>
                    <img src="../delete.png" alt="Delete Release"/>Delete Release
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Release</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            Do you want to delete release?
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.submitRelease}>Submit</Button>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default DeleteRelease;