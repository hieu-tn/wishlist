import { ActionReducerMapBuilder, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { parseError } from "../../utils/exceptions"

import { CRAWLER_STORE, StoreStatus } from "constants/store"
import { RootState } from "../store"
import { useAppDispatch } from "../hooks"
import { AsyncThunkConfig } from "../models"
import { extraStatusReducers } from "../actions"
import { ICrawlerState, IFetchProvidersAction, IMatch, IProvider, ISetKeywordAction } from "./crawlerModels"


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

export const setKeyword = createAsyncThunk<string, string, AsyncThunkConfig>(
  CRAWLER_STORE + "/setKeyword",
  async (keyword: string, thunkApi: AsyncThunkConfig) => {
    // useAppDispatch
    return keyword
  },
)

export const fetchProviders = createAsyncThunk<Array<IProvider>, undefined, AsyncThunkConfig>(
  CRAWLER_STORE + "/getProviders",
  async (_, thunkApi) => {
    try {
      // @todo switch to createApi
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
  matches: matchesInitialState,
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

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllProviders,
  selectById: selectProviderById,
  selectIds: selectProviderIds,
} = providersAdapter.getSelectors((state: RootState) => state.crawler.providers)

export const {} = crawlerSlice.actions
export default crawlerSlice.reducer
