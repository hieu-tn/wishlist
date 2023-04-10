import { createSlice } from "@reduxjs/toolkit"

import { CRAWLER_STORE } from "constants/store"
import { ICrawlerState, ISetKeywordAction } from "./crawlerModels"


const initialState: ICrawlerState = {
  keyword: "",
  matches: [],
}

export const crawlerSlice = createSlice({
  name: CRAWLER_STORE,
  initialState,
  reducers: {
    setKeyword: (state, action: ISetKeywordAction) => {
      return {
        ...state,
        keyword: action.payload,
      }
    },
  },
})

export const {setKeyword} = crawlerSlice.actions
export default crawlerSlice.reducer
