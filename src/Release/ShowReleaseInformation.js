import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

class ShowReleaseInformation extends React.Component{
    constructor(props){
        super(props);

        this.submit = this.submit.bind(this);
    }

    submit(){
        if(this.props.selectedRelease === undefined){
            return;
        }
        axios('http://localhost:8080/ezScrum/products/' + this.props.selectedProduct.productId + '/releases/' + this.props.selectedRelease.releaseId + '/release_information')
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
                    <img src="../delete.png" alt="Release Information"/>Release Information
                </Button>
            </div>
        );
    }
}
export default ShowReleaseInformation;