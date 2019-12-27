import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

class PrintSelectedBacklogItem extends React.Component{
    constructor(props){
        super(props);

        this.submit = this.submit.bind(this);
    }

    submit(){
        if(this.props.selectedBacklogItem === undefined){
            return;
        }
        axios('http://localhost:8080/ezScrum/products/' + this.props.selectedProduct.productId + '/printable_backlog_items/' + this.props.selectedBacklogItem.backlogItemId + '/pdf', {
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
                    <img src="../delete.png" alt="Print Selected Backlog Item"/>Print Selected Backlog Item
                </Button>
            </div>
        );
    }
}
export default PrintSelectedBacklogItem;