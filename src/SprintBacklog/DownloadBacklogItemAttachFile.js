import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Config from '../config.js';

class DownloadBacklogItemAttachFile extends React.Component{
    constructor(props){
        super(props);

        this.downloadAttachFile = this.downloadAttachFile.bind(this);
    }

    downloadAttachFile(){
        let self = this;
        axios.get(Config.back_end_host + Config.ezScrum_api + '/backlog_item_attach_files/' + this.props.attachFile.backlogItemAttachFileId)
        .then(function (response) {
            let attachFileBlob = new Blob([new Uint8Array(response.data.attachFileContents)]);
            let attachFileLink = document.createElement('a');
            attachFileLink.href = window.URL.createObjectURL(attachFileBlob);
            attachFileLink.download = self.props.attachFile.name;
            attachFileLink.click();
        })
        .catch(function (error){
            console.log(error);
            window.location.href = Config.front_end_host;
        });
      }

    render(){
        return (
            <span>
                <Button bsStyle="link" bsSize="small" onClick={this.downloadAttachFile}>
                    {this.props.attachFile.name}
                </Button>
            </span>
        );
    }
}

export default DownloadBacklogItemAttachFile;