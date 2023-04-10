import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { CRAWLER_STORE, StoreStatus } from "constants/store"
import { AsyncThunkConfig } from "../models"
import { extraStatusReducers } from "../actions"
import { ICrawlerState, ISetKeywordAction } from "./crawlerModels"


export const setKeyword = createAsyncThunk<string, string, AsyncThunkConfig>(
  CRAWLER_STORE + "/setKeyword",
  async (keyword: string, thunkAPI: AsyncThunkConfig) => {
    return keyword
  },
)

const initialState: ICrawlerState = {
  keyword: "",
  matches: [],
  ids: [],
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
    extraStatusReducers(builder)
  },
})

export const {} = crawlerSlice.actions
export default crawlerSlice.reducer
