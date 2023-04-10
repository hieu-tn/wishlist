import { createSlice } from "@reduxjs/toolkit"

import { CRAWLER_STORE } from "constants/store"
import { ICrawlerState } from "./crawlerModels"


const initialState: ICrawlerState = {
  keyword: "",
  matches: [],
}

export const crawlerSlice = createSlice({
  name: CRAWLER_STORE,
  initialState,
  reducers: {},
})

export const {} = crawlerSlice.actions
export default crawlerSlice.reducer
