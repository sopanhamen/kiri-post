import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Todo } from './mockData'
import _ from 'lodash'
import { AppDispatch, AppThunk } from '../index'

const initialState: Todo[] = []

const todoSlice = createSlice({
    name: 'todos',
    initialState: initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.push(action.payload)
        },
        toggleTodo: (state, action: PayloadAction<Todo>) => {
            const findTodo = _.find(
                state,
                (todo) => todo.id === action.payload.id,
            )

            if (findTodo) {
                findTodo.completed = !findTodo.completed
            }
        },
    },
})

export const { toggleTodo } = todoSlice.actions

export const addTodo =
    (text: string): AppThunk =>
    async (dispatch: AppDispatch) => {
        const newTodo: Todo = {
            id: Math.random().toString(36).substr(2, 9), // https://gist.github.com/gordonbrander/2230317,
            completed: false,
            text: text,
        }
        dispatch(todoSlice.actions.addTodo(newTodo))
    }

export default todoSlice.reducer
