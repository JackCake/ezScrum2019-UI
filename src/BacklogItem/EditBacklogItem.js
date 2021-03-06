import React from 'react';
import axios from 'axios';
import { Button, Modal, Form, FormControl, FormGroup, Col, ControlLabel } from 'react-bootstrap';
import Config from '../config.js';
import AssignTag from './AssignTag';

class EditBacklogItem extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show : false,
            backlogItemId: '',
            description: '',
            estimate: '',
            importance: '',
            notes: '', 
            tags: []
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleRowSelect = this.handleRowSelect.bind(this);
        this.descriptionOnChange = this.descriptionOnChange.bind(this);
        this.estimateOnChange = this.estimateOnChange.bind(this);
        this.importanceOnChange = this.importanceOnChange.bind(this);
        this.notesOnChange = this.notesOnChange.bind(this);
        this.submitBacklogItem = this.submitBacklogItem.bind(this);
    }
    handleShow(){
        if(this.props.selectedBacklogItem === undefined){
            return;
        }
        this.setState({
            show : true,
            backlogItemId : this.props.selectedBacklogItem.backlogItemId,
            description : this.props.selectedBacklogItem.description,
            estimate : this.props.selectedBacklogItem.estimate,
            importance : this.props.selectedBacklogItem.importance,
            notes : this.props.selectedBacklogItem.notes, 
            tags: this.props.selectedBacklogItem.assignedTagList
        });
    }

    handleClose(){
        this.setState({
            show : false,
            backlogItemId : '',
            description : '',
            estimate : '',
            importance : '',
            notes : '', 
            tags: []
        });
    }

    handleRowSelect(row, isSelected) {
        let tags = this.state.tags;
        if (isSelected) {
            tags.push(row);
        } else {
            for(var i = 0; i < tags.length; i++){
                if(tags[i].tagId === row.tagId) {
                    tags.splice(i, 1);
                    break;
                }
            }
        }
        this.setState({tags : tags});
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
        axios.put(Config.back_end_host + Config.ezScrum_api + '/backlog_items/' + this.state.backlogItemId, {
            description : this.state.description,
            estimate : this.state.estimate === '' ? 0 : this.state.estimate,
            importance : this.state.importance === '' ? 0 : this.state.importance,
            notes : this.state.notes
        }).then(function (response) {
            let editSuccess = response.data.editSuccess;
            let errorMessage = response.data.errorMessage;
            if(editSuccess === false){
                alert(errorMessage);
                return;
            }
            axios.post(Config.back_end_host + Config.ezScrum_api + '/backlog_items/' + self.state.backlogItemId + '/assigned_tags',{
                tagIds : self.state.tags.map(tag => tag.tagId)
            }).then(function (response) {
                let assignSuccess = response.data.assignSuccess;
                let errorMessage = response.data.errorMessage;
                if(assignSuccess === false){
                    alert(errorMessage);
                    return;
                }
                self.handleClose();
                self.props.getAllBacklogItem();
            }).catch(function (error){
                console.log(error);
                window.location.href = Config.front_end_host;
            });
        }).catch(function (error){
            console.log(error);
            window.location.href = Config.front_end_host;
        });
        
    }

    render(){
        return (
            <div>
                <Button className="Function_Button" bsStyle="link" bsSize="small" onClick={this.handleShow}>
                    <img src="../edit.png" alt="Edit Backlog Item"/>Edit Backlog Item
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Backlog Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    *Description:
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="textarea" maxLength="255" placeholder="input story description..." onInput={this.descriptionOnChange} defaultValue={this.state.description}/>
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
                                    Importance:
                                </Col>
                                <Col sm={10}>
                                     <FormControl componentClass="input" type="text" maxLength="3" pattern="[0-9]*" onInput={this.importanceOnChange} defaultValue={this.state.importance} />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Notes:
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="textarea" onInput={this.notesOnChange} defaultValue={this.state.notes}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <AssignTag tags={this.state.tags} selectedProduct={this.props.selectedProduct} handleRowSelect={this.handleRowSelect}/>
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
export default EditBacklogItem;