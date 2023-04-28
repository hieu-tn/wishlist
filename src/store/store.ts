import { configureStore } from "@reduxjs/toolkit"

import serverApi from "./api/serverApi"
import { CRAWLER_STORE, WISHLIST_STORE } from "../constants/store"
import crawlerReducer from "./crawler/crawlerSlice"
import wishlistReducer from "./wishlist/wishlistSlice"
import counterReducer from "./counter/counterSlice"


const store = configureStore({
  reducer: {
    [serverApi.reducerPath]: serverApi.reducer,
    [CRAWLER_STORE]: crawlerReducer,
    [WISHLIST_STORE]: wishlistReducer,
    // @todo debug
    counter: counterReducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(serverApi.middleware)
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
