import { combineReducers } from 'redux';
import common from './common.js';
import lobby from './lobby.js';

export default combineReducers ({
  common,
  lobby,
})
