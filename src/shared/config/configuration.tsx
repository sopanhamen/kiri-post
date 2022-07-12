import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import api from '@shared/services/api.service'
import AuthAction from '@store/admin/auth/auth.action'
import { AppDispatch } from '@store/index'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import moment from 'moment'
import Head from 'next/head'
import { useRouter } from 'next/router'

import CMessages from '../constant/message'
import useDebounce from '../hook/use-deboun'
import socketService from '../services/socket.service'
import ToastService from '../services/toast.service'

const invalidMessages = [
    'INVALID.PUBLIC.EXPIRED',
    'INVALID.USER.EXPIRED',
    'INVALID.TOKEN.MISSING',
    'INVALID.PERMISSION.ACCESS',
    'id must be a UUID',
]

// banned routes to show smart-app-banner
const bannedRoutesSmartAppBanner = [
    'aba-payway',
    'terms-service',
    'privacy-policy',
]

const Configuration = (props) => {
    const { getPublicToken, logout, refreshFirebaseToken,  publicToken, user, accessToken } = props
    const [errMsg, setErrMsg] = useState(null)
    const [showErr, setShowErr] = useState(false)
    const router = useRouter()

	// const auth = useSelector(authRequestSelector());
	// console.log("auth", auth)
    // const publicToken = useSelector((state) => state?.auth?.publicToken)
	
    // const user = useSelector((state) => state?.auth?.user)
    // const accessToken = useSelector((state) => state?.auth?.accessToken)

	console.log("user",user);
	console.log("publicToken", publicToken)

    // before request api (temporary use)
    const requestInterceptors = () =>
        api.interceptors.request.use(
            async (config) => {
                const publicToken = Cookies.get('publicToken')
                const token = Cookies.get('tokens')
                const locale = Cookies.get('locale')

                // set new headers for language translation
                config.headers['x-language'] = locale || 'en'

                if (publicToken) {
                    const exp = jwt_decode(publicToken)?.exp
                    const isExpired = moment().unix() - exp > 0
                    if (isExpired) {
                        const res = await getPublicToken()
                        console.log(res?.data?.accessToken)
                        if (res?.data?.accessToken) {
                            config.headers[
                                'publicToken'
                            ] = `Bearer ${res?.data?.accessToken}`
                            Cookies.set('publicToken', res?.data?.accessToken)
                        }
                    } else {
                        config.headers['publicToken'] = `Bearer ${publicToken}`
                    }
                }

                if (token) {
                    const exp = jwt_decode(token)?.exp
                    const isExpired = moment().unix() - exp > 0
                    if (isExpired) {
                        const res = await refreshFirebaseToken()
                        if (res?.accessToken) {
                            config.headers.authorization = `Bearer ${res?.accessToken}`
                            Cookies.set('tokens', res?.accessToken)
                        }
                    } else {
                        config.headers.authorization = `Bearer ${token}`
                    }
                }

                return config
            },
            (error) => {
                return Promise.reject(error)
            },
        )

    // after request or result from api
    const responseInterceptors = () =>
        api.interceptors.response.use(
            (res) => {
                setErrMsg('')
                return res
            },
            (err) => {
                //   check with message
                const message = err?.response?.data?.message

                // check with status code
                const statusCode = err?.response?.data?.statusCode
                if (statusCode === 403) checkingRedirect()
                if (statusCode !== 403 && !invalidMessages?.includes(message)) {
                    setErrMsg(message)
                    setShowErr((pre) => !pre)
                } else {
                    setErrMsg(null)
                }
                return Promise.reject(err)
            },
        )

    useEffect(() => {
        requestInterceptors()
        responseInterceptors()
        return () => {
            api.interceptors.request.eject(requestInterceptors)
            api.interceptors.response.eject(responseInterceptors)
        }
    }, [])

    const checkingRedirect = () => {
        const publicToken = Cookies.get('publicToken')
        if (!publicToken)
            getPublicToken().then(() => {
                if (typeof window !== undefined)
                    router?.reload(window?.location?.pathname)
            })
    }

    const contains = () => {
        let value = 0
        bannedRoutesSmartAppBanner?.forEach((route) => {
            value = value + router?.pathname?.includes(route)
        })
        return value === 1
    }

    // toast message
    useDebounce(
        () => {
            if (!errMsg) return
            ToastService.error(
                errMsg ? t(errMsg) : CMessages.Toastify.Unspecific_Error,
            )
        },
        [errMsg, showErr],
        5,
    )

    useEffect(() => {
        if (!publicToken) getPublicToken()

        // connect socket
        socketService.on('connect', () => {
            // checking connection status
            // console.log("SOCKET CONNECTED!", socketService.id);
        })

        socketService.on('disconnect', (message) => {
            // console.log("disconnect reason: ", message);
            // if (reason === "io server disconnect") {
            // the disconnection was initiated by the server, you need to reconnect manually
            // socketService.connect();
            // }
            // else the socket will automatically try to reconnect
        })
    }, [])

    const tokens = Cookies.get('tokens')

    useEffect(() => {
        // use this setTimeout to to logout, since redux-persist rehydrate was delay
        setTimeout(() => {
            if (typeof window !== 'undefined' && !tokens) logout()
        }, 25)
    }, [tokens])

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                {/* for smart banner */}
                {!contains() ? (
                    <>
                        <meta
                            name="apple-itunes-app"
                            content="app-id=1611668831"
                        />
                        <meta
                            name="google-play-app"
                            content="app-id=com.khmercare.apps"
                        />
                        <link
                            rel="apple-touch-icon"
                            href="https://storage.googleapis.com/khmer-care-dev-bucket/assets/images/logo.png"
                        />
                        <link
                            rel="android-touch-icon"
                            href="https://storage.googleapis.com/khmer-care-dev-bucket/assets/images/logo.png"
                        />
                    </>
                ) : null}
            </Head>

            <ToastContainer />
        </>
    )
}

const mapStateToProps = (state) => {
    const { publicToken, user, accessToken } = state?.auth
    return { publicToken, user, accessToken }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    const { getPublicToken, logout, refreshFirebaseToken } = AuthAction
    return {
        getPublicToken: () => dispatch(getPublicToken()),
        logout: () => dispatch(logout()),
        refreshFirebaseToken: () => dispatch(refreshFirebaseToken()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Configuration)
