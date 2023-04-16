import { EntityState, PayloadAction } from "@reduxjs/toolkit"

import { IState } from "../models"
import { IProductItem } from "modules/home/models/productItem.model"


export interface ICrawlerState extends IState {
  keyword: string
  providers: EntityState<IProvider>
  matches: EntityState<IMatch>
}

export interface ISetKeywordAction extends PayloadAction<string> {}

export interface IProvider {
  id: number
  name: string
  code: string
}

export interface IFetchProvidersAction extends PayloadAction<Array<IProvider>> {}

// export interface IMatch extends IProductItem {}
export interface IMatch {
  id: string
}

export interface IFetchMatchedProducts extends PayloadAction<Array<IMatch>> {}
