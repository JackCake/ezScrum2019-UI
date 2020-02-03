import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './SideBar.css';
import './Button.css';

class SideBar extends Component{
    render(){
        if(this.props.selectedProduct===undefined){
            return <Redirect to={"/"}/>;
        }
        return(
            <div>
                <h5>Product: {this.props.selectedProduct.name}</h5>
                <ul>
                    <li><Link className="Link" to = {{pathname: '/ProductBacklog', state: {selectedProduct: this.props.selectedProduct}}}><img src="../../folder.png" alt="product_backlog_item"/>Product Backlog</Link></li>
                    <li><Link className="Link" to = {{pathname: '/ReleasePlan', state: {selectedProduct: this.props.selectedProduct}}}><img src="../../calendar.png" alt="release_plan"/>Release Plan</Link></li>
                    <li><Link className="Link" to = {{pathname: '/SprintPlan', state: {selectedProduct: this.props.selectedProduct}}}><img src="../../calendar.png" alt="sprint_plan"/>Sprint Plan</Link></li>
                    <li><Link className="Link" to = {{pathname: '/SprintBacklog', state: {selectedProduct: this.props.selectedProduct}}}><img src="../../text.png" alt="sprint_backlog"/>Sprint Backlog</Link></li>
                    <li><Link className="Link" to = {{pathname: '/Retrospective', state: {selectedProduct: this.props.selectedProduct}}}><img src="../../stopwatch.png" alt="retrospective"/>Retrospective</Link></li>
                </ul>
            </div>
        );
    }
}

export default SideBar;