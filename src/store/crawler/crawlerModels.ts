import { EntityState, PayloadAction } from "@reduxjs/toolkit"

import { IState } from "../models"
import { PROVIDERS } from "../../constants/providers"


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

export interface ISetProvidersAction extends PayloadAction<Array<IProvider>> {}

export interface IMatch {
  id: string
  name: string,
  description?: string,
  regularPrice: string,
  provider: PROVIDERS
}

export interface ISetMatchesAction extends PayloadAction<Array<IMatch>> {}
