import { AuthProfile } from '@shared/models'
import api from '@shared/services/api.service'

const AUTH = 'v2/auth/login'

export const login = async (payload: AuthProfile) => {
    try {
        const res = await api.post(AUTH, payload)
        return { res, isError: false }
    } catch (error) {
        return { isError: true, error }
    }
}
