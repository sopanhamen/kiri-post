import {
    Action,
    createEntityAdapter,
    createReducer,
    EntityAdapter,
    EntityState,
} from '@reduxjs/toolkit'
import { CommonState, IArrayProps, IProps } from '@shared/interfaces/common'
import { UserProfile } from '@shared/models/user.model'

import {
    createUserProfileSuccess,
    CRUDUserProfileByIdRequest,
    getProfileByIdSuccess,
    getProfileListSuccess,
    getUserProfileRequest,
    setProfileInitialState,
    updateUserProfileByIdSuccess,
} from './profile.action-types'

interface InitialState extends CommonState {}

export interface ProfileState extends EntityState<UserProfile>, InitialState {}

const defaultState: InitialState = {
    isFetching: false,
    isSubmitting: false,
}

export const profileAdapter: EntityAdapter<UserProfile> =
    createEntityAdapter<UserProfile>({
        selectId: (x) => x.id,
    })

const initialState: ProfileState = profileAdapter.getInitialState(defaultState)

const userProfileReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setProfileInitialState, (state) => ({
            ...state,
            ...defaultState,
        }))
        .addCase(getUserProfileRequest, (state) => ({
            ...state,
            isFetching: true,
        }))
        .addCase(
            getProfileListSuccess,
            (state, { payload }: IArrayProps<UserProfile>) => {
                // set new state
                const newState = { ...state, isFetching: false }

                // set the new entities
                return profileAdapter.setAll(newState, payload)
            },
        )
        .addCase(
            getProfileByIdSuccess,
            (state, { payload }: IProps<UserProfile>) => {
                // set new state
                const newState = { ...state, isFetching: false }

                // set the new entities
                return profileAdapter.upsertOne(newState, payload)
            },
        )
        .addCase(CRUDUserProfileByIdRequest, (state) => ({
            ...state,
            isSubmitting: true,
        }))
        .addCase(
            updateUserProfileByIdSuccess,
            (state, { payload }: IProps<UserProfile>) => {
                // set new state
                const newState = { ...state, isSubmitting: false }

                // set the new entities
                return profileAdapter.updateOne(newState, {
                    id: payload.id,
                    changes: payload,
                })
            },
        )
        .addCase(
            createUserProfileSuccess,
            (state, { payload }: IProps<UserProfile>) => {
                console.log('payload', payload)
                // set new state
                const newState = { ...state, isSubmitting: false }

                // set the new entities
                return profileAdapter.addOne(newState, payload)
            },
        )
})

export function UserProfileReducer(
    state: ProfileState | undefined,
    action: Action,
) {
    return userProfileReducer(state, action)
}
