import { createReducer } from '@reduxjs/toolkit'

import { addedTodo, decreaseTodo, increaseTodo } from './todo.action-type'

interface TodoState {
    todoList: Array<any>
    value: number
}

const initialState = {
    todoList: [],
    value: 0,
}
const counterReducer: any = createReducer(initialState, (builder) => {
    builder
        .addCase(increaseTodo, (state) => {
            state.value++
        })
        .addCase(decreaseTodo, (state) => {
            state.value--
        })
        .addCase(addedTodo, (state, action) => {
            return { ...state }
        })
})
