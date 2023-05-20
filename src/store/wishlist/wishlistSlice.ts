import { ActionReducerMapBuilder, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"

import { RootState } from "../store"
import { StoreStatus, WISHLIST_STORE } from "../../constants/store"
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

const productsAdapter = createEntityAdapter<IProductItem>({
  selectId: p => p.id,
  sortComparer: (a, b) => a.id.localeCompare(b.id),
})
const productsAdapterInitialState = productsAdapter.getInitialState()

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
      // @todo call api when backend is ready
      // thunkApi.dispatch(wishlistExtendedServerApi.endpoints.getWishlist.initiate(wishlist.id))
      if (!("products" in wishlist) || !wishlist.products) {
        wishlist.products = productsAdapterInitialState.ids
      }
    }

    return wishlists
  },
)

export const addProductToWishlist = createAsyncThunk<IAddProductToWishlist, IAddProductToWishlist, AsyncThunkConfig>(
  WISHLIST_STORE + "/addProductToWishlist",
  async ({wishlistId, product}, thunkApi) => {
    // @todo should call api when backend is ready
    thunkApi.dispatch(addProduct(product))
    return {wishlistId, product}
  },
)

export const removeProductFromWishlist = createAsyncThunk<IRemoveProductFromWishlist, IRemoveProductFromWishlist, AsyncThunkConfig>(
  WISHLIST_STORE + "/removeProductFromWishlist",
  async ({wishlistId, productId}, thunkApi) => {
    // @todo should call api when backend is ready
    let state = thunkApi.getState() as RootState

    let shouldRemove = true
    // if user has more than 1 wishlist, check other wishlists whether product belongs to
    if (Object.keys(state.wishlist.entities).length > 1) {
      for (let w of Object.values(state.wishlist.entities)) {
        w = w as IWishlist
        if (w.id != wishlistId) {
          let shouldKeep = w.products.some(p => p == productId)
          if (shouldKeep) {
            shouldRemove = false
            break
          }
        }
      }
    }

    if (shouldRemove) thunkApi.dispatch(removeProduct(productId))

    return {wishlistId, productId}
  },
)

// ------------------------------------------

// ---------------- WISHLIST SLICE ----------------

const initialState: IWishlistState = {
  ...wishlistsInitialState,
  products: productsAdapterInitialState,
  status: StoreStatus.IDLE,
}

const wishlistSlice = createSlice({
  name: WISHLIST_STORE,
  initialState,
  reducers: {
    setWishlist(state, action: ISetWishlistAction) {
      wishlistsAdapter.upsertOne(state, action.payload)
    },
    addProduct(state, action: IAddProductAction) {
      productsAdapter.upsertOne(state.products, action.payload)
    },
    removeProduct(state, action: IRemoveProductAction) {
      productsAdapter.removeOne(state.products, action.payload)
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IWishlistState>) => {
    builder.addCase(setWishlists.fulfilled, (state: IWishlistState, action: ISetWishlistsAction) => {
      wishlistsAdapter.setAll(state, action.payload)
    })
    builder.addCase(addProductToWishlist.fulfilled, (state: IWishlistState, action: IAddProductToWishlistAction) => {
      let products = state.entities[action.payload.wishlistId]?.products ?? []
      products.push(action.payload.product.id)
      wishlistsAdapter.updateOne(state, {
        id: action.payload.wishlistId,
        changes: {
          products: products,
        },
      })
    })
    builder.addCase(removeProductFromWishlist.fulfilled, (state: IWishlistState, action: IRemoveProductFromWishlistAction) => {
      let products = state.entities[action.payload.wishlistId]?.products ?? []
      products = products.filter(x => x != action.payload.productId)
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
} = wishlistsAdapter.getSelectors((state: RootState) => state.wishlist)

export const {
  selectIds: selectProductIds,
  selectEntities: selectProductEntities,
  selectAll: selectAllProducts,
  selectTotal: selectTotalProducts,
  selectById: selectProductById,
} = productsAdapter.getSelectors((state: RootState) => state.wishlist.products)

export const {
  useGetWishlistsQuery,
  useGetWishlistQuery,
} = wishlistExtendedServerApi

export const {setWishlist, addProduct, removeProduct} = wishlistSlice.actions
export default wishlistSlice.reducer
