import { ActionReducerMapBuilder, createEntityAdapter, createSlice } from "@reduxjs/toolkit"

import { extraStatusReducers } from "../actions"
import { StoreStatus, WISHLIST_STORE } from "../../constants/store"
import { ISetWishlistsAction, IWishlist, IWishlistState } from "./wishlistModels"
import serverApi from "../api/serverApi"
import { RootState } from "../store"


// ---------------- ADAPTERS ----------------

const wishlistsAdapter = createEntityAdapter<IWishlist>({
  selectId: w => w.id,
  sortComparer: (a, b) => a.id.localeCompare(b.id),
})
const wishlistsInitialState = wishlistsAdapter.getInitialState()

// ------------------------------------------

// ---------------- API ----------------

const wishlistExtendedServerApi = serverApi.injectEndpoints({
  endpoints: builder => ({
    getWishlists: builder.query<Array<IWishlist>, any>({
      query: () => "get-wishlists.json",
      async onQueryStarted(_, {dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry, updateCachedData}) {
        const {data} = await queryFulfilled
        dispatch(setWishlists(data))
      },
    }),
  }),
})
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
  reducers: {
    setWishlists(state, action: ISetWishlistsAction) {
      wishlistsAdapter.setAll(state, action.payload)
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IWishlistState>) => {
    extraStatusReducers(builder)
  },
})

// ------------------------------------------

export const {
  selectIds: selectWishlistIds,
  selectEntities: selectWishlistEntities,
  selectAll: selectAllWishlists,
  selectTotal: selectTotalWishlists,
  selectById: selectWishlistById,
} = wishlistsAdapter.getSelectors((state: RootState) => state.wishlist)

export const {
  useGetWishlistsQuery,
} = wishlistExtendedServerApi

export const {setWishlists} = wishlistSlice.actions
export default wishlistSlice.reducer
