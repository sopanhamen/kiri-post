import React from 'react'

interface IProps {
    children: React.ReactNode
}
export default function BlankLayout(props: IProps) {
    const style = {
        wrapper: `relative`,
        container: `before:content-[''] before:bg-green-400 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://i.pinimg.com/474x/69/a5/a7/69a5a7f10120094f53cb967c0b431692.jpg')] before:bg-cover before:bg-center before:opacity-30 before:blur-sm`,
        contentWrapper: `flex h-screen relative justify-center flex-wrap items-center`,
        copyContainer: `w-1/2`,
        title: `relative text-white text-[46px] font-semibold`,
        description: `text-[#8a939b] container-[400px] text-2xl mt-[0.8rem] mb-[2.5rem]`,
        ctaContainer: `flex`,
        accentedButton: ` relative text-lg font-semibold px-12 py-4 bg-[#2181e2] rounded-lg mr-5 text-white hover:bg-[#42a0ff] cursor-pointer`,
        button: ` relative text-lg font-semibold px-12 py-4 bg-[#363840] rounded-lg mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer`,
        cardContainer: `rounded-[3rem]`,
        infoContainer: `h-20 bg-[#313338] p-4 rounded-b-lg flex items-center text-white`,
        author: `flex flex-col justify-center ml-4`,
        name: ``,
        infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
        cardContentWrapper: `relative`,
    }

    const { children } = props
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.contentWrapper}>
                    <div className={style.copyContainer}>{children}</div>
                </div>
            </div>
        </div>
    )
}
