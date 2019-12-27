import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

class PrintScheduledBacklogItem extends React.Component{
    constructor(props){
        super(props);

        this.submit = this.submit.bind(this);
    }

    submit(){
        if(this.props.selectedRelease === undefined){
            return;
        }
        axios('http://localhost:8080/ezScrum/products/' + this.props.selectedProduct.productId + '/releases/' + this.props.selectedRelease.releaseId + '/printable_scheduled_backlog_items/pdf', {
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
                <Button className="Function_Button" bsStyle="link" bsSize="small" onClick={this.submit}>
                    <img src="../delete.png" alt="Print Backlog Items"/>Print Backlog Items
                </Button>
            </div>
        );
    }
}
export default PrintScheduledBacklogItem;