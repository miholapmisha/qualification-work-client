import { PropsWithChildren } from "react"
import { CategoryType, TreeCategory } from "../../../types/category"
import Accordion from "../../../components/common/Accordion"
import Checkbox from "../survey-taker-page/survey-taker/Checkbox"

type AssignCategoryNodeProps = {
    handleAssign: (categoryId: string) => void
    category: TreeCategory,
    assignedCategoriesIds: string[],
    initial?: boolean,
} & PropsWithChildren

const AssignCategoryNode = ({ category, initial, handleAssign, assignedCategoriesIds }: AssignCategoryNodeProps) => {

    if (category.categoryType === CategoryType.GROUP) {
        return (
            <div onClick={() => handleAssign(category._id)} className="cursor-pointer rounded-xl animate-flip-down animate-duration-[600ms] py-4 pl-10 pr-6 space-y-5 border-primary-300 flex justify-between bg-gray-50 hover:bg-primary-200">
                {category.name}
                <Checkbox name="categories" checked={assignedCategoriesIds.includes(category._id)} onChange={() => {
                    handleAssign(category._id)
                }} value={category._id} />
            </div>
        )
    }

    return (
        <div className="relative space-x-2">

            <Accordion classes={`${initial ? 'bg-white rounded-2xl border-1 border-primary-200' : 'ml-20'} relative`}
                defaultExpanded={false}
                headerComponent={
                    <div className="w-full py-2 px-4 flex justify-between items-center">
                        <span>{category.name}</span>
                        <Checkbox name="categories" checked={assignedCategoriesIds.includes(category._id)} onChange={() => {
                            handleAssign(category._id)
                        }} value={category._id} />
                    </div>
                }>
                {(category.children.length > 0 &&
                    category.children.map((child) => <AssignCategoryNode assignedCategoriesIds={assignedCategoriesIds} handleAssign={handleAssign} key={child._id} category={child} />))}

            </Accordion>
        </div>
    )
}

export default AssignCategoryNode
