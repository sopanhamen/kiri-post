import AdminLayout from '@layout/admin/AdminLayout'

const Index = () => {
    const style = {
        container: `container`,
    }
    return (
        <div className={style.container}>
            <h1 className="text-black"> Hello world</h1>
            <h1 className="text-black"> Hello world</h1>
            <h1 className="text-black"> Hello world</h1>
            <h1 className="text-black"> Hello world</h1>
            <h1 className="text-black"> Hello world</h1>
            <h1 className="text-black"> Hello world</h1>
        </div>
    )
}
Index.layout = AdminLayout

export default Index
