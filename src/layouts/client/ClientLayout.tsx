import React from 'react'

interface IProps {
    children: React.ReactNode
}
const ClientLayout = (props: IProps) => {
    const { children } = props

    const style = {
        wrapper: `bg-slate-50`
    }
    return (
        <div className={ style.wrapper}>
            {children}
        </div>)
}
export default ClientLayout
