import {combineReducers, configureStore} from "@reduxjs/toolkit";

import todosReducer from "./todos/reducer";

const rootReducer = combineReducers({
  todos: todosReducer
})

const store = configureStore({
  reducer: rootReducer
})

export default store
