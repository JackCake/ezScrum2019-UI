import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import BacklogItem from './BacklogItem/BacklogItem.js';
import Release from './Release/Release.js';
import Sprint from './Sprint/Sprint.js';
import SprintBacklog from './SprintBacklog/SprintBacklog.js';
import Retrospective from './Retrospective/Retrospective.js';
import './SideBar.css';
import './Button.css';

class SideBar extends Component{
    render(){
        if(this.props.location.state===undefined){
            return <Redirect to={"/"}/>
        }
        const routes = [
            {
                path: '/ProductBacklog',
                exact: true,
                main: () => <BacklogItem selectedProduct={this.props.location.state.selectedProduct}/>
            },
            {
                path: '/ReleasePlan',
                exact: true,
                main: () => <Release selectedProduct={this.props.location.state.selectedProduct}/>
            },
            {
                path: '/SprintPlan',
                exact: true,
                main: () => <Sprint selectedProduct={this.props.location.state.selectedProduct}/>
            },
            {
                path: '/SprintBacklog',
                exact: true,
                main: () => <SprintBacklog selectedProduct={this.props.location.state.selectedProduct}/>
            },
            {
                path: '/Retrospective',
                exact: true,
                main: () => <Retrospective selectedProduct={this.props.location.state.selectedProduct}/>
            }
        ];
        return(
            <Router>
                <div className="SideBar_Div_All">
                    <div className="SideBar_Div">
                        <h5>Product: {this.props.location.state.selectedProduct.name}</h5>
                        <ul>
                            <li><Link className="Link" to = '/ProductBacklog'><img src="../../folder.png" alt="product_backlog_item"/>Product Backlog</Link></li>
                            <li><Link className="Link" to = '/ReleasePlan'><img src="../../calendar.png" alt="release_plan"/>Release Plan</Link></li>
                            <li><Link className="Link" to = '/SprintPlan'><img src="../../calendar.png" alt="sprint_plan"/>Sprint Plan</Link></li>
                            <li><Link className="Link" to = '/SprintBacklog'><img src="../../text.png" alt="sprint_backlog"/>Sprint Backlog</Link></li>
                            <li><Link className="Link" to = '/Retrospective'><img src="../../stopwatch.png" alt="retrospective"/>Retrospective</Link></li>
                        </ul>
                    </div>
                    <div className="SideBar_Div_Main">
                        {routes.map((route) => (
                            <Route
                                key = {route.path}
                                path = {route.path}
                                exact = {route.exact}
                                component = {route.main}
                            />
                        ))}
                    </div>
                </div>
            </Router>
        );
    }
}

export default SideBar;