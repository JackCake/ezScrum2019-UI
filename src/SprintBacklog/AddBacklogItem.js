import React from 'react';
import axios from 'axios';
import { Button, Modal, Form, FormControl, FormGroup, Col, ControlLabel } from 'react-bootstrap';

class AddBacklogItem extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show : false,
            description: '',
            estimate: '',
            importance: '',
            notes: ''
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.descriptionOnChange = this.descriptionOnChange.bind(this);
        this.estimateOnChange = this.estimateOnChange.bind(this);
        this.importanceOnChange = this.importanceOnChange.bind(this);
        this.notesOnChange = this.notesOnChange.bind(this);
        this.submitBacklogItem = this.submitBacklogItem.bind(this);
    }

    handleShow(){
        this.setState({show : true});
    }

    handleClose(){
        this.setState({
            show : false,
            description : '',
            estimate : '',
            importance : '',
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

    importanceOnChange(e){
        const importance = (e.target.validity.valid) ? e.target.value : this.state.importance;

        this.setState({importance});
    }

    notesOnChange(e){
        this.setState({notes : e.target.value});
    }

    submitBacklogItem(){
        if(this.state.description === ''){
            alert('The description is required.');
            return;
        }
        let self = this;
        axios.post('http://localhost:8080/ezScrum/products/' + this.props.selectedProduct.productId + '/backlog_items',{
            description : this.state.description,
            estimate : this.state.estimate === '' ? 0 : this.state.estimate,
            importance : this.state.importance === '' ? 0 : this.state.importance,
            notes : this.state.notes
        }).then(function (response) {
            let addSuccess = response.data.addSuccess;
            let errorMessage = response.data.errorMessage;
            if(addSuccess === false){
                alert(errorMessage);
                return;
            }
            axios.post('http://localhost:8080/ezScrum/sprints/' + self.props.selectedSprintId + '/committed_backlog_items',{
                backlogItemIds : [response.data.backlogItemId]
            }).then(function (response) {
                self.props.getAllCommittedBacklogItem(self.props.selectedSprintId);
            }).catch(function (error){
                console.log(error);
            });
            self.handleClose();
        }).catch(function (error){
            console.log(error);
        });
    }

    render(){
        return (
            <div>
                <Button className="Function_Button" bsStyle="link" bsSize="small" onClick={this.handleShow} disabled={this.props.disabled}>
                    <img src="../add.png" alt="Add Backlog Item"/>Add Backlog Item
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Backlog Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    *Description:
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="textarea" placeholder="input story description..." onInput={this.descriptionOnChange}/>
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
                                    Importance:
                                </Col>
                                <Col sm={10}>
                                     <FormControl componentClass="input" type="text" maxLength="3" pattern="[0-9]*" onInput={this.importanceOnChange} value={this.state.importance} />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Notes:
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="textarea" onInput={this.notesOnChange} />
                                </Col>
                            </FormGroup>
                            <Col componentClass={ControlLabel}>
                                (Note: * denotes a required field)
                            </Col>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.submitBacklogItem}>Submit</Button>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default AddBacklogItem;