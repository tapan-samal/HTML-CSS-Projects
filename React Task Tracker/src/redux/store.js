import { applyMiddleware, combineReducers, createStore } from "redux";
import taskReducer from "./task-reducer";
import { thunk } from "redux-thunk";
import promise from "redux-promise-middleware";
import { logger } from "redux-logger";

const rootReducer = combineReducers({
    taskReducer,
  });
  
  const store = createStore(rootReducer, applyMiddleware(promise, thunk, logger));
  
  export default store;
  