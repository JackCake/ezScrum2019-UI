import React from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import Config from '../config.js';

class DeleteProduct extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show : false,
            productId: ''
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.submitProduct = this.submitProduct.bind(this);
    }
    handleShow(){
        if(this.props.selectedProduct === undefined){
            return;
        }
        this.setState({
            show : true,
            productId : this.props.selectedProduct.productId
        });
    }

    handleClose(){
        this.setState({
            show : false,
            productId : ''
        });
    }

    submitProduct(){
        let self = this;
        axios.delete(Config.back_end_host + Config.ezScrum_api + '/products/' + this.state.productId)
        .then(function (response) {
            let deleteSuccess = response.data.deleteSuccess;
            let errorMessage = response.data.errorMessage;
            if(deleteSuccess === false){
                alert(errorMessage);
                return;
            }
            self.handleClose();
            self.props.getProductsByUserId();
        }).catch(function (error){
            console.log(error);
            window.location.href = Config.front_end_host;
        });
    }

    render(){
        return (
            <div>
                <Button className="Function_Button" bsStyle="link" bsSize="small" onClick={this.handleShow}>
                    <img src="../delete.png" alt="Delete Product"/>Delete Product
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            Do you want to delete product?
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.submitProduct}>Submit</Button>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default DeleteProduct;