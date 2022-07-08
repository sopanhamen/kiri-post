import React from 'react'

interface IProps {
    children: React.ReactNode
}
const ClientLayout = (props: IProps) => {
    const { children } = props

    const style = {
        wrapper: `bg-slate-50 p-10`,
    }
    return <div className={style.wrapper}>{children}</div>
}
export default ClientLayout
