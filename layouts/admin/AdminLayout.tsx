import React from 'react'

interface IProps {
    children: React.ReactNode
}

const AdminLayout = (props: IProps) => {
    const { children } = props
    return <div>{children}</div>
}

export default AdminLayout
