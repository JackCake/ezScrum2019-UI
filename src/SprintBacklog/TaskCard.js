import React from "react";
import '../TaskBoard.css';
import EditTask from './EditTask.js';
import DeleteTask from './DeleteTask.js';
import ViewTaskHistory from "./ViewTaskHistory.js";
import UploadTaskAttachFile from "./UploadTaskAttachFile.js";
import ViewTaskAttachFile from "./ViewTaskAttachFile.js";

class TaskCard extends React.Component {
    render(){
        return(
            <div draggable onDragStart = {(e) => this.props.onTaskDragStart(e, this.props.task.taskId, this.props.task.backlogItemId, this.props.task.status)}>
                <table className="TaskCard_Table">
                    <tbody>
                        <tr>
                            <td colSpan="2">
                                <table className="TaskCard_Header" >
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h5>Task #{this.props.task.orderId}</h5>
                                            </td>
                                            <td className="Card_Button">
                                                <EditTask task={this.props.task}
                                                getAllCommittedBacklogItem={this.props.getAllCommittedBacklogItem} selectedSprintId={this.props.selectedSprintId} isSprintOverdue={this.props.isSprintOverdue}/>
                                                <DeleteTask task={this.props.task} getAllCommittedBacklogItem={this.props.getAllCommittedBacklogItem} selectedSprintId={this.props.selectedSprintId} isSprintOverdue={this.props.isSprintOverdue}/>
                                                <ViewTaskHistory task={this.props.task}/>
                                                <UploadTaskAttachFile task={this.props.task}
                                                getAllCommittedBacklogItem={this.props.getAllCommittedBacklogItem} selectedSprintId={this.props.selectedSprintId}/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td className="TaskCard_Description">
                                {this.props.task.description}
                            </td>
                            <td className="TaskCard_Value">
                                {this.props.task.remains} hr
                            </td>
                        </tr>
                    </tbody>
                    <ViewTaskAttachFile attachFiles={this.props.task.attachFileList}
                    getAllCommittedBacklogItem={this.props.getAllCommittedBacklogItem} selectedSprintId={this.props.selectedSprintId}/>
                </table>
             </div>
        );
    };
}

export default TaskCard;