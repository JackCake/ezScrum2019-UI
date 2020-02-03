import React from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import Config from '../config.js';

class RemoveBacklogItemAttachFile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show : false
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.submitAttachFile = this.submitAttachFile.bind(this);
    }
    handleShow(){
        this.setState({
            show : true
        });
    }

    handleClose(){
        this.setState({
            show : false
        });
    }

    submitAttachFile(){
        let self = this;
        axios.delete(Config.back_end_host + Config.ezScrum_api + '/backlog_item_attach_files/' + this.props.attachFile.backlogItemAttachFileId)
        .then(function (response) {
            let removeSuccess = response.data.removeSuccess;
            let errorMessage = response.data.errorMessage;
            if(removeSuccess === false){
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
            <span>
                <Button bsStyle="link" bsSize="xsmall" onClick={this.handleShow}>
                    <img src="../delete.png" alt="Delete Attach File"/>
                </Button>
                
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Attach File Of Backlog Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            Do you want to delete {this.props.attachFile.name}?
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.submitAttachFile}>Submit</Button>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </span>
        );
    }
}
export default RemoveBacklogItemAttachFile;