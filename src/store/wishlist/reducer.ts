import {createSlice} from "@reduxjs/toolkit"

const initialState: any = []

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: initialState,
  reducers: {
    addItem: (state, action: any) => {
      console.log(action)
      state.push(action.payload)
      // @ts-ignore
      // state.push({
      //   id: action.payload.id,
      //   text: action.payload.text,
      //   completed: false
      // })
    },
  }
})

export const { addItem } = wishlistSlice.actions
export default wishlistSlice.reducer
