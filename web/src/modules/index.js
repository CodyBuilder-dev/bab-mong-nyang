import { combineReducers } from 'redux';
import login from './login';
import members from './members';
import store from './store'
const rootReducer = combineReducers({
    store
});

export default rootReducer;