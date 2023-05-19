import { ActionReducerMapBuilder, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"

import { TOASTS_STORE } from "../../constants/store"
import { IToastItem, IToastsState, ToastItemType } from "./toastsModels"
import { UnknownAsyncThunkRejectedAction } from "@reduxjs/toolkit/dist/matchers"
import { RootState } from "../store"


const getActionName = (action: string): string => {
  let name = action.split("/")
  name.pop()
  return name.join("/")
}

// ---------------- ADAPTERS ----------------

const toastsAdapter = createEntityAdapter<IToastItem>({
  selectId: t => t.id,
  // sortComparer: (a, b) => a.id.localeCompare(b.id),
})

// ------------------------------------------

// ---------------- TOASTS SLICE ----------------

const initialState: IToastsState = toastsAdapter.getInitialState()

const toasts = createSlice({
  name: TOASTS_STORE,
  initialState,
  reducers: {},
  extraReducers: ((builder: ActionReducerMapBuilder<IToastsState>) => {
    builder.addMatcher(action => !action.type.startsWith("api") && action.type.endsWith("/pending"), (state: IToastsState, action: PayloadAction) => {
      toastsAdapter.addOne(state, {
        id: uuidv4(),
        name: getActionName(action.type),
        message: action.payload,
        type: ToastItemType.LOADING,
      })
    })
    builder.addMatcher(action => !action.type.startsWith("api") && action.type.endsWith("/fulfilled"), (state: IToastsState, action: PayloadAction) => {
      toastsAdapter.addOne(state, {
        id: uuidv4(),
        name: getActionName(action.type),
        message: action.payload,
        type: ToastItemType.SUCCESS,
      })
    })
    builder.addMatcher(action => !action.type.startsWith("api") && action.type.endsWith("/rejected"), (state: IToastsState, action: UnknownAsyncThunkRejectedAction) => {
      toastsAdapter.addOne(state, {
        id: uuidv4(),
        name: getActionName(action.type),
        message: action.payload,
        type: ToastItemType.ERROR,
      })
    })
  }),
})

// ------------------------------------------

//getSelectors creates these selectors and rename them with aliases using destructuring
export const {
  selectIds: selectToastIds,
  selectEntities: selectToastEntities,
  selectAll: selectAllToasts,
  selectTotal: selectTotalToasts,
  selectById: selectToastById,
} = toastsAdapter.getSelectors((state: RootState) => state.toasts)

export const {} = toasts.actions
export default toasts.reducer
