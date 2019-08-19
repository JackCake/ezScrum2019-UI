import React from 'react';
import axios from 'axios';
import { Button, Modal, Form, FormControl, FormGroup, Col, ControlLabel } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class EditSprint extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show : false,
            sprintId: '',
            goal: '',
            interval: '',
            startDate: moment(),
            endDate: undefined,
            demoDate: undefined,
            demoPlace: '',
            daily: ''
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.goalOnChange = this.goalOnChange.bind(this);
        this.intervalOnChange = this.intervalOnChange.bind(this);
        this.startDateOnChange = this.startDateOnChange.bind(this);
        this.calculateEndDate = this.calculateEndDate.bind(this);
        this.endDateOnChange = this.endDateOnChange.bind(this);
        this.demoDateOnChange = this.demoDateOnChange.bind(this);
        this.demoPlaceOnChange = this.demoPlaceOnChange.bind(this);
        this.dailyOnChange = this.dailyOnChange.bind(this);
        this.submitSprint = this.submitSprint.bind(this);
    }

    handleShow(){
        if(this.props.selectedSprint === undefined){
            return;
        }
        let isSprintOverdue = this.props.selectedSprint.sprintOverdue;
        let confirmEdit = true;
        if(isSprintOverdue === true){
            confirmEdit = window.confirm("The sprint is overdue, are you sure to edit it?");
        }
        if(confirmEdit === true){
            this.setState({
                show : true,
                sprintId: this.props.selectedSprint.sprintId,
                goal: this.props.selectedSprint.goal,
                interval: this.props.selectedSprint.interval,
                startDate: moment(this.props.selectedSprint.startDate),
                endDate: moment(this.props.selectedSprint.endDate),
                demoDate: moment(this.props.selectedSprint.demoDate),
                demoPlace: this.props.selectedSprint.demoPlace,
                daily: this.props.selectedSprint.daily
            });
        }
    }

    handleClose(){
        this.setState({
            show : false,
            sprintId: '',
            goal: '',
            interval: '',
            startDate: moment(),
            endDate: undefined,
            demoDate: undefined,
            demoPlace: '',
            daily: ''
        });
    }

    goalOnChange(e){
        this.setState({goal: e.target.value});
    }

    intervalOnChange(e){
        const interval = (e.target.validity.valid) ? e.target.value : this.state.interval;

        this.calculateEndDate(this.state.startDate, interval);

        this.setState({interval});
    }

    startDateOnChange = startDate => {
        this.setState({startDate});

        this.calculateEndDate(startDate, this.state.interval);
    }

    calculateEndDate(startDate, interval){
        let isFormatOfStartDateCorrect = moment(startDate, 'YYYY-MM-DD', true).isValid();
        if(interval !== '' && interval !=='0' && isFormatOfStartDateCorrect === true){
            let endDate = moment(startDate).add(7 * interval - 1, 'Day');
            this.setState({
                endDate: endDate,
                demoDate: endDate
            });
        }
    }

    endDateOnChange = endDate => this.setState({endDate});

    demoDateOnChange = demoDate => this.setState({demoDate});

    demoPlaceOnChange(e){
        this.setState({demoPlace : e.target.value});
    }

    dailyOnChange(e){
        this.setState({daily: e.target.value});
    }

    submitSprint(){
        if(this.state.goal === ''){
            alert('The goal is required.');
            return;
        }
        if(this.state.interval === ''){
            alert('The interval is required.');
            return;
        }
        if(this.state.interval === '0'){
            alert('The interval of the sprint should not be zero.');
            return;
        }
        let startDate = moment(this.state.startDate).format('YYYY-MM-DD');
        let endDate = moment(this.state.endDate).format('YYYY-MM-DD');
        let demoDate = moment(this.state.demoDate).format('YYYY-MM-DD');
        if(moment(startDate, 'YYYY-MM-DD', true).isValid() === false){
            alert('The format of the start date is not correct.');
            return;
        }
        if(moment(endDate, 'YYYY-MM-DD', true).isValid() === false){
            alert('The format of the end date is not correct.');
            return;
        }
        if(moment(demoDate, 'YYYY-MM-DD', true).isValid() === false){
            alert('The format of the demo date is not correct.');
            return;
        }
        let self = this;
        axios.put('http://localhost:8080/ezScrum/sprints/' + this.state.sprintId, {
            goal : this.state.goal,
            interval : this.state.interval === '' ? 0 : this.state.interval,
            startDate : startDate,
            endDate : endDate,
            demoDate : demoDate,
            demoPlace : this.state.demoPlace,
            daily : this.state.daily
        }).then(function (response) {
            let editSuccess = response.data.editSuccess;
            let isSprintOverlap = response.data.overlap;
            let errorMessage = response.data.errorMessage;
            if(editSuccess === false){
                if(isSprintOverlap === true){
                    alert(errorMessage);
                }
                else{
                    alert(errorMessage);
                    self.handleClose();
                    self.props.getAllSprint();
                }
            }else{
                self.handleClose();
                self.props.getAllSprint();
            }
            
        }).catch(function (error){
            console.log(error);
        });
    }

    render(){
        return (
            <div>
                <Button className="Function_Button" bsStyle="link" bsSize="small" onClick={this.handleShow}>
                    <img src="../edit.png" alt="Edit Sprint"/>Edit Sprint
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Sprint</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    *Goal:
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="textarea" placeholder="input sprint goal..." onInput={this.goalOnChange} defaultValue={this.state.goal}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    *Interval:
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="input" type="text" maxLength="2" pattern="[0-9]*" onInput={this.intervalOnChange} defaultValue={this.state.interval} />
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
                                    Demo Place:
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="input" placeholder="input demo place..." onInput={this.demoPlaceOnChange} defaultValue={this.state.demoPlace}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    *Demo Date:
                                </Col>
                                <Col sm={10}>
                                    <DatePicker selected={this.state.demoDate} dateFormat="YYYY/MM/DD" onChange={this.demoDateOnChange} 
                                    minDate={this.state.startDate} todayButton={"Today"} showYearDropdown scrollableYearDropdown yearDropdownItemNumber={10}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Time and Place for Daily Scrum:
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="input" placeholder="input daily time and daily place..." onInput={this.dailyOnChange} defaultValue={this.state.daily}/>
                                </Col>
                            </FormGroup>
                            <Col componentClass={ControlLabel}>
                                (Note: * denotes a required field)
                            </Col>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.submitSprint}>Submit</Button>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default EditSprint;