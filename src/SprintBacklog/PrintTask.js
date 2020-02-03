import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Config from '../config.js';

class PrintTask extends React.Component{
    constructor(props){
        super(props);

        this.submit = this.submit.bind(this);
    }

    submit(){
        if(this.props.taskData.length === 0){
            return;
        }
        axios(Config.back_end_host + Config.ezScrum_api + '/products/' + this.props.selectedProduct.productId + '/sprints/' + this.props.selectedSprintId + '/printable_tasks/pdf', {
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
            window.location.href = Config.front_end_host;
        });
    }

    render(){
        return (
            <div>
                <Button className="Function_Button" bsStyle="link" bsSize="small" onClick={this.submit}>
                    <img src="../text.png" alt="Print Tasks"/>Print Tasks
                </Button>
            </div>
        );
    }
}
export default PrintTask;