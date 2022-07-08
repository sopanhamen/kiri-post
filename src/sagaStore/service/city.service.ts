import api from '@shared/services/api.service'

const CITY = `/cities`

export const fetchCities = async () => {
    try {
        const res = await api.get(CITY, { params: { _page: 1, _limit: 10 } })
        return { res, isError: true }
    } catch (error) {
        return { error, isError: true }
    }
}
