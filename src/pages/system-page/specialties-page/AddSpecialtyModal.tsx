import Modal from "../../../components/ui/Modal"
import Input from "../../../components/ui/Input"
import Button from "../../../components/ui/Button"
import { useState } from "react"

const availableDegrees: Degree[] = [
    { id: 1, name: "Bachelor", courses: 4 },
    { id: 2, name: "Master", courses: 2 },
    { id: 3, name: "Ph.D", courses: 4 }
]

export type Degree = {
    id: number,
    name: string,
    courses: number
}

export type SpecialtyCreationData = {
    specialtyName: string,
    selectedDegrees: Degree[],
}

type AddSpecialtyModal = {
    isOpen: boolean,
    onClose: () => void,
    onSave: (data: SpecialtyCreationData) => void
}

const AddSpecialtyModal = ({ isOpen, onClose, onSave }: AddSpecialtyModal) => {

    const [creationData, setCreationData] = useState<SpecialtyCreationData>({
        specialtyName: '',
        selectedDegrees: [] as Degree[],
    })

    const changeSpecialtyName = (name: string) => {
        setCreationData(prevData => ({ ...prevData, specialtyName: name }))
    }

    const selectDegree = (selectedDegree: Degree) => {
        setCreationData(prevCreationData => {

            const isNew = !prevCreationData.selectedDegrees.some(degree => degree.id === selectedDegree.id)
            if (isNew) {
                return {
                    ...prevCreationData,
                    selectedDegrees: [...prevCreationData.selectedDegrees, selectedDegree]
                }
            }

            return {
                ...prevCreationData,
                selectedDegrees: prevCreationData.selectedDegrees.filter(degree => degree.id !== selectedDegree.id)
            }
        })
    }

    const handleYearChange = (degreeId: number, value: number) => {
        setCreationData(data => {
            const updatedYear = data.selectedDegrees.map(degree => {
                if (degreeId === degree.id) {
                    return { ...degree, courses: value }
                }
                return degree
            })
            return { ...data, selectedDegrees: updatedYear }
        })
    }

    const isDegreeSelected = (degreeId: number) => {
        return creationData.selectedDegrees.some(degree => degree.id === degreeId)
    }

    return (
        <Modal isOpen={isOpen} onClose={() => {
            onClose()
        }}>
            <div className="w-full min-w-[568px] h-full max-h-[456px] p-4 space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Add New Specialty</h2>
                <Input label="Specialty name" onChange={(event) => changeSpecialtyName(event.target.value)} />
                <div className="h-[120px] flex flex-col justify-between">
                    <div className="flex justify-between space-x-4">
                        {availableDegrees.map((degree, index) => (
                            <div key={index} className="flex-1 space-y-4">
                                <Button onClick={() => {
                                    selectDegree(degree)
                                }} className={`${isDegreeSelected(degree.id) ? 'bg-green-100 text-green-800 border-green-300' : 'text-primary-800 hover:bg-primary-100 bg-primary-100'} transition-colors duration-300 ease-in-out w-full min-h-15 cursor-pointer  border-b-1 border-black`}>
                                    + {degree.name}
                                </Button>
                                {isDegreeSelected(degree.id) && <div className="">
                                    <div className="max-h-15">
                                        <Input label="Courses" onChange={(event) => { handleYearChange(degree.id, +event.target.value) }} defaultValue={degree.courses} onKeyDown={(event) => event.preventDefault()} min={1} max={degree.courses} type="number" />
                                    </div>
                                </div>}
                            </div>
                        ))}
                    </div>
                    {creationData.selectedDegrees.length <= 0 && <h1 className="text-center font-secondary text-primary-300" >select above degrees</h1>}
                </div>
                <div className="flex justify-end space-x-2">
                    <Button className="cursor-pointer hover:bg-primary-300 bg-primary-200 px-2 rounded" onClick={() => onClose()}>Close</Button>
                    <Button disabled={creationData.selectedDegrees.length <= 0 || creationData.specialtyName === ''} onClick={() => onSave(creationData)}>Save</Button>
                </div>
            </div>
        </Modal>
    )
}

export default AddSpecialtyModal