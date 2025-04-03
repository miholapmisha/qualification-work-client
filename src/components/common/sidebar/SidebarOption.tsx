import SidebarIcon from "./SidebarIcon"
import SidebarText from "./SidebarText"

export type SidebarOptionType = {
    selected?: boolean
    title: string,
    textOptionClasses?: string
    onOptionClick: () => void,
    icon: React.ElementType
    iconClasses?: string
}

type SidebarOptionProps = {
    showTextOption: boolean,
    data: SidebarOptionType,
    selected?: boolean
}

const SidebarOption = ({ showTextOption, data, selected }: SidebarOptionProps) => {

    return (
        <>

            {showTextOption ?
                <SidebarText selected={selected} title={data.title} classes={data.textOptionClasses} onOptionClick={data.onOptionClick} />
                :
                <SidebarIcon selected={selected} icon={data.icon} classes={data.iconClasses} onClickIcon={data.onOptionClick} />
            }
        </>
    )
}

export default SidebarOption