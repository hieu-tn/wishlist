import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit"
import axios from "axios"
import { parseError } from "../../utils/exceptions"

import { CRAWLER_STORE, StoreStatus } from "constants/store"
import { AsyncThunkConfig } from "../models"
import { extraStatusReducers } from "../actions"
import {
  ICrawlerState,
  IFetchProvidersAction,
  IProvider,
  ISetKeywordAction,
} from "./crawlerModels"


export const setKeyword = createAsyncThunk<string, string, AsyncThunkConfig>(
  CRAWLER_STORE + "/setKeyword",
  async (keyword: string, thunkApi: AsyncThunkConfig) => {
    return keyword
  },
)

const providersAdapter = createEntityAdapter<IProvider>({
  selectId: provider => provider.id,
  sortComparer: (a, b) => a.code.localeCompare(b.code),
})
const providersInitialState = providersAdapter.getInitialState()

export const fetchProviders = createAsyncThunk<Array<IProvider>, undefined, AsyncThunkConfig>(
  CRAWLER_STORE + "/getProviders",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(`${ process.env.REACT_APP_SERVER_URL }/get-providers.json`)
      const data = response.data
      return data
    } catch (e) {
      return thunkApi.rejectWithValue(parseError(e))
    }
  },
)

const initialState: ICrawlerState = {
  keyword: "",
  providers: providersInitialState,
  matches: {
    ids: [],
    entities: [],
  },
  status: StoreStatus.IDLE,
  error: null,
}

export const crawlerSlice = createSlice({
  name: CRAWLER_STORE,
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ICrawlerState>) => {
    builder.addCase(setKeyword.fulfilled, (state: ICrawlerState, action: ISetKeywordAction) => {
      state.keyword = action.payload
    })
    builder.addCase(fetchProviders.fulfilled, (state: ICrawlerState, action: IFetchProvidersAction) => {
      providersAdapter.setAll(state.providers, action.payload)
    })
    extraStatusReducers(builder)
  },
})

// export const {
//   useGetProvidersQuery,
// } = crawlerExtendedServerApi

// returns the query result object
// export const selectProvidersResult = crawlerExtendedServerApi.endpoints.getProviders.select

// // Creates memoized selector
// const selectProvidersData = createSelector(
//   selectProvidersResult,
//   providersResult => providersResult.entities // normalized state object with ids & entities
// )
//
// //getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//   selectAll: selectAllProviders,
//   selectById: selectProviderById,
//   selectIds: selectProviderIds,
// } = providersAdapter.getSelectors(state => selectProvidersData(selectProvidersResult) ?? providersInitialState)

export const {} = crawlerSlice.actions
export default crawlerSlice.reducer
