import { ChangeEvent, useActionState, useEffect, useRef, useState } from "react"
import Button from "../../../components/ui/Button"
import { Category, CategoryType } from "../../../types/category"
import PenIcon from "../../../components/ui/icons/PenIcon"
import DetailsIcon from "../../../components/ui/icons/DetailsIcon"
import Loader from "../../../components/ui/Loader"
import AlertBlock from "../../../components/ui/AlertBlock"

const facultiesMock: Category[] = [
    {
        id: "1",
        name: 'Computer Science',
        type: CategoryType.FACULTY,
        path: '/faculties/computer-science'
    },
    {
        id: "2",
        name: 'Engineering',
        type: CategoryType.FACULTY,
        path: '/faculties/engineering'
    },
    {
        id: "3",
        name: 'Mathematics',
        type: CategoryType.FACULTY,
        path: '/faculties/mathematics'
    },
    {
        id: "4",
        name: 'Physics',
        type: CategoryType.FACULTY,
        path: '/faculties/physics'
    },
    {
        id: "5",
        name: 'Chemistry',
        type: CategoryType.FACULTY,
        path: '/faculties/chemistry'
    },
    {
        id: "6",
        name: 'Biology',
        type: CategoryType.FACULTY,
        path: '/faculties/biology'
    },
    {
        id: "7",
        name: 'Economics',
        type: CategoryType.FACULTY,
        path: '/faculties/economics'
    },
    {
        id: "8",
        name: 'Law',
        type: CategoryType.FACULTY,
        path: '/faculties/law'
    },
    {
        id: "9",
        name: 'Psychology',
        type: CategoryType.FACULTY,
        path: '/faculties/psychology'
    },
    {
        id: "10",
        name: 'Philosophy',
        type: CategoryType.FACULTY,
        path: '/faculties/philosophy'
    },
    {
        id: "11",
        name: 'Sociology',
        type: CategoryType.FACULTY,
        path: '/faculties/sociology'
    },
    {
        id: "12",
        name: 'History',
        type: CategoryType.FACULTY,
        path: '/faculties/history'
    },
    {
        id: "13",
        name: 'Geography',
        type: CategoryType.FACULTY,
        path: '/faculties/geography'
    },
    {
        id: "14",
        name: 'Medicine',
        type: CategoryType.FACULTY,
        path: '/faculties/medicine'
    },
    {
        id: "15",
        name: 'Education',
        type: CategoryType.FACULTY,
        path: '/faculties/education'
    },
];

export const FacultyPage = () => {

    const [showAddFacultyForm, setShowFaculyForm] = useState<boolean>(false)
    const [faculties, setFaculties] = useState<Category[]>([])

    const handleAddFaculty = (faculty: Category) => {
        setShowFaculyForm(false)
        setFaculties(prevFaculties => ([...prevFaculties, faculty]))
    }

    const handleEditFaculty = (id: string, faculty: Category) => {
        const facultyToUpdateIndex = faculties.findIndex(faculty => faculty.id === id)
        if (facultyToUpdateIndex !== -1) {

            setFaculties(prevFaculties => {
                const updatedFaculties = [...prevFaculties]
                updatedFaculties[facultyToUpdateIndex] = { ...faculty, id }
                return updatedFaculties
            })
        }
    }

    const handleDelete = (id: string) => {
        setFaculties(prevFaculties => prevFaculties.filter(faculty => faculty.id !== id))
    }

    return (
        <>
            <AlertBlock absolute={true} alertMessage={"Unable to modify"} onCloseAlert={() => { }} />
            <div className="flex-1 flex flex-col space-y-4">
                <h1 className="text-2xl">Select faculty for detailed information</h1>
                <div className="flex-1 flex flex-col items-center pt-10 pb-5 border-t-1 border-primary-400 w-full space-y-4">
                    <div className="flex-auto min-w-full flex flex-col font-secondary">
                        <div className="relative max-w-full flex justify-center items-center">
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-x-8 gap-y-6">

                            {faculties?.length > 0 && faculties.map(faculty =>
                            (<FacultyCard key={faculty.id}
                                onDelete={(id) => handleDelete(id)}
                                onEdit={(id, data) => { handleEditFaculty(id, data) }}
                                faculty={faculty} />))}
                            {/* <LoaderCard /> */}
                            {showAddFacultyForm && <FacultyForm onCancel={() => setShowFaculyForm(false)} onSaveFaculty={handleAddFaculty} />}
                        </div>
                        {(faculties?.length <= 0 && !showAddFacultyForm) && <h1 className="m-auto text-primary-300 text-4xl lowercase">no faculties in your system yet</h1>}
                        {/* {faculties?.length && } */}
                        {/* <h1 className="m-auto text-primary-300 text-4xl lowercase">no faculties in your system yet</h1> */}
                        {/* <Loader classes="m-auto" size={{height: '88px', width: '88px'}}/> */}
                    </div>
                    <div className="max-w-[132px]">
                        <Button onClick={() => setShowFaculyForm(true)}>+ Add faculty</Button>
                    </div>
                </div>
            </div>
            {/* <AddFacultyModal isOpen={openAddFacultyModal} onClose={() => setOpenAddFacutlyModal(false)}>
            </AddFacultyModal> */}
        </>
    )
}

