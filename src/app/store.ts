import {configureStore} from "@reduxjs/toolkit"

import crawlerReducer from "./crawler/reducer"

const store = configureStore({
  reducer: {
    crawler: crawlerReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
