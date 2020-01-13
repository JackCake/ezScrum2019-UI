import React from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';

class DropBacklogItem extends React.Component{
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
        let isSprintOverdue = this.props.isSprintOverdue;
        let confirmDrop = true;
        if(isSprintOverdue === true){
            confirmDrop = window.confirm("The sprint is overdue, are you sure to drop the backlog item?");
        }
        if(confirmDrop === true){
            this.setState({
                show : true,
                backlogItemId : this.props.backlogItem.backlogItemId
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
        axios.delete('http://localhost:8080/ezScrum/sprints/' + this.props.selectedSprintId + '/committed_backlog_items/' + this.state.backlogItemId)
        .then(function (response) {
            let dropSuccess = response.data.dropSuccess;
            let errorMessage = response.data.errorMessage;
            if(dropSuccess === false){
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
                    <img src="../drop.png" alt="Drop Backlog Item"/>
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Drop Backlog Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            Do you want to drop backlog item?
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
export default DropBacklogItem;