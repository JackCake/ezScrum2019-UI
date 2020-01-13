import React from 'react';
import axios from 'axios';
import { Button, Form, FormControl, FormGroup, Col, ControlLabel } from 'react-bootstrap';

class AddTag extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            name: ''
        };

        this.nameOnChange = this.nameOnChange.bind(this);
        this.submitTag = this.submitTag.bind(this);
    }

    nameOnChange(e){
        this.setState({name: e.target.value});
    }

    submitTag(){
        if(this.state.name === ''){
            alert('The name is required.');
            return;
        }
        if(this.props.tagData.some(tag => tag.name === this.state.name)){
            alert('There is the same name of the tag in the table.');
            return;
        }
        let self = this;
        axios.post('http://localhost:8080/ezScrum/products/' + this.props.selectedProduct.productId + '/tags',{
            name : this.state.name
        }).then(function (response) {
            let addSuccess = response.data.addSuccess;
            let errorMessage = response.data.errorMessage;
            if(addSuccess === false){
                alert(errorMessage);
            }else{
                self.props.getAllTag();
                self.setState({name : ''});
            }
        }).catch(function (error){
            console.log(error);
        });
    }

    render(){
        return (
            <div>
                <Form horizontal>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            *Name:
                        </Col>
                        <Col sm={8}>
                            <FormControl componentClass="input" type="text" maxLength="50" placeholder="input tag name..." onInput={this.nameOnChange} value={this.state.name}/>
                        </Col>
                        <Col sm={2}>
                            <Button onClick={this.submitTag}>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default AddTag;