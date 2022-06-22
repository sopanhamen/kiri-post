import {
    Action,
    createEntityAdapter,
    createReducer,
    EntityAdapter,
    EntityState,
} from '@reduxjs/toolkit'
import { CommonState } from '@shared/interfaces/common'
import { AuthProfile } from '@shared/models/auth.model'

import {
    getAuthRequest,
    setAuthInitialState,
    setAuthRequest,
    submitLoginRequest,
} from './auth.action-type'

interface InitialState extends CommonState {
    publicToken: string
    accessToken: string
    backUrl: string
}

export interface AuthState extends EntityState<AuthProfile>, InitialState {}

const defaultState: InitialState = {
    isFetching: false,
    isSubmitting: false,
    publicToken: '',
    accessToken: '',
    backUrl: '',
}

// Create Adapter
export const authAdapter: EntityAdapter<AuthProfile> =
    createEntityAdapter<AuthProfile>({ selectId: (x) => x.id })

//define default state
const initialState: AuthState = authAdapter.getInitialState(defaultState)

//create auth reducer
const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setAuthInitialState, (state) => ({
            ...state,
            ...defaultState,
        }))
        .addCase(setAuthRequest, (state, { payload }) => {
            const newState = { ...state }
            return authAdapter.updateOne(newState, { isFetching: true })
        })
        .addCase(getAuthRequest, (state) => ({
            ...state,
            isFetching: true,
        }))
        .addCase(submitLoginRequest, (state) => ({
            ...state,
        }))
})

export const AuthReducer = (state: AuthState | undefined, action: Action) => {
    return authReducer(state, action)
}
