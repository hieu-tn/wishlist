import { PayloadAction } from "@reduxjs/toolkit"
import { IProductItem } from "modules/home/models/product-item.models"


export interface ICrawlerState {
  keyword: string
  matches: Array<IMatch>
}

// export interface ISetKeywordAction extends PayloadAction<string> {}

// export interface IMatch extends IProductItem {}
export interface IMatch {
}
