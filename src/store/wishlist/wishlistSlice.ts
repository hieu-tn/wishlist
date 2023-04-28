import { ActionReducerMapBuilder, createEntityAdapter, createSlice } from "@reduxjs/toolkit"

import { extraStatusReducers } from "../actions"
import { StoreStatus, WISHLIST_STORE } from "../../constants/store"
import { IWishlist, IWishlistState } from "./wishlistModels"


// ---------------- ADAPTERS ----------------

const wishlistsAdapter = createEntityAdapter<IWishlist>({
  selectId: w => w.id,
  sortComparer: (a, b) => a.id.localeCompare(b.id),
})
const wishlistsInitialState = wishlistsAdapter.getInitialState()

// ------------------------------------------

// ---------------- API ----------------
// ------------------------------------------

// ---------------- Thunk ----------------
// ------------------------------------------

// ---------------- WISHLIST SLICE ----------------

const initialState: IWishlistState = {
  ...wishlistsInitialState,
  status: StoreStatus.IDLE,
  error: null,
}

const wishlistSlice = createSlice({
  name: WISHLIST_STORE,
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IWishlistState>) => {
    extraStatusReducers(builder)
  },
})

// ------------------------------------------

export const {} = wishlistSlice.actions
export default wishlistSlice.reducer
