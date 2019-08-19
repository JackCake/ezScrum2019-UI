import React from 'react';
import './App.css';
import { Switch, BrowserRouter, Route} from 'react-router-dom';
import Product from './Product/Product.js';
import SideBar from './SideBar';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="./ezScrum.png" className="App-logo" alt="logo" />
          <label className="App-title">  ezScrum</label>
          <label className="App-subtitle">  Software Systems Lab, NTUT</label>
        </header>

        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Product}></Route>
            <Route exact path="/ViewProduct" component={SideBar}></Route>
            <Route exact path="/ProductBacklog" component={SideBar}></Route>
            <Route exact path="/ReleasePlan" component={SideBar}></Route>
            <Route exact path="/SprintPlan" component={SideBar}></Route>
            <Route exact path="/SprintBacklog" component={SideBar}></Route>
            <Route exact path="/Retrospective" component={SideBar}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
