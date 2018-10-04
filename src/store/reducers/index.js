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

const rootReducer = combineReducers({
  registerLogin: registerReducer,
  postRequest: submitRequestReducer,
  fetchRequest: fetchRequestsReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export default Store;