import { combineReducers } from '@reduxjs/toolkit'

// import { AuthReducer, AuthState } from './auth/auth.reducers'
import { ProfileState, UserProfileReducer } from './profile/profile.reducers'
import { Todo } from './todo/mockData'


import todos from './todo/todoSlice'
import visibilityFilter from './feature/featureSlice'
import { todosSlice } from './sample-todo'
import { selectedTodoSlice } from './selected-todo'
import { counterSlice } from './counter'
import { jsonTodosSlice } from './jsonTodos'


// export interface StoreState {
//     userProfile: ProfileState,
//     todos: Todo,
//     visibilityFilter: any
//     // auth: AuthState
    
// }

export const rootReducer = combineReducers({
    userProfile: UserProfileReducer,
    // todos: todos,
    visibilityFilter: visibilityFilter,
    todos: todosSlice.reducer,
    selectedTodo: selectedTodoSlice.reducer,
    counter: counterSlice.reducer,
    jsonTodos: jsonTodosSlice.reducer,
})
