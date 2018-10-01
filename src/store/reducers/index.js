import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import registerReducer from './registerReducer';

const rootReducer = combineReducers({
  registration: registerReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export default Store;