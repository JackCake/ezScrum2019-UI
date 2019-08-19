import React from "react";
import '../TaskBoard.css';
import AddTask from './AddTask.js';
import EditBacklogItem from "./EditBacklogItem.js";
import DeleteBacklogItem from "./DeleteBacklogItem.js";
import DropBacklogItem from "./DropBacklogItem.js";
import ViewBacklogItemHistory from './ViewBacklogItemHistory.js';

class StoryCard extends React.Component {
    
    render(){
        return(
            <div draggable onDragStart = {(e) => this.props.onStoryDragStart(e, this.props.backlogItemId, this.props.status)}>
                <table className="StoryCard_Table">
                    <tbody>
                        <tr>
                            <td colSpan="2">
                                <table className="StoryCard_Header">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h5>Story #{this.props.orderId}</h5>
                                            </td>
                                            <td className="Card_Button">
                                                <AddTask backlogItemId={this.props.backlogItemId} status={this.props.status}
                                                getAllCommittedBacklogItem={this.props.getAllCommittedBacklogItem} selectedSprintId={this.props.selectedSprintId} selectedProduct={this.props.selectedProduct} isSprintOverdue={this.props.isSprintOverdue}/>
                                                <EditBacklogItem backlogItemId={this.props.backlogItemId} description={this.props.description} estimate={this.props.estimate} importance={this.props.importance} notes={this.props.notes} 
                                                getAllCommittedBacklogItem={this.props.getAllCommittedBacklogItem} selectedSprintId={this.props.selectedSprintId} selectedProduct={this.props.selectedProduct} isSprintOverdue={this.props.isSprintOverdue}/>
                                                <DeleteBacklogItem backlogItemId={this.props.backlogItemId}
                                                getAllCommittedBacklogItem={this.props.getAllCommittedBacklogItem} selectedSprintId={this.props.selectedSprintId} selectedProduct={this.props.selectedProduct} isSprintOverdue={this.props.isSprintOverdue}/>
                                                <DropBacklogItem backlogItemId={this.props.backlogItemId}
                                                getAllCommittedBacklogItem={this.props.getAllCommittedBacklogItem} selectedSprintId={this.props.selectedSprintId} selectedProduct={this.props.selectedProduct} isSprintOverdue={this.props.isSprintOverdue}/>
                                                <ViewBacklogItemHistory backlogItemId={this.props.backlogItemId}/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td className="StoryCard_Description">
                                {this.props.description}
                            </td>
                            <td className="StoryCard_Value">
                                {this.props.estimate} Point
                            </td>
                        </tr>
                    </tbody>
                </table>
             </div>
        );
    };
}

export default StoryCard;