/* eslint-disable react/display-name */
import { useStore } from 'react-redux'
import Loading from '@shared/components/Loading/Loading'
import EAuth from '@shared/enum/auth.enum'
import { useRouter } from 'next/router'

const withAuthAdmin = (WrappedComponent) => {
    return (props) => {
        const router = useRouter()
        const store = useStore()
        const user = store?.getState()?.auth?.user
        const StaticLoading = () => <Loading isLoading />

        const isAdmin = user?.permissions?.includes(
            EAuth?.EAdminPermissions?.LOGIN,
        )

        if (typeof window !== 'undefined') {
            if (!isAdmin || !user) {
                router?.push('/auth/admin/login')
                return <StaticLoading />
            }

            return <WrappedComponent {...props} />
        }
        return <StaticLoading />
    }
}

export default withAuthAdmin
