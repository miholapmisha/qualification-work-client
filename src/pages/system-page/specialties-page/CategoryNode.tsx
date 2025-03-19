import { PropsWithChildren } from "react"
import Accordion from "../../../components/ui/Accordion"
import { CategoryType, TreeCategory } from "../../../types/category"
import YearCategoryNode from "./YearCategoryNode"

type CategoryNodeProps = {
    category: TreeCategory,
    initial?: boolean,
    createCategory: any // this war crime would be changed
} & PropsWithChildren

const CategoryNode = ({ category, initial, createCategory }: CategoryNodeProps) => {

    return (
        <div className="relative">

            <Accordion classes={`${initial ? 'bg-white rounded-2xl border-1 border-primary-200' : 'ml-20'} relative`} defaultExpanded={false} headerComponent={
                <div className={` w-full py-2 px-4 flex justify-between items-center `}>
                    <span>{category.name}</span>
                    <div className="z-10 flex justify-start space-x-4 font-main min-w-[180px]" onClick={(e) => { e.stopPropagation() }}>
                        {/* {<a className="text-red-600 hover:underline" onClick={(e) => { e.stopPropagation(); console.log("delete") }}>Delete</a>} */}
                    </div>
                </div>
            }>
                {category.categoryType === CategoryType.YEAR ? <YearCategoryNode createCategory={createCategory} yearCategory={category} /> : (category.children.length > 0 &&
                    category.children.map((child) => <CategoryNode createCategory={createCategory} key={child._id} category={child} />))}


            </Accordion>
        </div>
    )
}

export default CategoryNode