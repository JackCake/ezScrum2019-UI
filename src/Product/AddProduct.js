import React from 'react';
import axios from 'axios';
import { Button, Modal, Form, FormControl, FormGroup, Col, ControlLabel } from 'react-bootstrap';
import Config from '../config.js';

class AddProduct extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show : false,
            name: ''
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.nameOnChange = this.nameOnChange.bind(this);
        this.submitProduct = this.submitProduct.bind(this);
    }

    handleShow(){
        this.setState({show : true});
    }

    handleClose(){
        this.setState({
            show : false,
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
        if(this.props.productData === undefined){
            alert('Sorry, there is the problem when add the product. Please refresh the page and try again.');
            return;
        }
        if(this.props.productData.some(product => product.name === this.state.name)){
            alert('There is the same name of the product.');
            return;
        }
        let self = this;
        axios.post(Config.back_end_host + Config.ezScrum_api + '/products',{
            name : this.state.name, 
            userId : '1'
        }).then(function (response) {
            let addSuccess = response.data.addSuccess;
            let errorMessage = response.data.errorMessage;
            if(addSuccess === false){
                alert(errorMessage);
                return;
            }else{
                self.handleClose();
                self.props.getProductsByUserId();
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
                    <img src="../add.png" alt="Add Product"/>Add Product
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    *Name:
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="input" type="text" maxLength="50" placeholder="input product name..." onInput={this.nameOnChange}/>
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

export default AddProduct;
