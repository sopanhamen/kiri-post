import { Fragment } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import Configuration from '@shared/config/configuration'
import { Page } from '@shared/interfaces/Page'
import { persister, store } from '@store/index'
import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import NProgress from 'nprogress'
import { PersistGate } from 'redux-persist/integration/react'

import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'

type IProps = AppProps & {
    Component: Page
}

function MyApp({ Component, pageProps }: IProps): JSX.Element {
    const Layout = Component.layout ?? Fragment

    // config load progress bar when asd
    NProgress.configure({ showSpinner: false })
    Router.events.on('routeChangeStart', () => NProgress.start())
    Router.events.on('routeChangeComplete', () => NProgress.done())
    Router.events.on('routeChangeError', () => NProgress.done())

    return (
        <>
            <Provider store={store}>
                <PersistGate persistor={persister} loading={null}>
                    <Configuration />
                    <ToastContainer />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </PersistGate>
            </Provider>
        </>
    )
}

export default MyApp
