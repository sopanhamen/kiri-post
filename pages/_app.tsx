import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import AdminLayout from '@layout/admin/AdminLayout'
import ClientLayout from '@layout/client/ClientLayout'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PersistGate } from 'redux-persist/integration/react'
import { persister, store } from 'store'

import '@styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const router = useRouter()

    const routerPath = (): JSX.Element => {
        if (router.pathname.startsWith('/admin')) {
            return (
                <AdminLayout>
                    <Component {...pageProps} />
                </AdminLayout>
            )
        }

        if (
            router.pathname.startsWith('/login') ||
            router.pathname.startsWith('/forgot-password') ||
            router.pathname.startsWith('/reset-password')
        )
            return <Component {...pageProps} />

        if (router.pathname.startsWith('/test-app'))
            return <Component {...pageProps} />

        return (
            <ClientLayout>
                <Component {...pageProps} />
            </ClientLayout>
        )
    }

    return (
        <Provider store={store}>
            <PersistGate persistor={persister} loading={null}>
                {/* <LayoutLoading /> */}
                <ToastContainer />
                <Head>
                    <title>Digital Economy Platform</title>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <link
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css"
                    />
                </Head>
                {pageProps.protected}
                {routerPath()}
            </PersistGate>
        </Provider>
    )
}

export default MyApp
