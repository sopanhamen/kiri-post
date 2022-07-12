/* eslint-disable react/display-name */
import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Page } from '@shared/interfaces/Page'
import Cookies from 'js-cookie'
import Router from 'next/router'

import EAuth from '../enum/auth.enum'

const withAuthClient = (Component: Page) => {
    return () => {
        const Layout = Component.layout ?? Fragment

        const user = useSelector((state) => state?.auth?.user)
        const isAuthenticated =
            user?.permissions?.includes(EAuth.EClientPermissions.LOGIN) ||
            user?.permissions?.includes(EAuth.EAdminPermissions.LOGIN)
        const token = Cookies.get('tokens')

        useEffect(() => {
            if (!token) Router.push('/')
        }, [isAuthenticated, token])

        if (!isAuthenticated && !user) return null

        return (
            <Layout>
                <Component />
            </Layout>
        )
    }
}

export default withAuthClient
