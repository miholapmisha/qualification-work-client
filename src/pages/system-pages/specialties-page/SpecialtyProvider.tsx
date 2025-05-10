import { createContext, PropsWithChildren, useContext } from "react"
import { Category } from "../../../types/category"
import { useCategory } from "../../../hooks/useCategory"
import { ApiResponse } from "../../../services/api/common"
import { useSearchParams } from "react-router-dom"

type SpecialtyContextType = {
    fetchingCategories: boolean,
    categories: Category[] | undefined,
    message: string | undefined,
    proceedingCategoriesIds: string[],
    parentIdsCreatingCategories: string[],
    createCategories: (categories: Category[]) => Promise<ApiResponse<Category[] | undefined>>,
    deleteCategory: (categoryId: string) => Promise<ApiResponse<any>>,
    updateCategory: (category: { _id: string, data: Category }) => Promise<ApiResponse<any>>
}


type SpecialtyProviderProps = PropsWithChildren

const SpecialtyContext = createContext<SpecialtyContextType>({
    fetchingCategories: false,
    categories: undefined,
    message: undefined,
    proceedingCategoriesIds: [],
    parentIdsCreatingCategories: [],
    createCategories: async (categories: Category[]) => {
        return { data: { message: '', payload: categories }, error: false } as ApiResponse<any>
    },
    deleteCategory: async (categoryId: string): Promise<ApiResponse<any>> => {
        return { data: { message: '', payload: categoryId }, error: false } as ApiResponse<any>
    },
    updateCategory: async (category: { _id: string, data: Category }) => {
        return { data: { message: '', payload: category }, error: false } as ApiResponse<any>
    }
})

const SpecialtyProvider = ({ children }: SpecialtyProviderProps) => {

    const [searchParams] = useSearchParams()
    const facultyId = searchParams.get('facultyId');

    const {
        fetchingCategories,
        categories,
        message,
        proceedingCategoriesIds,
        parentIdsCreatingCategories,
        createCategories,
        deleteCategory,
        updateCategory
    } = useCategory({ fetchParams: { parentId: facultyId }, queryKey: ['specialties', facultyId], enabled: !!facultyId })

    return (
        <SpecialtyContext.Provider value={{
            fetchingCategories,
            categories,
            message,
            proceedingCategoriesIds,
            parentIdsCreatingCategories,
            createCategories,
            deleteCategory,
            updateCategory
        }}>
            {children}
        </SpecialtyContext.Provider>
    )
}

export const useSpecialties = () => {
    const context = useContext(SpecialtyContext)

    if (context === undefined) {
        throw new Error("useSpecialtiesContext should be used inside of SpecialtiesProvider")
    }

    return context
}

export default SpecialtyProvider