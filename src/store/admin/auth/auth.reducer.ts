import {
    Action,
    createEntityAdapter,
    createReducer,
    EntityAdapter,
    EntityState,
} from '@reduxjs/toolkit'
import { IProps } from '@shared/interfaces/common'
import { AuthProfile } from '@shared/models'

import AuthActionType from './auth.action-type'

interface InitialState {
    isLoading: boolean
    isSubmitting: boolean,
    toggleLogin: boolean,
    publicToken: string
    user: AuthProfile | undefined | string
    accessToken: string
}
const defaultState: InitialState = {
    isLoading: false,
    isSubmitting: false,
    publicToken: '',
    user: '',
    accessToken: '',
    toggleLogin: false
}

export const authAdapter: EntityAdapter<AuthProfile> =
    createEntityAdapter<AuthProfile>({
        selectId: (x) => x.id,
    })
const initialState: InitialState = authAdapter.getInitialState(defaultState)

export interface AuthState extends EntityState<AuthProfile>, InitialState {}

const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase( AuthActionType.setRequesting,(state, { payload }: IProps<boolean>) => { return { ...state, isLoading: payload}})

        .addCase(AuthActionType.getPublicTokenType, (state, { payload}: IProps<string>) => { return {...state , publicToken: payload }})

        .addCase(AuthActionType.setToggleLogin , (state, { payload}: IProps<boolean>) => { return {...state,toggleLogin: payload}})

        .addCase(AuthActionType.loginAdminSuccess, (state, { payload}) => { return {...state,...payload }})
        
        .addCase(AuthActionType.createLogout, ()=> { return { ...initialState }})

        .addDefaultCase((state: InitialState) => {
            return { ...state }
        })
})

export function AuthReducer(state: AuthState | undefined, action: Action) {
    return authReducer(state, action)
}
