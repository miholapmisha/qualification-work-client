import { PropsWithChildren, ReactNode, useState } from "react"
import MinusIcon from "./icons/MinusIcon"
import PlusIcon from "./icons/PlusIcon"

type AccordionProps = {
    classes?: string,
    headerComponent: ReactNode,
    defaultExpanded: boolean,
} & PropsWithChildren

const Accordion = ({ defaultExpanded, headerComponent: HeaderComponent, children, classes }: AccordionProps) => {

    const [isExpanded, setIsExpanded] = useState(defaultExpanded)

    return (
        <div className={`${classes ? classes : ''} animate-flip-down animate-duration-[600ms] `}>
            <div className={`${isExpanded ? 'border-primary-200' : ''} cursor-pointer px-2 py-1 flex items-center space-x-1 hover:bg-primary-100 rounded-2xl`} onClick={() => {
                setIsExpanded(prevExpanded => !prevExpanded)
            }
            }>
                {isExpanded ? <MinusIcon width={'16px'} height={'16px'} /> : <PlusIcon width={'16px'} height={'16px'} />}
                {/* <ChevronIcon width={'12px'} height={'12px'} className={`${isExpanded ? 'rotate-0' : 'rotate-180'} transition-all duration-200 ease-in-out`} /> */}
                {HeaderComponent}
            </div>
            {children && isExpanded && children}
        </div>
    )
}

export default Accordion