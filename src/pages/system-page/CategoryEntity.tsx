import Accordion from "../../components/ui/Accordion"
import { Category, CategoryType } from "../../types/category"

type CategoryEntityProps = {
    category: Category,
    initial?: boolean
}

const CategoryEnitity = ({ category, initial }: CategoryEntityProps) => {

    let label = ''
    switch (category.type) {
        case CategoryType.FACULTY:
            label = '+ Add specialty'
            break
        case CategoryType.YEAR:
            label = '+ Add group'
    }

    if (category.type === CategoryType.GROUP) {
        return <div className={`${initial ? '' : 'ml-12 py-2'} py-2 px-4 border-b-1 border-primary-200 underline font-light`}>
            <span>{category.name}</span>
        </div>
    }

    return (
        <div className="relative">

            <Accordion classes={`${initial ? 'bg-white rounded-2xl border-1 border-primary-200' : 'ml-20'} relative`} defaultExpanded={false} headerComponent={
                <div className={` w-full py-2 px-4 flex justify-between items-center `}>
                    <span>{category.name}</span>
                    <div className="z-10 flex justify-start space-x-4 font-main min-w-[180px]" onClick={(e) => { e.stopPropagation()}}>
                        {<a className="text-red-600 hover:underline" onClick={(e) => { e.stopPropagation(); console.log("delete") }}>Delete</a>}
                        {label && <span onClick={() => { }} className="underline cursor-pointer hover:text-cyan-600">{label}</span>}
                    </div>
                </div>
            }>
                {category.children.length > 0 &&
                    category.children.map((child, index) => <CategoryEnitity key={index + 1000} category={child} />)}

            </Accordion>
        </div>
    )
}

export default CategoryEnitity