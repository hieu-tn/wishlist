import { PayloadAction } from "@reduxjs/toolkit"

import { IState } from "../../app/models"
import { IProductItem } from "modules/home/models/product-item.models"


export interface ICrawlerState extends IState {
  keyword: string
  matches: Array<IMatch>
  ids: string[]
}

export interface ISetKeywordAction extends PayloadAction<string> {
}

// export interface IMatch extends IProductItem {}
export interface IMatch {
}
