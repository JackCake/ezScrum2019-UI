import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

class PrintCommittedBacklogItem extends React.Component{
    constructor(props){
        super(props);

        this.submitBacklogItem = this.submitBacklogItem.bind(this);
    }

    submitBacklogItem(){
        axios('http://localhost:8080/ezScrum/products/' + this.props.selectedProduct.productId + '/sprints/' + this.props.selectedSprintId + '/printable_committed_backlog_items/pdf', {
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
                <Button className="Function_Button" bsStyle="link" bsSize="small" onClick={this.submitBacklogItem}>
                    <img src="../delete.png" alt="Print Backlog Items"/>Print Backlog Items
                </Button>
            </div>
        );
    }
}
export default PrintCommittedBacklogItem;