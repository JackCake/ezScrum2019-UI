import React from "react";
import '../TaskBoard.css';
import EditTask from './EditTask.js';
import DeleteTask from './DeleteTask.js';
import ViewTaskHistory from "./ViewTaskHistory.js";

class TaskCard extends React.Component {
    render(){
        return(
            <div draggable onDragStart = {(e) => this.props.onTaskDragStart(e, this.props.taskId, this.props.backlogItemId, this.props.status)}>
                <table className="TaskCard_Table">
                    <tbody>
                        <tr>
                            <td colSpan="2">
                                <table className="TaskCard_Header" >
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h5>Task #{this.props.orderId}</h5>
                                            </td>
                                            <td className="Card_Button">
                                                <EditTask taskId={this.props.taskId} description={this.props.description} status={this.props.status} estimate={this.props.estimate} remains={this.props.remains} notes={this.props.notes}
                                                getAllCommittedBacklogItem={this.props.getAllCommittedBacklogItem} selectedSprintId={this.props.selectedSprintId} isSprintOverdue={this.props.isSprintOverdue}/>
                                                <DeleteTask taskId={this.props.taskId} getAllCommittedBacklogItem={this.props.getAllCommittedBacklogItem} selectedSprintId={this.props.selectedSprintId} isSprintOverdue={this.props.isSprintOverdue}/>
                                                <ViewTaskHistory taskId={this.props.taskId}/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td className="TaskCard_Description">
                                {this.props.description}
                            </td>
                            <td className="TaskCard_Value">
                                {this.props.remains} hr
                            </td>
                        </tr>
                    </tbody>
                </table>
             </div>
        );
    };
}

export default TaskCard;