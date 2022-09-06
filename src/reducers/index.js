import { combineReducers } from 'redux';
import userReducer from './userReducer';
import adminReducer from './adminReducer';
import statusReducer from './statusReducer';

export default combineReducers({
    user: userReducer,
    admin: adminReducer,
    status: statusReducer
})