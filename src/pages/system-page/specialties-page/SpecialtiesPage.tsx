import { useSearchParams } from "react-router-dom"
import Button from "../../../components/ui/Button"
import Loader from "../../../components/ui/Loader"
import { useEffect, useState } from "react"
import AddSpecialtyModal, { SpecialtyCreationData } from "./AddSpecialtyModal"
import CategoryNode from "./CategoryNode"
import { Category, CategoryType } from "../../../types/category"
import { defaultPathSeparator } from "../common"
import { buildCategoryTree } from "../../../services/category"
import { useCategory } from "../../../hooks/useCategory"
import AlertBlock from "../../../components/ui/AlertBlock"

const SpecialtiesPage = () => {
    const [searchParams] = useSearchParams();
    const [openAddSpecialtyModal, setOpenAddSpecialtyModal] = useState(false);
    const facultyId = searchParams.get('facultyId');

    const {
        proceedingCategoriesIds,
        fetchingCategories: loadingSpecialties,
        categories,
        createCategories,
        addingCategories,
        error: specialtyError,
        message
    } = useCategory({ fetchParams: { parentId: facultyId }, queryKey: ['specialties', facultyId], enabled: !!facultyId })


    const facultyData = categories ? categories[0] : undefined
    const specialties = categories?.slice(1) || []
    const errorMessage = specialtyError && message

    const handleSpecialtyCreation = (data: SpecialtyCreationData): Category[] => {
        const specialtyId = crypto.randomUUID();
        const specialtyCategory: Category = {
            _id: specialtyId,
            categoryType: CategoryType.SPECIALTY,
            name: data.specialtyName,
            path: facultyData?.path + defaultPathSeparator + facultyData?._id
        };

        const subCategories: Category[] = data.selectedDegrees.flatMap(degree => {
            const degreeCategoryId = crypto.randomUUID();
            const degreeCategory: Category = {
                _id: degreeCategoryId,
                name: degree.name,
                categoryType: CategoryType.DEGREE,
                path: specialtyCategory.path + defaultPathSeparator + specialtyCategory._id
            };

            const yearsCategories: Category[] = Array.from({ length: degree.courses }).map((_, index) => ({
                _id: crypto.randomUUID(),
                categoryType: CategoryType.YEAR,
                name: (index + 1).toString(),
                path: degreeCategory.path + defaultPathSeparator + degreeCategory._id
            }));

            return [degreeCategory, ...yearsCategories];
        });

        return [specialtyCategory, ...subCategories];
    };

    const handleSaveSpecialty = async (data: SpecialtyCreationData) => {
        setOpenAddSpecialtyModal(false);
        const categories = handleSpecialtyCreation(data);
        await createCategories(categories);
    };

    const treeCategories = buildCategoryTree(specialties, defaultPathSeparator)

    useEffect(() => {
        console.log("Proceeding: ", proceedingCategoriesIds)
    }, [proceedingCategoriesIds])

    return (
        <>
            {errorMessage && <AlertBlock key={errorMessage} absolute={true} alertMessage={errorMessage} onCloseAlert={() => { }} />}
            {facultyData && <AddSpecialtyModal onSave={async (data) => {
                setOpenAddSpecialtyModal(false)
                handleSaveSpecialty(data)

            }} isOpen={openAddSpecialtyModal} onClose={() => setOpenAddSpecialtyModal(false)} />}
            <div className="flex-1 flex flex-col space-y-4">
                {facultyData && <div className="text-2xl">
                    <span>Specialties of </span>
                    <span className="font-secondary font-medium">
                        {facultyData.name}
                    </span>
                </div>}
                <div className="flex-1 pt-10 pb-5 border-t-1 border-primary-400 w-full space-y-4 px-32">
                    {loadingSpecialties && <div className="w-full h-full flex justify-center items-center">
                        <Loader size={{ width: '86px', height: '86px' }} />
                    </div>}
                    {specialties?.length <= 0 && <h1 className="w-full h-full flex items-center justify-center text-center text-primary-300 text-4xl lowercase font-secondary">
                        no specialties for faculty
                    </h1>}
                    <div className="">
                        {treeCategories && treeCategories?.length > 0 && treeCategories.map((specialty) =>
                            <CategoryNode createCategory={createCategories} category={specialty} key={specialty._id} initial={true} />)}
                    </div>

                </div>
                <div className="m-auto max-w-[152px]">
                    <Button disabled={addingCategories} onClick={() => { setOpenAddSpecialtyModal(true) }}>
                        {addingCategories ?
                            <span>Creating...</span>
                            :
                            <span>+ Add specialty</span>
                        }

                    </Button>
                </div>
            </div>
        </>
    )
};
export default SpecialtiesPage
