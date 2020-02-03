import React from 'react';
import axios from 'axios';
import { Button, Modal, Form, FormControl, FormGroup, Col, ControlLabel } from 'react-bootstrap';
import Config from '../config.js';

class EditRetrospective extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show : false,
            sprintId : '',
            retrospectiveDiscussion : '',
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.retrospectiveDiscussionOnChange = this.retrospectiveDiscussionOnChange.bind(this);
        this.submitRetrospective = this.submitRetrospective.bind(this);
    }

    handleShow(){
        if(this.props.selectedRetrospective === undefined){
            return;
        }
        this.setState({
            show : true,
            sprintId : this.props.selectedRetrospective.sprintId,
            retrospectiveDiscussion : this.props.selectedRetrospective.retrospectiveDiscussion
        });
    }

    handleClose(){
        this.setState({
            show : false,
            sprintId : '',
            retrospectiveDiscussion : ''
        });
    }

    retrospectiveDiscussionOnChange(e){
        this.setState({retrospectiveDiscussion: e.target.value});
    }

    submitRetrospective(){
        let self = this;
        axios.put(Config.back_end_host + Config.ezScrum_api + '/sprint_retrospectives/' + this.state.sprintId,{
            retrospective : this.state.retrospectiveDiscussion,
        }).then(function (response) {
            let editSuccess = response.data.editSuccess;
            let errorMessage = response.data.errorMessage;
            if(editSuccess === false){
                alert(errorMessage);
                return;
            }
            self.handleClose();
            self.props.getAllRetrospective();
        }).catch(function (error){
            console.log(error);
            window.location.href = Config.front_end_host;
        });
    }

    render(){
        return (
            <div>
                <Button className="Function_Button" bsStyle="link" bsSize="small" onClick={this.handleShow}>
                    <img src="../edit.png" alt="Edit Retrospective"/>Edit Retrospective
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Retrospective</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    *Discussion:
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="textarea" maxLength="255" placeholder="input retrospective discussion..." onInput={this.retrospectiveDiscussionOnChange} defaultValue={this.state.retrospectiveDiscussion}/>
                                </Col>
                            </FormGroup>
                            
                            <Col componentClass={ControlLabel}>
                                (Note: * denotes a required field)
                            </Col>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.submitRetrospective}>Submit</Button>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default EditRetrospective;