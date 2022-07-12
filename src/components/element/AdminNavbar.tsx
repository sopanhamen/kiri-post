import { Button, Typography } from '@material-tailwind/react'

interface IProps {
    handleClickMenu?: () => void
}
const AdminNavbar = (props: IProps) => {
    const { handleClickMenu } = props

    const style = {
        navWrapper: `flex flex-nowrap w-full kiri-navbar position-fixed`,
    }

    const icon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 opacity-75"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
            />
        </svg>
    )

    return (
        <div className={style.navWrapper} id="section-navbar">
            <div className="flex flex-wrap justify-start w-full py-4 px-8 backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 border border-white/80 bg-white text-white mx-auto ">
                <div className="container flex items-center justify-between text-blue-grey-900">
                    <Typography
                        as="a"
                        href="#"
                        variant="small"
                        className="mr-4 cursor-pointer py-1.5 font-normal"
                    >
                        Material Tailwind
                    </Typography>
                    <ul className="flex items-center gap-6">
                        <Typography
                            as="li"
                            variant="small"
                            className="p-1 font-normal"
                        >
                            <a className="flex items-center">
                                Pages&nbsp;{icon}
                            </a>
                        </Typography>
                        <Typography
                            as="li"
                            variant="small"
                            className="p-1 font-normal"
                        >
                            <a className="flex items-center">
                                Account&nbsp;{icon}
                            </a>
                        </Typography>
                        <Typography
                            as="li"
                            variant="small"
                            className="p-1 font-normal"
                        >
                            <a className="flex items-center">
                                Blocks&nbsp;{icon}
                            </a>
                        </Typography>
                        <Typography
                            as="li"
                            variant="small"
                            className="p-1 font-normal"
                        >
                            <a className="flex items-center">
                                Docs&nbsp;{icon}
                            </a>
                        </Typography>
                    </ul>
                    <Button variant="gradient" size="sm">
                        Buy Now
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AdminNavbar
