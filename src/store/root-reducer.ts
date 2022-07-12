import { combineReducers } from '@reduxjs/toolkit'

import { AuthReducer, AuthState } from './admin/auth/auth.reducer'
import { ProfileState, UserProfileReducer } from './profile/profile.reducers'
import { CounterReducer, TodoState } from './todo/todo.reducer'

export interface StoreState {
    userProfile: ProfileState
    auth: AuthState
    counter: TodoState
}

export const rootReducer = combineReducers({
    auth: AuthReducer,
    userProfile: UserProfileReducer,
    counter: CounterReducer,
})
