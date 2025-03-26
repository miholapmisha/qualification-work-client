import { PropsWithChildren } from "react"
import Accordion from "../../../components/ui/Accordion"
import { CategoryType, TreeCategory } from "../../../types/category"
import YearCategoryNode from "./YearCategoryNode"
import { useSpecialties } from "./SpecialtyProvider"
import CategoryNodeHeader from "./CategoryNodeHeader"

type CategoryNodeProps = {
    category: TreeCategory,
    initial?: boolean,
} & PropsWithChildren

const CategoryNode = ({ category, initial }: CategoryNodeProps) => {

    const { proceedingCategoriesIds } = useSpecialties()
    const isCategoryProceeding = proceedingCategoriesIds.includes(category._id)

    return (
        <div className="relative">
            
            <Accordion classes={`${initial ? 'bg-white rounded-2xl border-1 border-primary-200' : 'ml-20'} relative ${isCategoryProceeding ? 'blur-sm' : ''}`}
                defaultExpanded={false}
                headerComponent={
                    <CategoryNodeHeader category={category} />
                }>
                    {category.categoryType === CategoryType.YEAR ? <YearCategoryNode yearCategory={category} /> : (category.children.length > 0 &&
                        category.children.map((child) => <CategoryNode key={child._id} category={child} />))}

            </Accordion>
        </div>
    )
}

export default CategoryNode
