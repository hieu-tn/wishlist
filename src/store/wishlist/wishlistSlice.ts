import { ActionReducerMapBuilder, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"

import { RootState } from "../store"
import { StoreStatus, WISHLIST_STORE } from "../../constants/store"
import { AsyncThunkConfig } from "../models"
import { extraStatusReducers } from "../actions"
import { ISetWishlistAction, ISetWishlistsAction, IWishlist, IWishlistState } from "./wishlistModels"
import serverApi from "../api/serverApi"


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
    getWishlist: builder.query<IWishlist, string>({
      query: id => "get-wishlist.json",
      async onQueryStarted(_, {dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry, updateCachedData}) {
        const {data} = await queryFulfilled
        dispatch(setWishlist(data))
      },
    }),
  }),
})

// ------------------------------------------

// ---------------- Thunk ----------------

export const setWishlists = createAsyncThunk<Array<IWishlist>, Array<IWishlist>, AsyncThunkConfig>(
  WISHLIST_STORE + "/setWishlists",
  async (wishlists, thunkApi) => {
    for (let wishlist of wishlists) {
      thunkApi.dispatch(wishlistExtendedServerApi.endpoints.getWishlist.initiate(wishlist.id))
    }
    return wishlists
  },
)

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
    setWishlist(state, action: ISetWishlistAction) {
      wishlistsAdapter.upsertOne(state, action.payload)
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IWishlistState>) => {
    builder.addCase(setWishlists.fulfilled, (state: IWishlistState, action: ISetWishlistsAction) => {
      wishlistsAdapter.setAll(state, action.payload)
    })
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
  useGetWishlistQuery,
} = wishlistExtendedServerApi

export const {setWishlist} = wishlistSlice.actions
export default wishlistSlice.reducer
