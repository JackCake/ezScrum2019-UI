import React from 'react';
import axios from 'axios';
import { Button, Modal, Form, FormControl, FormGroup, Col, ControlLabel } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class EditRelease extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show : false,
            releaseId: '',
            name: '',
            startDate: undefined,
            endDate: undefined,
            description: ''
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.nameOnChange = this.nameOnChange.bind(this);
        this.startDateOnChange = this.startDateOnChange.bind(this);
        this.endDateOnChange = this.endDateOnChange.bind(this);
        this.descriptionOnChange = this.descriptionOnChange.bind(this);
        this.submitRelease = this.submitRelease.bind(this);
    }

    handleShow(){
        if(this.props.selectedRelease === undefined){
            return;
        }
        let isReleaseOverdue = this.props.selectedRelease.releaseOverdue;
        let confirmEdit = true;
        if(isReleaseOverdue === true){
            confirmEdit = window.confirm("The release is overdue, are you sure to edit it?");
        }
        if(confirmEdit === true){
            this.setState({
                show : true,
                releaseId: this.props.selectedRelease.releaseId,
                name: this.props.selectedRelease.name,
                startDate: moment(this.props.selectedRelease.startDate),
                endDate: moment(this.props.selectedRelease.endDate),
                description: this.props.selectedRelease.description
            });
        }
    }

    handleClose(){
        this.setState({
            show : false,
            releaseId: '',
            name: '',
            startDate: undefined,
            endDate: undefined,
            description: ''
        });
    }

    nameOnChange(e){
        this.setState({name: e.target.value});
    }

    startDateOnChange = startDate => this.setState({startDate});

    endDateOnChange = endDate => this.setState({endDate});

    descriptionOnChange(e){
        this.setState({description: e.target.value});
    }

    submitRelease(){
        if(this.state.name === ''){
            alert('The name is required.');
            return;
        }
        if(this.state.startDate === ''){
            alert('The startDate is required.');
            return;
        }
        if(this.state.endDate === ''){
            alert('The endDate is required.');
            return;
        }
        if(this.state.description === ''){
            alert('The description is required.');
            return;
        }
        let startDate = moment(this.state.startDate).format('YYYY-MM-DD');
        let endDate = moment(this.state.endDate).format('YYYY-MM-DD');
        if(moment(startDate, 'YYYY-MM-DD', true).isValid() === false){
            alert('The format of the start date is not correct.');
            return;
        }
        if(moment(endDate, 'YYYY-MM-DD', true).isValid() === false){
            alert('The format of the end date is not correct.');
            return;
        }
        let self = this;
        axios.put('http://localhost:8080/ezScrum/releases/' + this.state.releaseId, {
            name : this.state.name,
            startDate : startDate,
            endDate : endDate,
            description : this.state.description
        }).then(function (response) {
            let editSuccess = response.data.editSuccess;
            let isReleaseOverlap = response.data.overlap;
            let errorMessage = response.data.errorMessage;
            if(editSuccess === false){
                if(isReleaseOverlap === true){
                    alert(errorMessage);
                }
                else{
                    alert(errorMessage);
                    self.handleClose();
                    self.props.getAllRelease();
                }
            }else{
                self.handleClose();
                self.props.getAllRelease();
            }
            
        }).catch(function (error){
            console.log(error);
        });
    }

    render(){
        return (
            <div>
                <Button className="Function_Button" bsStyle="link" bsSize="small" onClick={this.handleShow}>
                    <img src="../edit.png" alt="Edit Release"/>Edit Release
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Release</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    *Name:
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="input" placeholder="input release name..." onInput={this.nameOnChange} defaultValue={this.state.name}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    *Start Date:
                                </Col>
                                <Col sm={10}>
                                    <DatePicker selected={this.state.startDate} dateFormat="YYYY/MM/DD" onChange={this.startDateOnChange} 
                                    todayButton={"Today"} showYearDropdown scrollableYearDropdown yearDropdownItemNumber={10}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    *End Date:
                                </Col>
                                <Col sm={10}>
                                    <DatePicker selected={this.state.endDate} dateFormat="YYYY/MM/DD" onChange={this.endDateOnChange} 
                                    minDate={this.state.startDate} todayButton={"Today"} showYearDropdown scrollableYearDropdown yearDropdownItemNumber={10}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    *Description:
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="textarea" placeholder="input description..." onInput={this.descriptionOnChange} defaultValue={this.state.description}/>
                                </Col>
                            </FormGroup>
                            <Col componentClass={ControlLabel}>
                                (Note: * denotes a required field)
                            </Col>
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

export default EditRelease;