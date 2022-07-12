import { createAction } from '@reduxjs/toolkit'

const loginAdminSuccess = createAction('[ AUTH ] Success', (props) => {
    return { payload: props }
})

const setAuthInitialState = createAction('[Auth] set  init state')
const createLogout = createAction('[Auth] logout ')
const setRequesting = createAction('[Auth] set is requesting', (payload: boolean) => {
    return { payload }
})
const setToggleLogin = createAction('[Auth] set toggle login ', (payload: boolean) => {
    return { payload }
})
const getPublicTokenType = createAction(
    '[Auth get public token',
    (payload: string) => {
        return { payload }
    },
)

const AuthActionType = {
    setAuthInitialState,
    loginAdminSuccess,
    setRequesting,
    createLogout,
    getPublicTokenType,
    setToggleLogin,
}

export default AuthActionType
