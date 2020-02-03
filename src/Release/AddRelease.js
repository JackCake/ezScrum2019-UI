import React from 'react';
import axios from 'axios';
import { Button, Modal, Form, FormControl, FormGroup, Col, ControlLabel } from 'react-bootstrap';
import Config from '../config.js';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class AddRelease extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show : false,
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
        this.setState({show : true});
    }

    handleClose(){
        this.setState({
            show : false,
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
        let startDate = moment(this.state.startDate).format('YYYY-MM-DD');
        let endDate = moment(this.state.endDate).format('YYYY-MM-DD');
        if(this.state.startDate === undefined || moment(startDate, 'YYYY-MM-DD', true).isValid() === false){
            alert('The format of the start date is not correct.');
            return;
        }
        if(this.state.endDate === undefined || moment(endDate, 'YYYY-MM-DD', true).isValid() === false){
            alert('The format of the end date is not correct.');
            return;
        }
        if(this.state.description === ''){
            alert('The description is required.');
            return;
        }
        let self = this;
        axios.post(Config.back_end_host + Config.ezScrum_api + '/products/' + this.props.selectedProduct.productId + '/releases',{
            name : self.state.name,
            startDate : startDate,
            endDate : endDate,
            description : self.state.description
        }).then(function (response) {
            let addSuccess = response.data.addSuccess;
            let errorMessage = response.data.errorMessage;
            if(addSuccess === false){
                alert(errorMessage);
                return;
            }else{
                self.handleClose();
                self.props.getAllRelease();
            }
        }).catch(function (error){
            console.log(error);
            window.location.href = Config.front_end_host;
        });
    }

    render(){
        return (
            <div>
                <Button className="Function_Button" bsStyle="link" bsSize="small" onClick={this.handleShow}>
                    <img src="../add.png" alt="Add Release"/>Add Release
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Release</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    *Name:
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="input" maxLength="50" placeholder="input release name..." onInput={this.nameOnChange}/>
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
                                    <FormControl componentClass="textarea" maxLength="255" placeholder="input description..." onInput={this.descriptionOnChange}/>
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

export default AddRelease;