import React from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import Config from '../config.js';

class UnscheduleBacklogItem extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show : false,
            backlogItemId: ''
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.submitBacklogItem = this.submitBacklogItem.bind(this);
    }
    handleShow(){
        if(this.props.selectedScheduledBacklogItem === undefined){
            return;
        }
        let isReleaseOverdue = this.props.isReleaseOverdue;
        let confirmUnschedule = true;
        if(isReleaseOverdue === true){
            confirmUnschedule = window.confirm("The release is overdue, are you sure to unschedule the backlog item?");
        }
        if(confirmUnschedule === true){
            this.setState({
                show : true,
                backlogItemId : this.props.selectedScheduledBacklogItem.backlogItemId
            });
        }
    }

    handleClose(){
        this.setState({
            show : false,
            backlogItemId : ''
        });
    }

    submitBacklogItem(){
        let self = this;
        axios.delete(Config.back_end_host + Config.ezScrum_api + '/releases/' + this.props.selectedRelease.releaseId + '/scheduled_backlog_items/' + this.state.backlogItemId)
        .then(function (response) {
            let unscheduleSuccess = response.data.unscheduleSuccess;
            let errorMessage = response.data.errorMessage;
            if(unscheduleSuccess === false){
                alert(errorMessage);
                return;
            }
            self.handleClose();
            self.props.getAllScheduledBacklogItem(self.props.selectedRelease.releaseId);
        }).catch(function (error){
            console.log(error);
            window.location.href = Config.front_end_host;
        });
    }

    render(){
        return (
            <div>
                <Button className="Function_Button" bsStyle="link" bsSize="small" onClick={this.handleShow}>
                    <img src="../drop.png" alt="Unschedule Backlog Item"/>Unschedule Backlog Item
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Unschedule Backlog Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            Do you want to unschedule backlog item?
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
export default UnscheduleBacklogItem;