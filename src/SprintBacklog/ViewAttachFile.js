import React from 'react';
import DonwloadAttachFile from './DownloadAttachFile';
import RemoveAttachFile from './RemoveAttachFile';

class ViewAttachFile extends React.Component{
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
            attachFiles.push(
                <tr key={"attach_file_" + attachFile.orderId}>
                    <DonwloadAttachFile attachFileType={this.props.attachFileType} attachFile={attachFile}/>
                    <RemoveAttachFile attachFileType={this.props.attachFileType} attachFile={attachFile}
                    getAllCommittedBacklogItem={this.props.getAllCommittedBacklogItem} selectedSprintId={this.props.selectedSprintId}/>
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

export default ViewAttachFile;