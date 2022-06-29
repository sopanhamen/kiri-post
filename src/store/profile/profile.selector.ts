import { createSelector } from '@reduxjs/toolkit'
import { UserProfile } from 'src/shared/models/user.model'

import { StoreState } from '../root-reducer'

import { profileAdapter } from './profile.reducers'

type SelectorEntity<S> = (state: StoreState) => S[]

type Selector<S> = (state: StoreState) => S

const { selectById } = profileAdapter.getSelectors()

export const getUserProfileState = (state: StoreState) => state.userProfile

export const selectUserProfileIsFetching = (): Selector<
    boolean | undefined
> => {
    return createSelector(getUserProfileState, (state) => state.isFetching)
}

export const selectUserProfiles = (): SelectorEntity<
    UserProfile | undefined
> => {
    return createSelector(getUserProfileState, (state) =>
        Object.values(state.entities),
    )
}

export const selectUserProfileById = (
    id: string,
): Selector<UserProfile | undefined> => {
    return createSelector(getUserProfileState, (state) => selectById(state, id))
}

export const selectUserProfileIsSubmitting = (): Selector<
    boolean | undefined
> => {
    return createSelector(getUserProfileState, (state) => state.isSubmitting)
}
