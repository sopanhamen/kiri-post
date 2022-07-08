import { combineReducers } from '@reduxjs/toolkit'

import visibilityFilter from './feature/featureSlice'
// import { AuthReducer, AuthState } from './auth/auth.reducers'
import { ProfileState, UserProfileReducer } from './profile/profile.reducers'
import { Todo } from './todo/mockData'
import { counterSlice } from './counter'
import { jsonTodosSlice } from './jsonTodos'
import { todosSlice } from './sample-todo'
import { selectedTodoSlice } from './selected-todo'


export interface StoreState {
    userProfile: ProfileState,
    todos: Todo,
    visibilityFilter: any
    // auth: AuthState

}

export const rootReducer = combineReducers({
    userProfile: UserProfileReducer,
    // todos: todos,
    visibilityFilter: visibilityFilter,
    todos: todosSlice.reducer,
    selectedTodo: selectedTodoSlice.reducer,
    counter: counterSlice.reducer,
    jsonTodos: jsonTodosSlice.reducer,
})
