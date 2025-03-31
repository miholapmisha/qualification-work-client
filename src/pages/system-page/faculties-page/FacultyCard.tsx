import { useState } from "react"
import Button from "../../../components/ui/Button"
import DetailsIcon from "../../../components/ui/icons/DetailsIcon"
import PenIcon from "../../../components/ui/icons/PenIcon"
import { Category } from "../../../types/category"
import FacultyForm from "./FacultyForm"
import { useLocation, useNavigate } from "react-router-dom"

type FacultyCardProps = {
    faculty: Category,
    onEdit: (id: string, category: Category) => void
    onDelete: (id: string) => void
    // onCancel: () => void
}

const FacultyCard = ({ faculty, onEdit, onDelete }: FacultyCardProps) => {

    const [edit, setEdit] = useState(false)
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const handleUpdateFaculty = (facultyData: Category) => {
        setEdit(false)
        onEdit(faculty._id, facultyData)
    }

    if (edit)
        return <FacultyForm onCancel={() => { setEdit(false) }} defaultFaculty={faculty}
            onSaveFaculty={(facultyData) => { handleUpdateFaculty(facultyData) }} />

    return (
        <div className="transition-discrete duration-200 ease-linear hover:scale-105 border-1 border-primary-400 w-full max-w-[456px] min-h-[128px] px-6 py-4 rounded-xl flex flex-col justify-between">
            <div className="w-full min-h-[60px] text-lg">
                <div className="outline-none w-full min-h-15 ">{faculty.name}</div>
            </div>
            <div className="flex justify-between items-center">
                <PenIcon onClick={() => setEdit(true)} width={'16px'} height={'16px'} className="cursor-pointer " />
                {/* <DetailsIcon onClick={() => navigate(pathname + `/specialties/?facultyId=${faculty._id}`)} width={"18px"} height={"18px"} className="my-3 transition-all scale-110 ease-out duration-300 cursor-pointer hover:fill-cyan-900" /> */}
                <div className="flex">
                    <Button onClick={() => onDelete(faculty._id)} className="hover:underline transition-all ease-out duration-30 cursor-pointer rounded px-4 py-2 text-red-600">Delete</Button>
                    <Button onClick={() => navigate(pathname + `/specialties/?facultyId=${faculty._id}`)} className="transition-all ease-out duration-300 cursor-pointer flex items-baseline space-x-2 bg-primary-200 py-2 rounded px-4 hover:bg-primary-300">
                        <span>Details</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FacultyCard
