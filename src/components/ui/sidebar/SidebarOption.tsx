import SidebarIcon from "./SidebarIcon"
import SidebarOptionText from "./SidebarOptionText"

export type SidebarOptionType = {
    title: string,
    textOptionClasses?: string
    onOptionClick: () => void,
    icon: React.ElementType
    iconClasses?: string
}

type SidebarOptionProps = {
    showTextOption: boolean,
    data: SidebarOptionType
}

const SidebarOption = ({ showTextOption, data }: SidebarOptionProps) => {

    return (
        <>

            {showTextOption ?
                <SidebarOptionText title={data.title} classes={data.textOptionClasses} onOptionClick={data.onOptionClick} />
                :
                <SidebarIcon icon={data.icon} classes={data.iconClasses} onClickIcon={data.onOptionClick} />
            }
        </>
    )
}

export default SidebarOption