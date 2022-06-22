import { Alert } from '@material-tailwind/react'
import { Breadcrumbs } from '@material-tailwind/react'
import { NextPage } from 'next/types'
const Home: NextPage = () => {
    const objClass = {
        wrapper: ``,
    }
    return (
        <div className={objClass.wrapper}>
            <div className="flex flex-col gap-2">
                <Alert variant="filled">
                    A simple filled alert for showing message.
                </Alert>
                <Alert variant="gradient">
                    A simple gradient alert for showing message.
                </Alert>

                <Breadcrumbs>
                    <a href="#" className="opacity-60">
                        Docs
                    </a>
                    <a href="#" className="opacity-60">
                        Components
                    </a>
                    <a href="#">Breadcrumbs</a>
                </Breadcrumbs>
            </div>
        </div>
    )
}

export default Home
