import { Outlet } from "react-router-dom";

const SystemPage = () => {

    return (
        <div className="flex-auto rounded-2xl bg-primary-50 overflow-y-auto p-16 space-y-10 flex flex-col">
            <h1 className="font-secondary text-6xl">University categories</h1>
            <Outlet/>
        </div>
    )
}



export default SystemPage