import React from "react";
import axios from 'axios';
import Config from '../config.js';
import { Column, Row } from 'simple-flexbox';
import '../TaskBoard.css'
import StoryCard from './StoryCard.js';
import TaskCard from './TaskCard.js';

class ViewCommittedBacklogItem extends React.Component {
    constructor(props){
        super(props);

        this.onStoryDragStart = this.onStoryDragStart.bind(this);
        this.onTaskDragStart = this.onTaskDragStart.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.composeStories = this.composeStories.bind(this);
    }

    onStoryDragStart(e, backlogItemId, status){
        e.dataTransfer.setData("backlogItemId", backlogItemId);
        e.dataTransfer.setData("status", status);
        e.dataTransfer.setData("category", "story");
    }

    onTaskDragStart(e, taskId, backlogItemId, status){
        e.dataTransfer.setData("taskId", taskId);
        e.dataTransfer.setData("backlogItemId", backlogItemId);
        e.dataTransfer.setData("status", status);
        e.dataTransfer.setData("category", "task");
    }

    onDragOver(e){
        e.preventDefault();
    }

    onDrop(e, targetBacklogItemId, changedStatus, isStoryDone, isAllTaskDone){
        let backlogItemId = e.dataTransfer.getData("backlogItemId");
        if(backlogItemId !== targetBacklogItemId){
            return;
        }
        let status = e.dataTransfer.getData("status");
        if(status === changedStatus){
            return;
        }
        let category = e.dataTransfer.getData("category");
            let self = this;
            if(category === "story"){
                if(changedStatus === "Doing"){
                    return;
                }
                if(changedStatus === "Done" && isAllTaskDone === false){
                    return;
                }
                if(this.props.isSprintOverdue){
                    let confirmMove = window.confirm("The sprint is overdue, are you sure to move it?");
                    if(confirmMove === false){
                        return;                    
                    }
                }
                axios.put(Config.back_end_host + Config.ezScrum_api + '/products/' + this.props.selectedProduct.productId + '/backlog_item_statuses/' + backlogItemId, {
                    status : changedStatus
                }).then(function (response) {
                    let moveSuccess = response.data.moveSuccess;
                    let errorMessage = response.data.errorMessage;
                    if(moveSuccess === false){
                        alert(errorMessage);
                        return;
                    }
                    self.props.getAllCommittedBacklogItem(self.props.selectedSprintId);
                }).catch(function (error){
                    console.log(error);
                    window.location.href = Config.front_end_host;
                });
            }else if(category === "task"){
                let taskId = e.dataTransfer.getData("taskId");

                if(isStoryDone === true){
                    return;
                }
                if(status === "To do" && changedStatus === "Done"){
                    return;
                }
                if(status === "Done" && changedStatus === "To do"){
                    return;
                }
                if(this.props.isSprintOverdue){
                    let confirmMove = window.confirm("The sprint is overdue, are you sure to move it?");
                    if(confirmMove === false){
                        return;                    
                    }
                }
                axios.put(Config.back_end_host + Config.ezScrum_api + '/task_statuses/' + taskId, {
                    taskId : taskId,
                    status : changedStatus
                }).then(function (response) {
                    let moveSuccess = response.data.moveSuccess;
                    let errorMessage = response.data.errorMessage;
                    if(moveSuccess === false){
                        alert(errorMessage);
                        return;
                    }
                    self.props.getAllCommittedBacklogItem(self.props.selectedSprintId);
                }).catch(function (error){
                    console.log(error);
                    window.location.href = Config.front_end_host;
                });
            }
    }

    composeStories(){
        let stories = [];
        this.props.storyData.forEach(backlogItem => {
            let toDoBacklogItem;
            let doneBacklogItem;
            let isStoryDone = false;
            let storyCard = <StoryCard onStoryDragStart={this.onStoryDragStart} backlogItem={backlogItem}
            getAllCommittedBacklogItem={this.props.getAllCommittedBacklogItem} selectedSprintId={this.props.selectedSprintId} selectedProduct={this.props.selectedProduct} isSprintOverdue={this.props.isSprintOverdue}/>;
            if(backlogItem.status === "To do"){
                toDoBacklogItem = storyCard;
            }else if(backlogItem.status === "Done"){
                doneBacklogItem = storyCard;
                isStoryDone = true;
            }
            let toDoTasks = [];
            let doingTasks = [];
            let doneTasks = [];
            let isAllTaskDone = true;
            this.props.taskData.forEach(data => {
                if(data.backlogItemId === backlogItem.backlogItemId){
                    data.taskList.forEach(task =>{
                        let taskCard = 
                        <div key={"task_card_" + task.orderId}>
                            <TaskCard onTaskDragStart={this.onTaskDragStart} task={task}
                            getAllCommittedBacklogItem={this.props.getAllCommittedBacklogItem} selectedSprintId={this.props.selectedSprintId} isSprintOverdue={this.props.isSprintOverdue}/>
                        </div>
                        if(task.status === "To do"){
                            toDoTasks.push(taskCard)
                            isAllTaskDone = false;
                          }else if(task.status === "Doing"){
                            doingTasks.push(taskCard)
                            isAllTaskDone = false;
                          }else{
                            doneTasks.push(taskCard)
                          }
                    })
                }
            })
            stories.push(
                <div key={"story_card_" + backlogItem.orderId}>
                    <Row className="Row_Bottom">
                        <Column flexGrow={1} style={{maxWidth: '33.3%'}} onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>this.onDrop(e, backlogItem.backlogItemId, "To do", isStoryDone, isAllTaskDone)}>
                            <div>{toDoBacklogItem}</div>
                            <div>{toDoTasks}</div>
                        </Column>
                        <Column flexGrow={1} style={{maxWidth: '33.3%'}} onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>this.onDrop(e, backlogItem.backlogItemId, "Doing", isStoryDone, isAllTaskDone)}>
                            <div>{doingTasks}</div>
                        </Column>
                        <Column flexGrow={1} style={{maxWidth: '33.3%'}} onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>this.onDrop(e, backlogItem.backlogItemId, "Done", isStoryDone, isAllTaskDone)}>
                            <div>{doneBacklogItem}</div>
                            <div>{doneTasks}</div>
                        </Column>
                    </Row>
                    <br/>
                </div>
            );
        });
        return stories;
    }

  render() {
    let stories = this.composeStories();    
    return (
        <div>
            <Row vertical='center' horizontal='center'>
                <Column className="TaskBoard_Todo_Header" flexGrow={1} vertical='center' horizontal='center'>
                    <h4>To do</h4>
                </Column>
                <Column className="TaskBoard_Doing_Header" flexGrow={1} vertical='center' horizontal='center'>
                    <h4>Doing</h4>
                </Column>
                <Column className="TaskBoard_Done_Header" flexGrow={1} vertical='center' horizontal='center'>
                    <h4>Done</h4>
                </Column>
            </Row>
            {stories}
        </div>
    );
  }
}

export default ViewCommittedBacklogItem;