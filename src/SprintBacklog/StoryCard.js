import React from "react";
import '../TaskBoard.css';
import AddTask from './AddTask.js';
import EditBacklogItem from "./EditBacklogItem.js";
import DeleteBacklogItem from "./DeleteBacklogItem.js";
import DropBacklogItem from "./DropBacklogItem.js";
import ViewBacklogItemHistory from './ViewBacklogItemHistory.js';
import UploadBacklogItemAttachFile from "./UploadBacklogItemAttachFile.js";
import ViewAssignedTag from "../BacklogItem/ViewAssignedTag.js";
import ViewBacklogItemAttachFile from "./ViewBacklogItemAttachFile.js";

class StoryCard extends React.Component {
    
    render(){
        return(
            <div draggable onDragStart = {(e) => this.props.onStoryDragStart(e, this.props.backlogItem.backlogItemId, this.props.backlogItem.status)}>
                <table className="StoryCard_Table">
                    <tbody>
                        <tr>
                            <td colSpan="2">
                                <table className="StoryCard_Header">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h5>Story #{this.props.backlogItem.orderId}</h5>
                                            </td>
                                            <td className="Card_Button">
                                                <AddTask backlogItem={this.props.backlogItem}
                                                getAllCommittedBacklogItem={this.props.getAllCommittedBacklogItem} selectedSprintId={this.props.selectedSprintId} selectedProduct={this.props.selectedProduct} isSprintOverdue={this.props.isSprintOverdue}/>
                                                <EditBacklogItem backlogItem={this.props.backlogItem} 
                                                getAllCommittedBacklogItem={this.props.getAllCommittedBacklogItem} selectedSprintId={this.props.selectedSprintId} selectedProduct={this.props.selectedProduct} isSprintOverdue={this.props.isSprintOverdue}/>
                                                <DeleteBacklogItem backlogItem={this.props.backlogItem}
                                                getAllCommittedBacklogItem={this.props.getAllCommittedBacklogItem} selectedSprintId={this.props.selectedSprintId} selectedProduct={this.props.selectedProduct} isSprintOverdue={this.props.isSprintOverdue}/>
                                                <DropBacklogItem backlogItem={this.props.backlogItem}
                                                getAllCommittedBacklogItem={this.props.getAllCommittedBacklogItem} selectedSprintId={this.props.selectedSprintId} selectedProduct={this.props.selectedProduct} isSprintOverdue={this.props.isSprintOverdue}/>
                                                <ViewBacklogItemHistory backlogItem={this.props.backlogItem}/>
                                                <UploadBacklogItemAttachFile backlogItem={this.props.backlogItem}
                                                getAllCommittedBacklogItem={this.props.getAllCommittedBacklogItem} selectedSprintId={this.props.selectedSprintId}/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td className="StoryCard_Description">
                                {this.props.backlogItem.description}
                            </td>
                            <td className="StoryCard_Value">
                                {this.props.backlogItem.estimate} Point
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <ViewAssignedTag tags={this.props.backlogItem.assignedTagList}/>
                            </td>
                        </tr>
                    </tbody>
                    <ViewBacklogItemAttachFile attachFiles={this.props.backlogItem.attachFileList}
                    getAllCommittedBacklogItem={this.props.getAllCommittedBacklogItem} selectedSprintId={this.props.selectedSprintId}/>
                </table>
             </div>
        );
    };
}

export default StoryCard;