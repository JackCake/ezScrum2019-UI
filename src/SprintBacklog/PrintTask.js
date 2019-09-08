import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

class PrintTask extends React.Component{
    constructor(props){
        super(props);

        this.submitTask = this.submitTask.bind(this);
    }

    submitTask(){
        axios('http://localhost:8080/ezScrum/products/' + this.props.selectedProduct.productId + '/sprints/' + this.props.selectedSprintId + '/printable_tasks/pdf', {
            method: 'GET',
            responseType: 'blob'
        })
        .then(function (response) {
            const file = new Blob(
                [response.data], 
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            let newWindow = window.open('/');
            newWindow.onload = () => {
                newWindow.location = fileURL;
            };
        }).catch(function (error){
            console.log(error);
        });
    }

    render(){
        return (
            <div>
                <Button className="Function_Button" bsStyle="link" bsSize="small" onClick={this.submitTask}>
                    <img src="../delete.png" alt="Print Tasks"/>Print Tasks
                </Button>
            </div>
        );
    }
}
export default PrintTask;