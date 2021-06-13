import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { CommonSelector } from '../selectors/common';
import Welcome from '../pages/Welcome';
import Lobby from '../pages/Lobby';
import Game from '../pages/Game';
import Header from '../components/header';

const App = ({ common }) => (
  <div >
    <Header/>
    <Router>
        <Switch>
            <Route component={Welcome} exact path='/'/>
            <Route component={Lobby} path='/lobby'/>
            <Route component={Game} path='/game:room'/>
        </Switch>
    </Router>
  </div>
)

const mapStateToProps = (state) => ({
	common: CommonSelector(state),
});

export default connect(mapStateToProps, null)(App);
