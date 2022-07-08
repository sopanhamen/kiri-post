import React from 'react'
import AdminNavbar from '@component/element/AdminNavbar'
import Sidebar from '@component/element/SiiderBar'

import navigation from './data'

interface IProps
{
    children: React.ReactNode
}
const style = {
    wrapper: `flex w-full flex-wrap `,
    containerWrapper: `h-screen bg-white flex flex-col w-full`,
    container: `p-3`,
    bodyContain: `w-full h-screen`,
    bodyContainer: ` kiri-container`
}

const AdminLayout = (props: IProps) =>
{
    const { children } = props

    const { admin } = navigation

    const handleClickMenu = () =>
    {
        console.log("sample")
    }
    return (
        <div className={style?.wrapper}>

            <Sidebar navigation={admin} />

            <div className={style.containerWrapper} id="layout-admin">

                <AdminNavbar handleClickMenu={handleClickMenu} />

                <div id="page-body-content" className={style.bodyContain}>
                    <div className={style.bodyContainer}>
                        {children}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminLayout
