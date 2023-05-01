import { ActionReducerMapBuilder, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TOASTS_STORE } from "../../constants/store"
import { IActionLoading, IToastsState } from "./toastsModels"
import { UnknownAsyncThunkRejectedAction } from "@reduxjs/toolkit/dist/matchers"


const getActionName = (action: string): string => {
  let name = action.split("/")
  name.pop()
  return name.join("/")
}

const removeLoadingAction = (action: string, actions: Array<IActionLoading>): Array<IActionLoading> => {
  return actions.filter(a => a.action !== action)
}

// ---------------- TOASTS SLICE ----------------

const initialState: IToastsState = {
  loadings: [],
  successes: [],
  errors: [],
}

const toasts = createSlice({
  name: TOASTS_STORE,
  initialState,
  reducers: {},
  extraReducers: ((builder: ActionReducerMapBuilder<IToastsState>) => {
    builder.addMatcher(action => action.type.endsWith("/pending"), (state: IToastsState, action: PayloadAction) => {
      state.loadings.push({
        action: getActionName(action.type),
        params: action.payload,
      })
    })
    builder.addMatcher(action => action.type.endsWith("/fulfilled"), (state: IToastsState, action: PayloadAction) => {
      let name = getActionName(action.type)
      state.successes.push({
        action: name,
        response: action.payload,
      })
      state.loadings = removeLoadingAction(name, state.loadings)
    })
    builder.addMatcher(action => action.type.endsWith("/rejected"), (state: IToastsState, action: UnknownAsyncThunkRejectedAction) => {
      let name = getActionName(action.type)
      let message = action.payload
      if (message === undefined) {
        message = action.error.message
      }
      state.errors.push({
        action: name,
        message: message,
      })
      state.loadings = removeLoadingAction(name, state.loadings)
    })
  }),
})

// ------------------------------------------

export const {} = toasts.actions
export default toasts.reducer
