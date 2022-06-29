import ClientLayout from '@layout/client/ClientLayout'
import { Breadcrumbs } from '@material-tailwind/react'
import BasicButton from '@shared/components/Button/BasicButton'

const Index = () => {
    const objClass = {
        wrapper: `m-5 `,
    }
    console.log('testtasdasd')
    return (
        <div className={objClass.wrapper}>
            <div className="flex flex-col gap-2">
                <Breadcrumbs>
                    <a href="#" className="opacity-60">
                        Docs
                    </a>
                    <a href="#" className="opacity-60">
                        Components Welcome new project
                    </a>
                    <a href="#">Breadcrumbs</a>
                </Breadcrumbs>

                <BasicButton
                    label="Button"
                    onClick={() => console.log('hello')}
                />
            </div>
        </div>
    )
}

Index.layout = ClientLayout

export default Index
