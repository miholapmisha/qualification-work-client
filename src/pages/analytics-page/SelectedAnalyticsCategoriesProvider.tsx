import { createContext, useContext, useState, PropsWithChildren } from "react"
import { Category } from "../../types/category"

type SelectedGroupsContextType = {
    selectedAnalysisCategories: Category[]
    setSelectedAnalysisCategories: (categories: Category[]) => void
}

const SelectedAnalysisCategories = createContext<SelectedGroupsContextType | undefined>(undefined)

const SelectedAnalyticsCategoriesProvider = ({ children }: PropsWithChildren) => {

    const [selectedAnalysisCategories, setSelectedAnalysisCategories] = useState<Category[]>([])


    return (
        <SelectedAnalysisCategories.Provider value={{ selectedAnalysisCategories, setSelectedAnalysisCategories }}>
            {children}
        </SelectedAnalysisCategories.Provider>
    )
}

export const useSelectedAnalysisCategoriess = () => {
    const ctx = useContext(SelectedAnalysisCategories)
    if (!ctx) throw new Error("useSelectedGroups must be used within SelectedAnalyticsCategoriesProvider")
    return ctx
}

export default SelectedAnalyticsCategoriesProvider