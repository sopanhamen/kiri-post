import AdminLayout from "@layout/admin/AdminLayout"

const Dashboard = () => {

    const style = {
        container: `container`
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
Dashboard.layout = AdminLayout;

export default Dashboard