import { useEffect, useState } from 'react'
import SidebarIcon from './SidebarIcon'
import OpenSidebarIcon from './icons/OpenSidebarIcon'
import SidebarOption, { SidebarOptionType } from './SidebarOption'

type SidebarProps = {
    options?: SidebarOptionType[]
}

const Sidebar = ({ options }: SidebarProps) => {

    const [sidebarState, setSidebarState] = useState({
        isExpanded: false,
        showText: false
    })

    useEffect(() => {
        if (sidebarState.isExpanded) {
            const timeout = setTimeout(() => setSidebarState(prevState => ({ ...prevState, showText: true })), 100)
            return () => clearTimeout(timeout)
        } else {
            const timeout = setTimeout(() => setSidebarState(prevState => ({ ...prevState, showText: false })), 100)
            return () => clearTimeout(timeout)
        }

    }, [sidebarState.isExpanded])

    return (
        <div className={`sticky ${sidebarState.isExpanded ? 'w-[256px] px-8' : 'w-15 px-2'
            } bg-gray-50 flex flex-col rounded-2xl py-4  transition-all duration-400 ease-in-out space-y-8`}>
            <div className='flex justify-center items-center'>
                <SidebarIcon
                    onClickIcon={() => setSidebarState(prevState => ({ ...prevState, isExpanded: !prevState.isExpanded }))}
                    classes={`${sidebarState.isExpanded ? 'rotate-90' : 'rotate-none'} transition-transform duration-400`}
                    icon={OpenSidebarIcon} />
            </div>

            <div className='flex flex-col'>
                {options && options.map((option, index) => (
                    <SidebarOption key={index} showTextOption={sidebarState.showText} data={{ ...option }} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar