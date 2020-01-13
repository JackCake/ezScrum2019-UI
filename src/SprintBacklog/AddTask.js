import React from 'react';
import axios from 'axios';
import { Button, Modal, Form, FormControl, FormGroup, Col, ControlLabel } from 'react-bootstrap';

class AddTask extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show : false,
            description : '',
            estimate : '',
            notes : ''           
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.descriptionOnChange = this.descriptionOnChange.bind(this);
        this.estimateOnChange = this.estimateOnChange.bind(this);
        this.notesOnChange = this.notesOnChange.bind(this);
        this.submitTask = this.submitTask.bind(this);
    }

    handleShow(){
        this.setState({show : true});
    }

    handleClose(){
        this.setState({
            show : false,
            description : '',
            estimate : '',
            notes : ''
        });
    }

    descriptionOnChange(e){
        this.setState({description: e.target.value});
    }

    estimateOnChange(e){
        const estimate = (e.target.validity.valid) ? e.target.value : this.state.estimate;

        this.setState({estimate});
    }

    notesOnChange(e){
        this.setState({notes : e.target.value});
    }

    submitTask(){
        if(this.state.description === ''){
            alert('The description is required.');
            return;
        }
        let self = this;
        axios.post('http://localhost:8080/ezScrum/committed_backlog_items/' + this.props.backlogItem.backlogItemId + '/tasks',{
            description : this.state.description,
            estimate : this.state.estimate === '' ? 0 : this.state.estimate,
            notes : this.state.notes
        }).then(function (response) {
            self.handleClose();
            self.props.getAllCommittedBacklogItem(self.props.selectedSprintId);
        }).catch(function (error){
            console.log(error);
        });
    }

    render(){
        return (
            <div>
                <Button bsStyle="link" bsSize="xsmall" onClick={this.handleShow} disabled={this.props.isSprintOverdue || this.props.backlogItem.status === "Done"}>
                    <img src="../add.png" alt="Add Task"/>
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    *Description:
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="textarea" placeholder="input task description..." onInput={this.descriptionOnChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Estimate:
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="input" type="text" maxLength="2" pattern="[0-9]*" onInput={this.estimateOnChange} value={this.state.estimate} />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Notes:
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="textarea" placeholder="input task notes..." onInput={this.notesOnChange} />
                                </Col>
                            </FormGroup>
                            <Col componentClass={ControlLabel}>
                                (Note: * denotes a required field)
                            </Col>
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

export default AddTask;