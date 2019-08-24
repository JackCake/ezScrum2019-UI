import React from 'react';
import './App.css';
import { Switch, BrowserRouter, Route} from 'react-router-dom';
import Product from './Product/Product.js';
import BacklogItem from './BacklogItem/BacklogItem.js';
import Release from './Release/Release.js';
import Sprint from './Sprint/Sprint.js';
import SprintBacklog from './SprintBacklog/SprintBacklog.js';
import Retrospective from './Retrospective/Retrospective.js';

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
            <Route exact path="/ProductBacklog" component={BacklogItem}></Route>
            <Route exact path="/ReleasePlan" component={Release}></Route>
            <Route exact path="/SprintPlan" component={Sprint}></Route>
            <Route exact path="/SprintBacklog" component={SprintBacklog}></Route>
            <Route exact path="/Retrospective" component={Retrospective}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
