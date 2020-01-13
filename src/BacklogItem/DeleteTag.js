import React from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';

class DeleteTag extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show : false,
            tagId: ''
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.submitTag = this.submitTag.bind(this);
    }
    handleShow(){
        if(this.props.selectedTag === undefined){
            return;
        }
        this.setState({
            show : true,
            tagId : this.props.selectedTag.tagId
        });
    }

    handleClose(){
        this.setState({
            show : false,
            tagId : ''
        });
    }

    submitTag(){
        let self = this;
        axios.delete('http://localhost:8080/ezScrum/tags/' + this.state.tagId)
        .then(function (response) {
            let deleteSuccess = response.data.deleteSuccess;
            let errorMessage = response.data.errorMessage;
            if(deleteSuccess === false){
                alert(errorMessage);
            }
            self.handleClose();
            self.props.getAllTag();
        }).catch(function (error){
            console.log(error);
        });
    }

    render(){
        return (
            <div>
                <Button className="Function_Button" bsStyle="link" bsSize="small" onClick={this.handleShow}>
                    <img src="../delete.png" alt="Delete Tag"/>Delete Tag
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Tag</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            Do you want to delete tag?
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.submitTag}>Submit</Button>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default DeleteTag;