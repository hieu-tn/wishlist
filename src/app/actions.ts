import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit"
import { UnknownAsyncThunkRejectedAction } from "@reduxjs/toolkit/dist/matchers"

import { IState } from "./models"
import { StoreStatus } from "../constants/store"


export const extraStatusReducers = (builder: ActionReducerMapBuilder<IState>) => {
  builder.addMatcher(action => action.type.endsWith("/pending"), (state: IState, action: PayloadAction) => {
    state.status = StoreStatus.LOADING
  })
  builder.addMatcher(action => action.type.endsWith("/fulfilled"), (state: IState, action: PayloadAction) => {
    state.status = StoreStatus.IDLE
  })
  builder.addMatcher(action => action.type.endsWith("/rejected"), (state: IState, action: UnknownAsyncThunkRejectedAction) => {
    state.status = StoreStatus.ERROR
    state.error = {
      action: action.type,
      message: action.error.message,
    }
  })
}
