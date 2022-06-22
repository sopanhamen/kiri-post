import { firebaseConfig } from '@shared/config/firebase.config'
import { IActionReturnType } from '@shared/interfaces/common'
import { AuthProfile, IAuthorize } from '@shared/models/auth.model'
import api, { defaultHeader } from '@shared/services/api.service'
import ToastService from '@shared/services/toast.service'
import AuthService from '@store/services/auth.service'
import firebase from 'firebase/compat/app'
import { Dispatch } from 'redux'

import { setAuthRequest } from './auth.action-type'

const baseURL = `${process.env.BaseURL}`

const AUTHORIZE = `v2/auth/authorize`
const PUBLIC_TOKEN = `v2/auth/public/tokens`
const FORGET_PASSWORD = `v2/auth/forget/passwords`
const VERIFY = `v2/auth/verify/codes`
const RESET_PASSWORD = `v2/auth/reset/passwords`
const ORGANIZATION_RESET_PASSWORD = `v2/auth/set/new-passwords`
const REGISTER = `v2/auth/registers/tokens`
const REGISTER_USER = `v2/auth/registers`
const LOGIN = `v2/auth/login`
const PROFILE = `v2/auth/profiles`
const SPONSORS = 'v2/organizations'
const VERIFY_PHONE = 'v2/auth/verify/phones'

type Return = IActionReturnType<AuthProfile | undefined>
type FunctionReturn = (dispatch: Dispatch) => Promise<Return>

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const setRequesting = (payload: boolean) => {
    return (dispatch: Dispatch) => {
        dispatch(setAuthRequest(payload))
    }
}

const loginAction = (payload: AuthProfile) => {
    return (dispatch: Dispatch) => {
        setRequesting(true)
    }
}

const login = (payload: AuthProfile): FunctionReturn => {
    return (dispatch: Dispatch): Promise<Return> => {
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
                                        .currentUser?.getIdToken(true)
                                        .then((accessToken) => {
                                            const actionPayload = {
                                                user,
                                                accessToken,
                                            }
                                            dispatch({
                                                type: AuthActionTypes.LOGIN,
                                                payload: actionPayload,
                                            })
                                            // Cookies.set("tokens", accessToken);
                                            setRequesting(false)
                                            // dispatch(setRequesting(false));
                                            resolve(res?.data)
                                        })
                                        .catch((firebaseErrors) => {
                                            ToastService.error(
                                                firebaseErrors?.message,
                                            )
                                            // dispatch(setRequesting(false));
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

// const getAuthorize =  () => {
// 	return async() => {
// 		const Authorization = "Bearer 1564bc66d33398c6ca5a2f8e1d4013bc8423a75f";
// 		const clientId = process.env.ClientID;
// 		const headers = { ...defaultHeader, Authorization };

// 		return new Promise((resolve, reject) => {
// 			axios
// 				.post(AUTHORIZE, { clientId }, { headers, baseURL })
// 				.then((res) => resolve(res))
// 				.catch((err: unknown) => reject(err));
// 		});
// 	};
// };

const getPublicToken = () => {
    return async (dispatch: Dispatch) => {
        const authorizeRes: any = await AuthService.getAuthorizeService()

        const data: IAuthorize = authorizeRes.data
        const token = `Bearer ${data?.token}`

        const headers = { ...defaultHeader, token }

        const publicTokenRes: any = await AuthService.getPublicTokenService(
            headers,
            token,
        )

        if (!publicTokenRes?.isError) {
            const payload = publicTokenRes?.data?.accessToken
            dispatch()
        }

        // return new Promise( async (resolve, reject) => {

        // 	authorize().then((res) => {

        // 			const token = `Bearer ${res?.data?.token}`;
        // 			const headers = { ...defaultHeader, token };

        // 			axios
        // 				.post(PUBLIC_TOKEN, null, { headers, baseURL })
        // 				.then((res) => {
        // 					const payload = res?.data?.accessToken;
        // 					// Cookies.set("publicToken", payload);
        // 					dispatch(getPublicTokenType(payload))
        // 					resolve(res);
        // 				})
        // 				.catch((err: unknown) => reject(err));
        // 		})
        // 		.catch((err: unknown) => reject(err));
        // });
    }
}

const AuthAction = {
    login,
}

export default AuthAction