type FacultyProps = {
    defaultFaculty?: Category
    onSaveFaculty: (category: Category) => void
    onCancel: () => void,
}

const FacultyForm = ({ onSaveFaculty, onCancel, defaultFaculty }: FacultyProps) => {

    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const [faculty, setFaculty] = useState(defaultFaculty ? defaultFaculty : { id: crypto.randomUUID(), name: '', path: '', type: CategoryType.FACULTY })

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setFaculty(prevFaculty => ({ ...prevFaculty, name: event.target.value }))
    }

    useEffect(() => {
        if (textAreaRef.current)
            textAreaRef.current.focus()
    }, [])

    const saveDisabled = !faculty.name.trim();

    return (
        <div className="scale-105 border-1 border-primary-400 w-full max-w-[456px] min-h-[128px] px-6 py-4 rounded-xl flex flex-col justify-between">
            <div className="w-full max-h-[60px] text-lg">
                <textarea value={faculty.name} onChange={handleInputChange} ref={textAreaRef} placeholder="Write a name" className="outline-none 
                                                                                                                                    border-primary-400 
                                                                                                                                    resize-none overflow-auto 
                                                                                                                                    w-full min-h-15 ">
                </textarea>
            </div>
            <div className="flex justify-end space-x-4">
                <Button onClick={onCancel} className="transition-all ease-out duration-300 text-primary-800 cursor-pointer rounded px-4  hover:text-red-600">Cancel</Button>
                <Button classes="transition-all ease-out duration-300 disabled:bg-primary-400" disabled={saveDisabled} onClick={() => {
                    onSaveFaculty(faculty)
                }}>Save</Button>
            </div>
        </div>
    )
}

type FacultyCardProps = {
    faculty: Category,
    onEdit: (id: string, category: Category) => void
    onDelete: (id: string) => void
    // onCancel: () => void
}

const FacultyCard = ({ faculty, onEdit, onDelete }: FacultyCardProps) => {

    const [edit, setEdit] = useState(false)
    

    const handleUpdateFaculty = (facultyData: Category) => {
        setEdit(false)
        onEdit(faculty.id, facultyData)
    }

    if (edit)
        return <FacultyForm onCancel={() => { setEdit(false) }} defaultFaculty={faculty}
            onSaveFaculty={(facultyData) => { handleUpdateFaculty(facultyData) }} />

    return (
        <div className="transition-discrete duration-200 ease-linear hover:scale-105 border-1 border-primary-400 w-full max-w-[456px] min-h-[128px] px-6 py-4 rounded-xl flex flex-col justify-between">
            <div className="w-full min-h-[60px] text-lg">
                <div className="outline-none w-full min-h-15 ">{faculty.name}</div>
            </div>
            <div className="flex justify-between">
                <DetailsIcon width={"18px"} height={"18px"} className="my-3 transition-all scale-110 ease-out duration-300 cursor-pointer hover:fill-cyan-900" />
                <div className="flex">
                    <Button onClick={() => onDelete(faculty.id)} className="hover:underline transition-all ease-out duration-30 cursor-pointer rounded px-4 py-2 text-red-600">Delete</Button>
                    <Button onClick={() => setEdit(true)} className="transition-all ease-out duration-300 cursor-pointer flex items-baseline space-x-2 bg-primary-200 rounded py-2 px-4 hover:bg-primary-300">
                        <span>Edit</span>
                        <PenIcon width={'14px'} height={'14px'} />
                    </Button>
                </div>
            </div>
        </div>
    )
}

const LoaderCard = () => {
    return (
        <div className="transition-discrete duration-200 ease-linear hover:scale-105 border-1 border-primary-400 w-full max-w-[456px] min-h-[128px] px-6 py-4 rounded-xl flex justify-center items-center">
            <Loader size={{ width: '54px', height: '54px' }} />
        </div>
    )
}