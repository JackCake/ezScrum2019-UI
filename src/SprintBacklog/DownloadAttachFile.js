import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

class DonwloadAttachFile extends React.Component{
    constructor(props){
        super(props);

        this.donwloadAttachFile = this.donwloadAttachFile.bind(this);
    }

    donwloadAttachFile(){
        let attachFileType = '';
        let attachFileId = '';
        if(this.props.attachFileType === 'Backlog Item'){
            attachFileType = "backlog_item";
            attachFileId = this.props.attachFile.backlogItemAttachFileId;
        } else if(this.props.attachFileType === 'Task'){
            attachFileType = "task";
            attachFileId = this.props.attachFile.taskAttachFileId;
        }
        let self = this;
        axios.get('http://localhost:8080/ezScrum/' + attachFileType + '_attach_files/' + attachFileId)
        .then(function (response) {
            let attachFileBlob = new Blob([new Uint8Array(response.data.attachFileContent)]);
            let attachFileLink = document.createElement('a');
            attachFileLink.href = window.URL.createObjectURL(attachFileBlob);
            attachFileLink.download = self.props.attachFile.name;
            attachFileLink.click();
        })
        .catch(function (error){
            console.log(error);
        });
      }

    render(){
        return (
            <td>
                <Button bsStyle="link" bsSize="small" onClick={this.donwloadAttachFile}>
                    {this.props.attachFile.name}
                </Button>
            </td>
        );
    }
}

export default DonwloadAttachFile;