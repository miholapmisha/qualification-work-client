import { useRef, useState, ChangeEvent, useEffect } from "react"
import Button from "../../../components/ui/Button"
import { Category, CategoryType } from "../../../types/category"
import { defaultRootFacultyPath } from "../common"

type FacultyProps = {
    defaultFaculty?: Category
    onSaveFaculty: (category: Category) => void
    onCancel: () => void,
}

const FacultyForm = ({ onSaveFaculty, onCancel, defaultFaculty }: FacultyProps) => {

    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const [faculty, setFaculty] = useState(defaultFaculty ? defaultFaculty : { _id: crypto.randomUUID(), name: '', path: defaultRootFacultyPath, categoryType: CategoryType.FACULTY })

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
                <Button classes="transition-all ease-out duration-300" disabled={saveDisabled} onClick={() => {
                    onSaveFaculty(faculty)
                }}>Save</Button>
            </div>
        </div>
    )
}

export default FacultyForm