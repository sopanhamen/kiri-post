import { IActionReturnType } from 'src/shared/interfaces/common'
import { UserProfile } from 'src/shared/models/user.model'
import { Dispatch } from 'redux'

import * as profileService from '../services/profile.service'

import {
    createUserProfileSuccess,
    CRUDUserProfileByIdRequest,
    getProfileByIdSuccess,
    getProfileListSuccess,
    getUserProfileRequest,
    setProfileInitialState,
    updateUserProfileByIdSuccess,
} from './profile.action-types'

type Return = IActionReturnType<UserProfile | undefined>
type FunctionReturn = (dispatch: Dispatch) => Promise<Return>

export function getUserProfileList(): FunctionReturn {
    return async function (dispatch: Dispatch): Promise<Return> {
        dispatch(getUserProfileRequest())

        try {
            const data = await profileService.getProfileList()

            return dispatch(getProfileListSuccess(data))
        } catch (e: unknown) {
            // handle error here how ever you want
            return dispatch(setProfileInitialState())
        }
    }
}

export function getUserProfileById(id: string): FunctionReturn {
    return async function (dispatch: Dispatch): Promise<Return> {
        dispatch(getUserProfileRequest())

        try {
            const data: any = await profileService.getProfileById(id)

            const payload: UserProfile = {
                ...data,
                clan: 'My Clan',
            }

            return dispatch(getProfileByIdSuccess(payload))
        } catch (e: unknown) {
            // handle error here how ever you want
            return dispatch(setProfileInitialState())
        }
    }
}

export function updateUserProfileById(payload: UserProfile): FunctionReturn {
    return async function (dispatch: Dispatch): Promise<Return> {
        dispatch(CRUDUserProfileByIdRequest())

        try {
            return dispatch(updateUserProfileByIdSuccess(payload))
        } catch (e: unknown) {
            // handle error here how ever you want
            return dispatch(setProfileInitialState())
        }
    }
}

export function createUserProfile(payload: UserProfile): FunctionReturn {
    return async function (dispatch: Dispatch): Promise<Return> {
        dispatch(CRUDUserProfileByIdRequest())

        try {
            const data = await profileService.createProfile(payload)

            return dispatch(createUserProfileSuccess(new UserProfile(data)))
        } catch (e: unknown) {
            // handle error here how ever you want
            return dispatch(setProfileInitialState())
        }
    }
}
