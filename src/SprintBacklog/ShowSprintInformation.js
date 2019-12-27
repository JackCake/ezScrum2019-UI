import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

class ShowSprintInformation extends React.Component{
    constructor(props){
        super(props);

        this.submit = this.submit.bind(this);
    }

    submit(){
        axios('http://localhost:8080/ezScrum/products/' + this.props.selectedProduct.productId + '/sprints/' + this.props.selectedSprintId + '/sprint_information')
        .then(function (response) {
            var newWindow = window.open();
            newWindow.document.body.innerHTML = response.data;
        }).catch(function (error){
            console.log(error);
        });
    }

    render(){
        return (
            <div>
                <Button className="Function_Button" bsStyle="link" bsSize="small" onClick={this.submit}>
                    <img src="../delete.png" alt="Sprint Information"/>Sprint Information
                </Button>
            </div>
        );
    }
}
export default ShowSprintInformation;