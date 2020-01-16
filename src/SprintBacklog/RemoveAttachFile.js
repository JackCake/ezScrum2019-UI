import React from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';

class RemoveAttachFile extends React.Component{
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
        let attachFileType = '';
        let attachFileId = '';
        if(this.props.attachFileType === 'Backlog Item'){
            attachFileType = "backlog_item";
            attachFileId = this.props.attachFile.backlogItemAttachFileId;
        } else if(this.props.attachFileType === 'Task'){
            attachFileType = "task";
            attachFileId = this.props.attachFile.taskAttachFileId;
        }
        let self = this;
        axios.delete('http://localhost:8080/ezScrum/' + attachFileType + '_attach_files/' + attachFileId)
        .then(function (response) {
            let removeSuccess = response.data.removeSuccess;
            let errorMessage = response.data.errorMessage;
            if(removeSuccess === false){
                alert(errorMessage);
            }
            self.handleClose();
            self.props.getAllCommittedBacklogItem(self.props.selectedSprintId);
        }).catch(function (error){
            console.log(error);
        });
    }

    render(){
        return (
            <td>
                <Button bsStyle="link" bsSize="xsmall" onClick={this.handleShow}>
                    <img src="../delete.png" alt="Delete Attach File"/>
                </Button>
                
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Attach File Of {this.props.attachFileType}</Modal.Title>
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
            </td>
        );
    }
}
export default RemoveAttachFile;