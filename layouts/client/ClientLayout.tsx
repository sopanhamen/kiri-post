import React from 'react'

interface IProps {
    children: React.ReactNode
}
const ClientLayout = (props: IProps) => {
    const { children } = props
    return <div>{children}</div>
}
export default ClientLayout
