import { useState } from "react"
import { MdKeyboardArrowRight, MdOutlineExpandMore } from "react-icons/md";
import { INavbar } from "@layout/admin/data";
import clsx from "clsx"
import * as _ from 'lodash'
import Image from "next/image"
import Link from "next/link"

interface IProp {
    isShow?: boolean, 
    navigation?: INavbar[]
}

const Sidebar = (props: IProp) =>
{
    const { isShow, navigation } = props
    const [sidebarState, setSidebarState] = useState(navigation)
    const style = {
        root: clsx('section-sidebar h-screen', isShow && isShow && 'customMenu'),
        sideHear: `sidebar-header center`,
        logoWrapper: `bg-admin-logo cursor-pointer`,
        logo: `w-full h-full`,
        sidebarContentWrapper: clsx('bg-sidebar'),
        sidebarContent: `text-white sidebar-items px-0`,
        bgSmall: `bg-sm-green`,
        menu: `w-full pt-5 py-3 bg-blue-600 sidebar-ul`,
        menuItem: `sidebar-li relative`,
        menuItems: `bg-neutral-100 list-contain`,
        iconMenu: `img-admin-icon`,
        textMenu: `item-text-color font-medium subpixel-antialiased text-left text-base px-2 self-center`,

        subMenuWrapper: `submenu-list`,
        boxTop: `custom-box-top`,
        boxBottom: `custom-box-bottom`
    }

    const openSubMenu = (index: number, isShow: boolean) =>
    {
        const mapNav = _.map(navigation, (el, i) =>
        {
            if (i === index)
            {
                return { ...el, showSubmenu: !isShow }
            }
            else
            {
                return { ...el, showSubmenu: false }
            }
        })
        setSidebarState(mapNav)
    }
    return (
        <div className={style.root} id="section-sidebar">
            <div className={style.sideHear}>
                <Link href="/admin/dashboard">
                    <a className={style.logoWrapper}>
                        <Image
                            width={50}
                            height={50}
                            src="https://i.pinimg.com/474x/35/d5/b1/35d5b18f87c4920f0bd4cb82a748d260.jpg"
                            className={style.logo}
                            // layout="fill"
                            alt="KhmerCareLogo"
                        />
                    </a>
                </Link>
                <div
                    className={clsx('closeIcone cursor-pointer d-md-none p-2', isShow ? 'd-block' : 'd-none')}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="#FFF"
                    >
                        <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
                    </svg>
                </div>
            </div>

            <div className={style.sidebarContentWrapper}>
                <div className={style.bgSmall}></div>
                <div className={style.sidebarContent}>
                    <ul className={style.menu} >
                        {
                            _.map(sidebarState, (menu, index) =>
                            {
                                return (
                                    menu?.items ? (
                                        <li key={menu.title} className={style.menuItem} >
                                            <div className={style.menuItems}>
                                                <div className="flex justify-between" onClick={() => openSubMenu(index, menu?.showSubmenu)}>
                                                    <div className="flex">
                                                        <Image
                                                            width={25}
                                                            height={25}
                                                            src={menu?.icon}
                                                            alt={menu?.title}
                                                            className={style.iconMenu}

                                                        />
                                                        <span className={style.textMenu}>{menu?.title}</span>
                                                    </div>


                                                    <div className="">
                                                        {
                                                            menu.showSubmenu ? (
                                                                <MdOutlineExpandMore size={25} className="float-right" color="black"/>
                                                            ) : (
                                                                <MdKeyboardArrowRight size={25} className="float-right" color="black" />
                                                            )
                                                        }
                                                        
                                                    </div>

                                                </div>

                                                {
                                                    menu.showSubmenu ? (
                                                        _.map(menu?.items, (subItem) => (
                                                            <div key={subItem?.href} className={style.subMenuWrapper}>
                                                                <Link href={subItem?.href}>
                                                                    <a>
                                                                        <span className={style.textMenu}>{subItem.title}</span>
                                                                    </a>
                                                                </Link>
                                                            </div>
                                                        ))
                                                    ) : null
                                                }

                                                <div className={style.boxTop}>
                                                    <div className="box-top-inner" />
                                                </div>

                                                <div className={style.boxBottom}>
                                                    <div className="box-bottom-inner" />
                                                </div>
                                            </div>
                                        </li>
                                    ) : (
                                        <li className={style.menuItem} key={index}>
                                            <div className={style.menuItems}>
                                                <Link href={menu?.href}>
                                                    <a>
                                                        <div className="flex">
                                                            <Image
                                                                width={25}
                                                                height={25}
                                                                src={menu?.icon}
                                                                alt={menu?.title}
                                                                className={style.iconMenu}

                                                            />
                                                            <span className={style.textMenu}>{menu?.title}</span>
                                                        </div>
                                                    </a>
                                                </Link>

                                                <div className={style.boxTop}>
                                                    <div className="box-top-inner" />
                                                </div>
                                                <div className={style.boxBottom}>
                                                    <div className="box-bottom-inner" />
                                                </div>
                                            </div>

                                        </li>
                                    )
                                )
                            })
                        }
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Sidebar