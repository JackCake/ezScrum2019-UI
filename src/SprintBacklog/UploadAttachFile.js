import React from 'react';
import axios from 'axios';
import { Button, Modal, Form, FormControl, FormGroup, Col, ControlLabel } from 'react-bootstrap';

class UploadAttachFile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show : false,
            attachFile : undefined
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.attachFileOnChange = this.attachFileOnChange.bind(this);
        this.submitAttachFile = this.submitAttachFile.bind(this);
    }

    handleShow(){
        this.setState({show : true});
    }

    handleClose(){
        this.setState({
            show : false,
            attachFile : undefined
        });
    }

    attachFileOnChange(e){
        this.setState({attachFile : e.target.files[0]});
    }

    submitAttachFile(){
        if(this.state.attachFile === undefined){
            alert('The file must be choose.');
            return;
        }
        let self = this;
        const formData = new FormData();
        formData.append('attach_file', this.state.attachFile);
        let cardType = '';
        let attachFileType = '';
        if(this.props.cardType === 'Backlog Item'){
            cardType = 'committed_backlog_item';
            attachFileType = 'backlog_item';
        } else if(this.props.cardType === 'Task'){
            cardType = 'task';
            attachFileType = 'task';
        }
        axios.post('http://localhost:8080/ezScrum/' + cardType + 's/' + this.props.id + '/' + attachFileType + '_attach_files', formData)
        .then(function (response) {
            let uploadSuccess = response.data.uploadSuccess;
            let errorMessage = response.data.errorMessage;
            if(uploadSuccess === false){
                alert(errorMessage);
                return;
            }
            self.handleClose();
            self.props.getAllCommittedBacklogItem(self.props.selectedSprintId);
        }).catch(function (error){
            console.log(error);
        });
    }

    render(){
        return (
            <div>
                <Button bsStyle="link" bsSize="xsmall" onClick={this.handleShow}>
                    <img src="../add.png" alt="Upload Attach File"/>
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload Attach File To {this.props.cardType}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    *Attach File:
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="input" type="file" placeholder="choose attach file..." onInput={this.attachFileOnChange}/>
                                </Col>
                            </FormGroup>
                            <Col componentClass={ControlLabel}>
                                (Note: * denotes a required field)
                            </Col>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.submitAttachFile}>Submit</Button>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default UploadAttachFile;