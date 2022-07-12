import { firebaseConfig } from '@shared/config/firebase.config'
import CMessages from '@shared/constant/message'
import { IActionReturnType } from '@shared/interfaces/common'
import { ILoginRequest, IUserRequest } from '@shared/models'
import api, { defaultHeader } from '@shared/services/api.service'
import ToastService from '@shared/services/toast.service'
import { RootState } from '@store/index'
import axios, { AxiosResponse } from 'axios'
import firebase from 'firebase'
import Cookies from 'js-cookie'
import { Dispatch } from 'redux'

import AuthActionType from './auth.action-type'

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

const AUTHORIZE = `v2/auth/authorize`
const PUBLIC_TOKEN = `v2/auth/public/tokens`
const FORGET_PASSWORD = `v2/auth/forget/passwords`
const REGISTER = `v2/auth/registers/tokens`
const REGISTER_USER = `v2/auth/registers`
const LOGIN = `v2/auth/login`
const PROFILE = `v2/auth/profiles`
const VERIFY_PHONE = 'v2/auth/verify/phones'
const baseURL = process.env.BaseURL



type Return = IActionReturnType<undefined>
type FunctionReturn = (dispatch: Dispatch) => Promise<Return>

const setRequesting = (payload: boolean) => {
    return (dispatch: Dispatch) => {
        dispatch({ type: AuthActionType.setRequesting(payload) })
    }
}

const setToggleLogin = (payload: boolean) => {
    return (dispatch: Dispatch) => {
        dispatch({ type: AuthActionType.setToggleLogin(payload) })
    }
}

const getAuthorize = () => {
    return () => {
        const Authorization = 'Bearer 1564bc66d33398c6ca5a2f8e1d4013bc8423a75f'
        const clientId = process.env.ClientID
        const headers = { ...defaultHeader, Authorization }

        return new Promise((resolve, reject) => {
            axios
                .post(AUTHORIZE, { clientId }, { headers, baseURL })
                .then((res) => resolve(res))
                .catch((err) => reject(err))
        })
    }
}

const getPublicToken = () => {
    return (dispatch: Dispatch) => {
        const authorize = () => dispatch(getAuthorize())
        return new Promise((resolve, reject) => {
            authorize()
                .then((res: AxiosResponse) => {
                    const token = `Bearer ${res?.data?.token}`
                    const headers = { ...defaultHeader, token }
                    axios
                        .post(PUBLIC_TOKEN, {}, { headers, baseURL })
                        .then((res) => {
                            const payload = res?.data?.accessToken
                            Cookies.set('publicToken', payload)
                            dispatch(AuthActionType.getPublicTokenType(payload))
                            resolve(res)
                        })
                        .catch((err) => reject(err))
                })
                .catch((err: unknown) => reject(err))
        })
    }
}

const registerToken = (token: string) => {
    return () => {
        return new Promise((resolve, reject) => {
            api.post(REGISTER, { token })
                .then((res) => resolve(res))
                .catch((err) => reject(err))
        })
    }
}

const registerNewUser = (payload: IUserRequest) => {
    return () => {
        return new Promise((resolve, reject) => {
            api.post(REGISTER_USER, payload)
                .then((res) => resolve(res))
                .catch((err) => reject(err))
        })
    }
}

const refreshFirebaseToken = () => {
    return (dispatch: Dispatch, getState: () => RootState) => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
        }
        const user = getState()?.auth?.user

        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged((firebaseUser) => {
                if (!firebaseUser) return
                firebase
                    .auth()
                    .currentUser?.getIdToken(true)
                    // !TODO: to avoid multi render
                    .then(async (accessToken) => {
                        const payload = {
                            // user,
                            accessToken,
                        }
                        dispatch(AuthActionType.loginAdminSuccess(payload))
                        Cookies.set('tokens', accessToken)
                        resolve(payload)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        })
    }
}

const login = (payload: ILoginRequest) => {
    return (dispatch: Dispatch) => {

        setRequesting(true)

        const publicToken = () => dispatch(getPublicToken())
        return new Promise((resolve, reject) => {
            publicToken()
                .then(() => {
                    api.post(LOGIN, payload)
                        .then(async (res) => {
                            const user = res?.data?.user

                            // LOGIN WITH FIREBASE USER
                            firebase
                                .auth()
                                .signInWithCustomToken(res?.data?.token)
                                .then(() => {
                                    // using this token for request API
                                    firebase
                                        .auth()
                                        .currentUser.getIdToken(true)
                                        .then((accessToken) => {
                                            const actionPayload = {
                                                user,
                                                accessToken,
                                            }
                                            dispatch(AuthActionType.loginAdminSuccess(actionPayload))
                                            Cookies.set('tokens', accessToken)
                                            setRequesting(false)
                                            resolve(res?.data)
                                        })
                                        .catch((firebaseErrors) => {
                                            ToastService.error(
                                                firebaseErrors?.message,
                                            )
                                            setRequesting(false)
                                            reject(firebaseErrors)
                                        })
                                })
                                .catch((errors) => {
                                    setRequesting(false)
                                    ToastService.error(errors?.message)
                                    reject(errors)
                                })
                        })
                        .catch((err) => {
                            setRequesting(false)
                            reject(err)
                        })
                })
                .catch((err: unknown) => {
                    reject(err)
                })
        })
    }
}

const forgetPassword = (body: string) => {
    return (dispatch: Dispatch) => {
        const publicToken = () => dispatch(getPublicToken())
        return new Promise((resolve, reject) => {
            publicToken()
                .then(() => {
                    api.post(FORGET_PASSWORD, body)
                        .then((res) => resolve(res))
                        .catch((err) => reject(err))
                })
                .catch((err: unknown) => reject(err))
        })
    }
}

const checkPhoneNumber = (phone: string) => {
    return (dispatch: Dispatch) => {
        const publicToken = () => dispatch(getPublicToken())
        return publicToken().then(() => {
            return api.post(VERIFY_PHONE, { phone })
        })
    }
}

const getProfile = () => {
    return (dispatch: Dispatch, getState: ()=> RootState) => {
        const accessToken = getState()?.auth?.accessToken
        return new Promise((resolve, reject) => {
            api.get(PROFILE)
                .then((res) => {
                    const user = res?.data
                    const payload = {
                        user,
                        accessToken,
                    }
                    dispatch(AuthActionType.loginAdminSuccess(payload))
                    resolve(res)
                })
                .catch((err: unknown) => {
                    const { message } = err?.response?.data
                    ToastService.error(
                        message || CMessages.Toastify.Unspecific_Error,
                    )
                    reject(err)
                })
        })
    }
}

const logout = () => {
    return (dispatch: Dispatch) => {
        Cookies.remove('tokens')
        dispatch(AuthActionType.createLogout)
        dispatch(getPublicToken())
        firebase.auth().signOut()
    }
}

const getCountryCode = () => {
    return () => {
        return new Promise((resolve, reject) => {
            api.get('v2/countries/ip')
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}

const AuthAction = {
    setRequesting,
    setToggleLogin,
    getCountryCode,
	forgetPassword,
    login,
    registerNewUser,
    getPublicToken,
    logout,
    refreshFirebaseToken,
	checkPhoneNumber
}
export default AuthAction
