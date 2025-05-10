import { useState } from "react"
import Button from "../../../components/common/Button"
import PenIcon from "../../../components/common/icons/PenIcon"
import { Category } from "../../../types/category"
import FacultyForm from "./FacultyForm"
import { Link, useLocation } from "react-router-dom"
import DetailsIcon from "../../../components/common/icons/DetailsIcon"
import Tooltip from "../../../components/common/Tooltip"

type FacultyCardProps = {
    faculty: Category,
    onEdit: (id: string, category: Category) => void
    onDelete: (id: string) => void
}

const FacultyCard = ({ faculty, onEdit, onDelete }: FacultyCardProps) => {

    const [edit, setEdit] = useState(false)
    const { pathname } = useLocation()

    const handleUpdateFaculty = (facultyData: Category) => {
        setEdit(false)
        onEdit(faculty._id, facultyData)
    }

    if (edit)
        return <FacultyForm onCancel={() => { setEdit(false) }} defaultFaculty={faculty}
            onSaveFaculty={(facultyData) => { handleUpdateFaculty(facultyData) }} />

    return (
        <div className="transition-discrete duration-200 ease-linear hover:scale-105 border-1 border-primary-400 w-full min-h-[128px] px-6 py-4 rounded-xl flex flex-col justify-between">
            <div className="w-full min-h-[60px] text-lg">
                <div className="outline-none w-full min-h-15 ">{faculty.name}</div>
            </div>
            <div className="flex justify-between items-center">
                <PenIcon onClick={() => setEdit(true)} width={'16px'} height={'16px'} className="cursor-pointer " />
                <div className="flex">
                    <Button onClick={() => onDelete(faculty._id)} className="hover:underline transition-all ease-out duration-30 cursor-pointer rounded px-4 py-2 text-red-600">Delete</Button>
                    <Link className="font-main" to={pathname + `/specialties/?facultyId=${faculty._id}`}>
                        <Tooltip text="view specialties" position="bottom">
                            <button className="transition-all ease-out duration-300 cursor-pointer flex items-center space-x-2 bg-primary-200 py-2 rounded px-4 hover:bg-primary-300">
                                <DetailsIcon width={"16px"} height={"16px"} />
                            </button>
                        </Tooltip>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FacultyCard
