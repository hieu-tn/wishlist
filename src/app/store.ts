import { configureStore } from "@reduxjs/toolkit"

import crawlerReducer from "store/crawler/crawlerSlice"


const store = configureStore({
  reducer: {
    crawler: crawlerReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
