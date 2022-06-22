import { createAction } from '@reduxjs/toolkit'

export const setAuthInitialState = createAction(
    '[Set Auth Initial Value]',
    (props: boolean) => {
        return {
            payload: props,
        }
    },
)

export const setAuthRequest = createAction(
    '[Set Auth Request]',
    (isLoading: boolean) => {
        return {
            payload: isLoading,
        }
    },
)
export const getAuthRequest = createAction('[Get Auth Request]')

export const submitLoginRequest = createAction('[Set submit login request]')

export const getPublicTokenType = createAction(
    '[ Get public token ]',
    (payload: string) => {
        return {
            payload,
        }
    },
)
