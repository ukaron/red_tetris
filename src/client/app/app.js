import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Welcome from '../pages/Welcome';
import Lobby from '../pages/Lobby';
import Game from '../pages/Game';

const App = () => (
  <div >
    <Router>
      <Switch>
        <Route component={Welcome} exact path='/'/>
        <Route component={Lobby} path='/lobby'/>
        <Route component={Game} path='/game'/>
      </Switch>
    </Router>
  </div>
)

export default App;
