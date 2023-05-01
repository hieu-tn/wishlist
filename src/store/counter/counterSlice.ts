import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit"
import { extraStatusReducers } from "../actions"


const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increaseCounter(state, action) {
      state.value += 1
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<any>) => {
    extraStatusReducers(builder)
  },
})

export const {increaseCounter} = counterSlice.actions
export default counterSlice.reducer
