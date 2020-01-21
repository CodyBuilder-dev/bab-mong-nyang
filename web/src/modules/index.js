import { combineReducers } from 'redux';
import login from './login';
import members from './members';
const rootReducer = combineReducers({
    login,
    members
});

export default rootReducer;