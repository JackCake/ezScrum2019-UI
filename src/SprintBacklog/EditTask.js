import React from 'react';
import axios from 'axios';
import { Button, Modal, Form, FormControl, FormGroup, Col, ControlLabel } from 'react-bootstrap';

class EditTask extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show : false,
            taskId : '',
            description : '',
            estimate: '',
            remains : '',
            notes: ''           
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.descriptionOnChange = this.descriptionOnChange.bind(this);
        this.estimateOnChange = this.estimateOnChange.bind(this);
        this.remainsOnChange = this.remainsOnChange.bind(this);
        this.notesOnChange = this.notesOnChange.bind(this);
        this.submitTask = this.submitTask.bind(this);
    }

    handleShow(){
        let isSprintOverdue = this.props.isSprintOverdue;
        let confirmEdit = true;
        if(isSprintOverdue === true){
            confirmEdit = window.confirm("The sprint is overdue, are you sure to edit the task?");
        }
        if(confirmEdit === true){
            this.setState({
                show : true,
                taskId : this.props.taskId,
                description : this.props.description,
                estimate : this.props.estimate,
                remains : this.props.remains,
                notes : this.props.notes
            });
        }
    }

    handleClose(){
        this.setState({
            show : false,
            taskId : '',
            description : '',
            estimate : '',
            remains : '',
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

    remainsOnChange(e){
        const remains = (e.target.validity.valid) ? e.target.value : this.state.remains;

        this.setState({remains});
    }

    notesOnChange(e){
        this.setState({notes : e.target.value});
    }

    submitTask(){
        if(this.state.description === ''){
            alert('The description is required.');
            return;
        }
        let estimate = this.state.estimate === '' ? 0 : this.state.estimate;
        let remains = 0;
        if(this.props.status === "To do"){
            remains = estimate;
        } else if(this.state.remains){
            remains = this.state.remains;
        }
        let self = this;
        axios.put('http://localhost:8080/ezScrum/tasks/' + this.state.taskId, {
            description : this.state.description,
            estimate : estimate,
            remains : remains,
            notes : this.state.notes
        }).then(function (response) {
            let editSuccess = response.data.editSuccess;
            let errorMessage = response.data.errorMessage;
            if(editSuccess === false){
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
            <div>
                <Button bsStyle="link" bsSize="xsmall" onClick={this.handleShow}>
                    <img src="../edit.png" alt="Edit Task"/>
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    *Description:
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="textarea" placeholder="input task description..." onInput={this.descriptionOnChange} defaultValue={this.state.description}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Estimate:
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="input" type="text" maxLength="2" pattern="[0-9]*" onInput={this.estimateOnChange} defaultValue={this.state.estimate} />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Remains:
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="input" type="text" maxLength="2" pattern="[0-9]*" onInput={this.remainsOnChange} defaultValue={this.state.remains} disabled={this.props.status !== "Doing"}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Notes:
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="textarea" placeholder="input task notes..." onInput={this.notesOnChange} defaultValue={this.state.notes}/>
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

export default EditTask;