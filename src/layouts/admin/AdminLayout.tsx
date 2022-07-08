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
    containerWrapper: `h-screen w-5/6 bg-white flex flex-col`,
    container: `p-3 w-full`,
    bodyContain: ` w-full `,
    bodyContainer: `bg-indigo-200 m-2`
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

            <div className={style.containerWrapper}>

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
