import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Config from '../config.js';

class ShowReleaseInformation extends React.Component{
    constructor(props){
        super(props);

        this.submit = this.submit.bind(this);
    }

    submit(){
        if(this.props.selectedRelease === undefined){
            return;
        }
        axios(Config.back_end_host + Config.ezScrum_api + '/products/' + this.props.selectedProduct.productId + '/releases/' + this.props.selectedRelease.releaseId + '/release_information')
        .then(function (response) {
            var newWindow = window.open();
            newWindow.document.body.innerHTML = response.data;
        }).catch(function (error){
            console.log(error);
            window.location.href = Config.front_end_host;
        });
    }

    render(){
        return (
            <div>
                <Button className="Function_Button" bsStyle="link" bsSize="small" onClick={this.submit}>
                    <img src="../clipboard.png" alt="Release Information"/>Release Information
                </Button>
            </div>
        );
    }
}
export default ShowReleaseInformation;