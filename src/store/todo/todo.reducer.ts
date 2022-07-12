import { Action, createReducer } from '@reduxjs/toolkit'

import {
    addedTodo,
    decreaseTodo,
    increaseByAmount,
    increaseTodo,
} from './todo.action-type'

export interface TodoState {
    // todoList: Array<any>
    value: number
}

const initialState: TodoState = {
    // todoList: [],
    value: 0,
}
const counterReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(increaseTodo, (state) => {
            state.value++
        })
        .addCase(decreaseTodo, (state) => {
            state.value--
        })
        .addCase(increaseByAmount, (state, action) => {
            state.value += action.payload
        })
        .addCase(addedTodo, (state, action) => {
            return { ...state }
        })
})

export function CounterReducer(state: TodoState | undefined, action: Action) {
    return counterReducer(state, action)
}
