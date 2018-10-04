import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import registerReducer from './registerReducer';
import submitRequestReducer from './submitRequestReducer';
import fetchRequestsReducer from './fetchRequestsReducer';
import fetchRequestReducer from './fetchRequestReducer';

const rootReducer = combineReducers({
  registerLogin: registerReducer,
  postRequest: submitRequestReducer,
  fetchRequests: fetchRequestsReducer,
  fetchRequest: fetchRequestReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export default Store;