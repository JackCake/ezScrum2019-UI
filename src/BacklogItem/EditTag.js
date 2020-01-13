import React from 'react';
import axios from 'axios';
import { Button, Form, FormControl, Row, Col} from 'react-bootstrap';

class EditTag extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            name: props.defaultValue
        };

        this.nameOnChange = this.nameOnChange.bind(this);
        this.submitTag = this.submitTag.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    nameOnChange(e){
        this.setState({name: e.target.value});
    }

    submitTag(){
        if(this.state.name === ''){
            alert('The name is required.');
            return;
        }
        let self = this;
        axios.put('http://localhost:8080/ezScrum/tags/' + this.props.row.tagId, {
            name : this.state.name
        }).then(function (response) {
            let editSuccess = response.data.editSuccess;
            let errorMessage = response.data.errorMessage;
            if(editSuccess === false){
                alert(errorMessage);
            }
            self.props.getAllTag();
            self.props.onUpdate(self.state.name);
        }).catch(function (error){
            console.log(error);
        });
    }

    handleClose(){
        this.props.onUpdate(this.props.row.name);
    }

    render(){
        return (
            <div>
                <Form horizontal>
                    <Row>
                        <Col sm={12}>
                            <FormControl componentClass="input" type="text" maxLength="50" placeholder="input tag name..." onInput={this.nameOnChange} defaultValue={this.props.row.name}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <Button onClick={this.submitTag}>Submit</Button>
                        </Col>
                        <Col sm={6}>
                            <Button onClick={this.handleClose}>Cancel</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default EditTag;