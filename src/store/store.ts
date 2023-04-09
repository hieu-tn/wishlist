import {combineReducers, configureStore} from "@reduxjs/toolkit"

import wishlistReducer from "./wishlist/reducer"

const rootReducer = combineReducers({
  wishlist: wishlistReducer
})

const store = configureStore({
  reducer: rootReducer
})

export default store
