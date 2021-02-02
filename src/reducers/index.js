import { combineReducers } from 'redux';
import chatReducer from './chat-reducer';
import { connectRouter } from 'connected-react-router'

 export default (history) => combineReducers({
    router: connectRouter(history),
    chatReducer
 });