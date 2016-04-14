import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import versus from './versus';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  versus
});

export default rootReducer;
