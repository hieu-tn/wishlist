import { ActionReducerMapBuilder, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"

import { RootState } from "../store"
import { StoreStatus, WISHLISTS_STORE } from "../../constants/store"
import { AsyncThunkConfig } from "../models"
import {
  IAddProductAction,
  IAddProductToWishlist,
  IAddProductToWishlistAction, IRemoveProductAction,
  IRemoveProductFromWishlist,
  IRemoveProductFromWishlistAction,
  ISetWishlistAction,
  ISetWishlistsAction,
  IWishlist,
  IWishlistState,
} from "./wishlistModels"
import serverApi from "../api/serverApi"
import { IProductItem } from "../../modules/home/models/product.model"
import { extraStatusReducers } from "../actions"


// ---------------- ADAPTERS ----------------

const wishlistsAdapter = createEntityAdapter<IWishlist>({
  selectId: w => w.id,
  // sortComparer: (a, b) => a.id.localeCompare(b.id),
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
      query: id => `get-wishlist-${ id }.json`,
      async onQueryStarted(_, {dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry, updateCachedData}) {
        const {data} = await queryFulfilled
        dispatch(setWishlist(data))
      },
    }),
    // getWishlistProducts: builder.query<Array<IProductItem>, string>({
    //   query: id => `get-wishlist-${ id }-products.json`,
    //   async onQueryStarted(id, {dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry, updateCachedData}) {
    //     const {data} = await queryFulfilled
    //     dispatch(setWishlist({id, products: data}))
    //   },
    // }),
  }),
})

// ------------------------------------------

// ---------------- Thunk ----------------

export const setWishlists = createAsyncThunk<Array<IWishlist>, Array<IWishlist>, AsyncThunkConfig>(
  WISHLISTS_STORE + "/setWishlists",
  async (wishlists, thunkApi) => {
    for (let wishlist of wishlists) {
      // @todo call api when backend is ready
      thunkApi.dispatch(wishlistExtendedServerApi.endpoints.getWishlist.initiate(wishlist.id))
    }

    return wishlists
  },
)

export const addProductToWishlist = createAsyncThunk<IAddProductToWishlist, IAddProductToWishlist, AsyncThunkConfig>(
  WISHLISTS_STORE + "/addProductToWishlist",
  async ({wishlistId, product}, thunkApi) => {
    // @todo should call api when backend is ready
    return {wishlistId, product}
  },
)

export const removeProductFromWishlist = createAsyncThunk<IRemoveProductFromWishlist, IRemoveProductFromWishlist, AsyncThunkConfig>(
  WISHLISTS_STORE + "/removeProductFromWishlist",
  async ({wishlistId, productId}, thunkApi) => {
    // @todo should call api when backend is ready
    return {wishlistId, productId}
  },
)

// ------------------------------------------

// ---------------- WISHLIST SLICE ----------------

const initialState: IWishlistState = {
  ...wishlistsInitialState,
  status: StoreStatus.IDLE,
}

const wishlistSlice = createSlice({
  name: WISHLISTS_STORE,
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
    builder.addCase(addProductToWishlist.fulfilled, (state: IWishlistState, action: IAddProductToWishlistAction) => {
      let products = state.entities[action.payload.wishlistId]?.products ?? []
      products.push(action.payload.product)
      wishlistsAdapter.updateOne(state, {
        id: action.payload.wishlistId,
        changes: {
          products: products,
        },
      })
    })
    builder.addCase(removeProductFromWishlist.fulfilled, (state: IWishlistState, action: IRemoveProductFromWishlistAction) => {
      let products = state.entities[action.payload.wishlistId]?.products ?? []
      products = products.filter(p => p.id !== action.payload.productId)
      // @todo found duplicates, violate DRY
      wishlistsAdapter.updateOne(state, {
        id: action.payload.wishlistId,
        changes: {
          products: products,
        },
      })
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
} = wishlistsAdapter.getSelectors((state: RootState) => state[WISHLISTS_STORE])

export const {
  useGetWishlistsQuery,
  useGetWishlistQuery,
} = wishlistExtendedServerApi

export const {setWishlist} = wishlistSlice.actions
export default wishlistSlice.reducer
