import { combineReducers } from '@reduxjs/toolkit'

import { AuthReducer, AuthState } from './auth/auth.reducers'
import { ProfileState, UserProfileReducer } from './profile/profile.reducers'

export interface StoreState {
    userProfile: ProfileState
    auth: AuthState
}

export const rootReducer = combineReducers<StoreState>({
    userProfile: UserProfileReducer,
    auth: AuthReducer,
})
