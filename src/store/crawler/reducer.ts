import {createSlice} from "@reduxjs/toolkit";
import {ICrawlerState} from "./models";
import {setKeywordAction} from './actions'

const initialState: ICrawlerState = {
  keyword: ''
}

const crawlerSlice = createSlice({
  name: 'crawler',
  initialState: initialState,
  reducers: {
    setKeyword: setKeywordAction
  }
})

export const {setKeyword}  = crawlerSlice.actions
export default crawlerSlice.reducer
