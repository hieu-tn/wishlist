import { EntityState, PayloadAction } from "@reduxjs/toolkit"

import { IState } from "../models"
import { IProductItem } from "modules/home/models/product-item.models"


export interface ICrawlerState extends IState {
  keyword: string
  providers: EntityState<IProvider>
  matches: {
    ids: string[]
    entities: Array<IMatch>
  }
}

export interface ISetKeywordAction extends PayloadAction<string> {
}

// export interface IMatch extends IProductItem {}
export interface IMatch {
}

export interface IProvider {
  id: number
  name: string
  code: string
}

export interface IFetchProvidersAction extends PayloadAction<Array<IProvider>> {
  
}
