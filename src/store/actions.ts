import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit"
import { UnknownAsyncThunkRejectedAction } from "@reduxjs/toolkit/dist/matchers"

import { IState } from "./models"
import { StoreStatus } from "../constants/store"


export const extraStatusReducers = (builder: ActionReducerMapBuilder<IState>) => {
  builder.addMatcher(action => action.type.endsWith("/pending"), (state: IState, action: PayloadAction) => {
    state.status = StoreStatus.LOADING
  })
  builder.addMatcher(action => action.type.endsWith("/fulfilled"), (state: IState, action: PayloadAction) => {
    state.status = StoreStatus.SUCCESS
  })
  builder.addMatcher(action => action.type.endsWith("/rejected"), (state: IState, action: UnknownAsyncThunkRejectedAction) => {
    state.status = StoreStatus.ERROR
    let message = action.payload
    if (message === undefined) {
      message = action.error.message
    }
    state.error = {
      action: action.type,
      message: message,
    }
  })
}
