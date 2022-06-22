import { AuthProfile } from '@shared/models/auth.model'
import api, { defaultHeader } from '@shared/services/api.service'
import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios'

const baseURL = process.env.BASE_URL

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

const loginService = async (payload: AuthProfile) => {
    try {
        const res: AxiosResponse = await api.post(LOGIN, payload)
        return { ...res, isError: false }
    } catch (error: unknown) {
        return { error, isError: true }
    }
}

const getPublicTokenService = async (
    headers: AxiosRequestHeaders,
    baseURL: string,
) => {
    try {
        const res: AxiosResponse = await axios.post(PUBLIC_TOKEN, null, {
            headers,
            baseURL,
        })
        return { ...res, isError: false }
    } catch (error) {
        return { error, isError: true }
    }
}

const getAuthorizeService = async () => {
    const Authorization = 'Bearer 1564bc66d33398c6ca5a2f8e1d4013bc8423a75f'
    const clientId = process.env.ClientID
    const headers = { ...defaultHeader, Authorization }
    try {
        const res: AxiosResponse = await axios.post(
            AUTHORIZE,
            { clientId },
            { headers, baseURL },
        )
        return { ...res, isError: false }
    } catch (error) {
        return { error, isError: true }
    }
}

const AuthService = {
    loginService,
    getPublicTokenService,
    getAuthorizeService,
}

export default AuthService
