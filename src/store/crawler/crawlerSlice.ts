import { ActionReducerMapBuilder, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"

import { CRAWLER_STORE, StoreStatus } from "constants/store"
import { RootState } from "../store"
import { AsyncThunkConfig } from "../models"
import { extraStatusReducers } from "../actions"
import serverApi from "../api/serverApi"
import { ICrawlerState, IMatch, IProvider, ISetKeywordAction, ISetMatchesAction, ISetProvidersAction } from "./crawlerModels"


const providersAdapter = createEntityAdapter<IProvider>({
  selectId: provider => provider.id,
  sortComparer: (a, b) => a.code.localeCompare(b.code),
})
const providersInitialState = providersAdapter.getInitialState()

const matchesAdapter = createEntityAdapter<IMatch>({
  selectId: m => m.id,
  sortComparer: (a, b) => a.id.localeCompare(b.id),
})
const matchesInitialState = matchesAdapter.getInitialState()

export const crawlerExtendedServerApi = serverApi.injectEndpoints({
  endpoints: builder => ({
    getProviders: builder.query<Array<IProvider>, any>({
      query: () => "/get-providers.json",
      async onQueryStarted(_, {dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry, updateCachedData}) {
        const {data} = await queryFulfilled
        dispatch(setProviders(data))
      },
      providesTags: (result, error, arg) => {
        return result ?
          [...result.map(({id}) => ({type: "Provider" as const, id})), {type: "Provider", id: "LIST"}]
          :
          [{type: "Provider", id: "LIST"}]
      },
    }),
    getMatches: builder.query<Array<IMatch>, string>({
      query: keyword => `/get-matched-products.json?keyword=${ keyword }`,
      async onQueryStarted(_, {dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry, updateCachedData}) {
        const {data} = await queryFulfilled
        dispatch(setMatches(data))
      },
      providesTags: (result, error, arg) => {
        return result ?
          [...result.map(({id}) => ({type: "Match" as const, id})), {type: "Match", id: "LIST"}]
          :
          [{type: "Match", id: "LIST"}]
      },
    }),
  }),
})

export const setKeyword = createAsyncThunk<string, string, AsyncThunkConfig>(
  CRAWLER_STORE + "/setKeyword",
  async (keyword, thunkApi) => {
    thunkApi.dispatch(crawlerExtendedServerApi.endpoints.getMatches.initiate(keyword))
    return keyword
  },
)

const initialState: ICrawlerState = {
  keyword: "",
  providers: providersInitialState,
  matches: matchesInitialState,
  status: StoreStatus.IDLE,
  error: null,
}

export const crawlerSlice = createSlice({
  name: CRAWLER_STORE,
  initialState,
  reducers: {
    setProviders(state: ICrawlerState, action: ISetProvidersAction) {
      providersAdapter.setAll(state.providers, action.payload)
    },
    setMatches(state: ICrawlerState, action: ISetMatchesAction) {
      matchesAdapter.setAll(state.matches, action.payload)
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<ICrawlerState>) => {
    builder.addCase(setKeyword.fulfilled, (state: ICrawlerState, action: ISetKeywordAction) => {
      state.keyword = action.payload
    })
    extraStatusReducers(builder)
  },
})

//getSelectors creates these selectors and rename them with aliases using destructuring
export const {
  selectIds: selectProviderIds,
  selectEntities: selectProviderEntities,
  selectAll: selectAllProviders,
  selectTotal: selectTotalProviders,
  selectById: selectProviderById,
} = providersAdapter.getSelectors((state: RootState) => state.crawler.providers)

//getSelectors creates these selectors and rename them with aliases using destructuring
export const {
  selectIds: selectMatchIds,
  selectEntities: selectMatchEntities,
  selectAll: selectAllMatches,
  selectTotal: selectTotalMatches,
  selectById: selectMatchById,
} = matchesAdapter.getSelectors((state: RootState) => state.crawler.matches)

export const {
  useGetProvidersQuery,
  useGetMatchesQuery,
} = crawlerExtendedServerApi

export const {setProviders, setMatches} = crawlerSlice.actions
export default crawlerSlice.reducer
