import { createAction } from '@reduxjs/toolkit'
import { UserProfile } from '@shared/models/user.model'

export const setProfileInitialState = createAction(
    '[Set Profile Initial Value]',
)

export const getUserProfileRequest = createAction('[Get Profile List] Request')

export const getProfileListSuccess = createAction(
    '[Get Profile List] Success',
    (props: any) => {
        return { payload: props.map((e: any) => new UserProfile(e)) }
    },
)

export const getProfileByIdSuccess = createAction(
    '[Get Profile By Id] Success',
    (props: any) => {
        return { payload: new UserProfile(props) }
    },
)

export const CRUDUserProfileByIdRequest = createAction(
    '[Update Profile By Id] Request',
)

export const updateUserProfileByIdSuccess = createAction(
    '[Update Profile By Id] Success',
    (props: any) => {
        return { payload: { ...props } }
    },
)

export const createUserProfileSuccess = createAction(
    '[Create Profile] Success',
    (props: UserProfile) => {
        return { payload: props }
    },
)
