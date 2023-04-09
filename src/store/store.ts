import {combineReducers, configureStore} from "@reduxjs/toolkit"

import crawlerReducer from "./crawler/reducer"

const rootReducer = combineReducers({
  crawler: crawlerReducer
})

const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>

export default store
