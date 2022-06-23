import ClientLayout from '@layout/client/ClientLayout'
import { Breadcrumbs } from '@material-tailwind/react'

const Index = () => {
    const objClass = {
        wrapper: ``,
    }
    return (
        <div className={objClass.wrapper}>
            <div className="flex flex-col gap-2">
                <Breadcrumbs>
                    <a href="#" className="opacity-60">
                        Docs
                    </a>
                    <a href="#" className="opacity-60">
                        Components Welcome github pipeline 
                    </a>
                    <a href="#">Breadcrumbs</a>
                </Breadcrumbs>
            </div>
        </div>
    )
}

Index.layout = ClientLayout

export default Index
