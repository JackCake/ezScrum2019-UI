import React from 'react';
import DownloadBacklogItemAttachFile from './DownloadBacklogItemAttachFile.js';
import RemoveBacklogItemAttachFile from './RemoveBacklogItemAttachFile.js';

class ViewBacklogItemAttachFile extends React.Component{
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
                        <DownloadBacklogItemAttachFile attachFile={attachFile}/>
                        <span>{attachFile.createTime}</span>
                        <RemoveBacklogItemAttachFile attachFile={attachFile}
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

export default ViewBacklogItemAttachFile;