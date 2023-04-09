import {PayloadAction} from "@reduxjs/toolkit"

export interface ICrawlerState {
  keyword: string
}

export interface ISetKeywordAction extends PayloadAction<string> {}
