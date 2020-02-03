import React from 'react';
import DownloadTaskAttachFile from './DownloadTaskAttachFile.js';
import RemoveTaskAttachFile from './RemoveTaskAttachFile.js';

class ViewTaskAttachFile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            attachFiles : []
        };

        this.composeAttachFiles = this.composeAttachFiles.bind(this);
    }

    composeAttachFiles(){
        let attachFiles = [];
        for(var i = 0; i < this.props.attachFiles.length; i++){
            let attachFile = this.props.attachFiles[i];
            let orderId = i + 1;
            attachFiles.push(
                <tr key={"attach_file_" + orderId}>
                    <td colSpan="2">
                        <span>{orderId + ". "}</span>
                        <DownloadTaskAttachFile attachFile={attachFile}/>
                        <span>{attachFile.createTime}</span>
                        <RemoveTaskAttachFile attachFile={attachFile}
                        getAllCommittedBacklogItem={this.props.getAllCommittedBacklogItem} selectedSprintId={this.props.selectedSprintId}/>
                    </td>
                </tr>
            );
        }
        return attachFiles;
    }

    render(){
        let attachFiles = this.composeAttachFiles();
        return (
            <tfoot>
                {attachFiles}
            </tfoot>
        );
    }
}

export default ViewTaskAttachFile;