import React from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import Config from '../config.js';

class DeleteBacklogItem extends React.Component{
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
        let confirmDelete = true;
        if(isReleaseOverdue === true){
            confirmDelete = window.confirm("The release is overdue, are you sure to delete the story?");
        }
        if(confirmDelete === true){
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
        axios.delete(Config.back_end_host + Config.ezScrum_api + '/products/' + this.props.selectedProduct.productId + '/backlog_items/' + this.state.backlogItemId)
        .then(function (response) {
            let deleteSuccess = response.data.deleteSuccess;
            let errorMessage = response.data.errorMessage;
            if(deleteSuccess === false){
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
                    <img src="../delete.png" alt="Delete Backlog Item"/>Delete Backlog Item
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Backlog Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            Do you want to delete backlog item?
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
export default DeleteBacklogItem;