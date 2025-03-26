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
                {HeaderComponent}
            </div>
            <div className={`transition-all duration-300 ease-in-out grid overflow-hidden ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    {children && children}
                </div>
            </div>
        </div>
    )
}

export default Accordion