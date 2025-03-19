import { useCallback, useState } from "react"
import Button from "../../../components/ui/Button"
import { Category, CategoryType } from "../../../types/category"
import AlertBlock from "../../../components/ui/AlertBlock"
import FacultyCard from "./FacultyCard"
import FacultyForm from "./FacultyForm"
import Loader from "../../../components/ui/Loader"
import LoaderCard from "./LoaderFacultyCard"
import { useCategory } from "../../../hooks/useCategory"

export const FacultiesPage = () => {

    const [showAddFacultyForm, setShowFaculyForm] = useState<boolean>(false)
    const [creatingFacultyCount, setCreatingFacultyCount] = useState<number>(0)

    const {
        categories: faculties,
        fetchingCategories: fetchingFaculties,
        deleteCategory: deleteFaculty,
        updateCategory: updateFaculty,
        createCategories: createFaculty,
        addingCategories: addingFaculty,
        error,
        message,
        proceedingCategoriesIds: proceedingFacultiesIds
    } = useCategory({ fetchParams: { categoryType: CategoryType.FACULTY }, queryKey: ['faculties'] })

    const errorMessage = error && message
    const showMessageNoFacultiesYet = faculties && faculties?.length <= 0 && !showAddFacultyForm && !fetchingFaculties

    const renderFaculties = useCallback((faculties: Category[]) => {

        if (!faculties || fetchingFaculties)
            return null

        return faculties?.map(faculty => {

            if (proceedingFacultiesIds.includes(faculty._id)) {
                return <LoaderCard key={faculty._id} />
            }

            return (<FacultyCard key={faculty._id}
                onDelete={deleteFaculty}
                onEdit={(_id, data) => { updateFaculty({ _id, data }) }}
                faculty={faculty} />)
        })
    }, [faculties, fetchingFaculties, proceedingFacultiesIds])

    return (
        <>
            {errorMessage && <AlertBlock key={errorMessage} absolute={true} alertMessage={errorMessage} onCloseAlert={() => { }} />}
            <div className="flex-1 flex flex-col space-y-4">
                <h1 className="text-2xl">Select faculty for detailed information</h1>
                <div className="flex-1 flex flex-col items-center pt-10 pb-5 border-t-1 border-primary-400 w-full space-y-4">
                    <div className="flex-auto min-w-full flex flex-col font-secondary">
                        {fetchingFaculties && <div className="w-full h-full flex justify-center items-center">
                            <Loader size={{ width: '86px', height: '86px' }} />
                        </div>}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4 gap-x-8 gap-y-8">

                            {renderFaculties(faculties || [])}

                            {addingFaculty && Array.from({ length: creatingFacultyCount }).map((_, index) => <LoaderCard key={index} />)}

                            {showAddFacultyForm && <FacultyForm onCancel={() => setShowFaculyForm(false)} onSaveFaculty={async (category) => {
                                setShowFaculyForm(false)
                                setCreatingFacultyCount(prevCount => prevCount + 1)
                                await createFaculty([category])
                                setCreatingFacultyCount(prevCount => prevCount - 1)
                            }} />}

                        </div>
                        {showMessageNoFacultiesYet && <h1 className="w-full h-full flex items-center justify-center text-center text-primary-300 text-4xl lowercase font-secondary">
                            no specialties in your system yet
                        </h1>}
                    </div>
                    <div className="max-w-[132px]">
                        <Button onClick={() => setShowFaculyForm(true)}>+ Add faculty</Button>
                    </div>
                </div>
            </div>
        </>
    )
}