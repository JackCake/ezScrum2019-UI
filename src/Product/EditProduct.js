import React from 'react';
import axios from 'axios';
import { Button, Modal, Form, FormControl, FormGroup, Col, ControlLabel } from 'react-bootstrap';

class EditProduct extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show : false,
            productId: '',
            name: ''
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.nameOnChange = this.nameOnChange.bind(this);
        this.submitProduct = this.submitProduct.bind(this);
    }

    handleShow(){
        if(this.props.selectedProduct === undefined){
            return;
        }
        this.setState({
            show : true,
            productId : this.props.selectedProduct.productId,
            name : this.props.selectedProduct.name
        });
    }

    handleClose(){
        this.setState({
            show : false,
            productId : '',
            name : ''
        });
    }

    nameOnChange(e){
        this.setState({name: e.target.value});
    }

    submitProduct(){
        if(this.state.name === ''){
            alert('The name is required.');
            return;
        }
        let self = this;
        axios.put('http://localhost:8080/ezScrum/products/' + this.state.productId, {
            name : this.state.name, 
            userId : '1'
        }).then(function (response) {
            let editSuccess = response.data.editSuccess;
            let errorMessage = response.data.errorMessage;
            if(editSuccess === false){
                alert(errorMessage);
            }
            self.handleClose();
            self.props.getProductsByUserId()
        }).catch(function (error){
            console.log(error);
        });
        
    }

    render(){
        return (
            <div>
                <Button className="Function_Button" bsStyle="link" bsSize="small" onClick={this.handleShow}>
                    <img src="../edit.png" alt="Edit Product"/>Edit Product
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    *Name:
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="textarea" type="text" placeholder="input product name..." onInput={this.nameOnChange} defaultValue={this.state.name}/>
                                </Col>
                            </FormGroup>
                            <Col componentClass={ControlLabel}>
                                (Note: * denotes a required field)
                            </Col>
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
export default EditProduct;