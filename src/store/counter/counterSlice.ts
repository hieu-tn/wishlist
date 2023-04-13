import { createSlice } from "@reduxjs/toolkit"


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
})

export const {increaseCounter} = counterSlice.actions
export default counterSlice.reducer
