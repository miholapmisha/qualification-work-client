import Button from "../../../components/common/Button"
import Loader from "../../../components/common/Loader"
import { useMemo, useState } from "react"
import AddSpecialtyModal, { SpecialtyCreationData } from "./AddSpecialtyModal"
import CategoryNode from "./CategoryNode"
import { Category, CategoryType } from "../../../types/category"
import { defaultPathSeparator } from "../common"
import { buildCategoryTree } from "../../../util/category"
import { useSpecialties } from "./SpecialtyProvider"

const SpecialtiesPage = () => {
    const [openAddSpecialtyModal, setOpenAddSpecialtyModal] = useState(false);


    const {
        parentIdsCreatingCategories,
        fetchingCategories: loadingSpecialties,
        categories,
        createCategories,
    } = useSpecialties()


    const facultyData = categories ? categories[0] : undefined
    const specialties = categories?.slice(1) || []
    const showMessageNoSpecialtiesYet = specialties && specialties.length <= 0 && !loadingSpecialties

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

    const treeCategories = useMemo(() => {
        return buildCategoryTree(specialties, defaultPathSeparator)
    }, [specialties])

    const addingCategories = facultyData?._id ? parentIdsCreatingCategories.includes(facultyData._id) : false

    return (
        <>
            {facultyData && openAddSpecialtyModal && <AddSpecialtyModal onSave={async (data) => {
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
                    {showMessageNoSpecialtiesYet && <h1 className="w-full h-full flex items-center justify-center text-center text-primary-300 text-4xl lowercase font-secondary">
                        no specialties for faculty
                    </h1>}
                    <div className="space-y-1">
                        {treeCategories && treeCategories?.length > 0 && treeCategories.map((specialty) =>
                            <CategoryNode category={specialty} key={specialty._id} initial={true} />)}
                    </div>

                </div>
                <div className="m-auto max-w-[152px]">
                    <Button classes="flex items-center space-x-2" disabled={addingCategories} onClick={() => { setOpenAddSpecialtyModal(true) }}>
                        {addingCategories ?
                            <>
                                <span>Creating...</span>
                                <Loader size={{ width: '16px', height: '16px' }} />
                            </>
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
