import {createSlice} from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: 'foo',
  initialState: [],
  reducers: {
    todoAdded(state, action) {
      // @ts-ignore
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false
      })
    },
    todoToggled(state, action) {
      // @ts-ignore
      const todo = state.find(todo => todo.id === action.payload)
      // @ts-ignore
      todo.completed = !todo.completed
    }
  }
})

export const { todoAdded, todoToggled } = todosSlice.actions
export default todosSlice.reducer
