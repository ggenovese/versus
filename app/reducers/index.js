import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import versus from './versus';

const rootReducer = combineReducers({
  routing: routerReducer,
  versus
});

export default rootReducer;
