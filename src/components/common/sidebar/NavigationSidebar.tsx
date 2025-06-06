import { useEffect, useState } from 'react'
import SidebarIcon from './SidebarIcon'
import OpenSidebarIcon from '../icons/OpenSidebarIcon'
import SidebarOption, { SidebarOptionType } from './SidebarOption'

type SidebarProps = {
    defaultOptions?: SidebarOptionType[]
    preferenceOptions?: SidebarOptionType[]
}

const NavigationSidebar = ({ defaultOptions, preferenceOptions }: SidebarProps) => {

    const [sidebarState, setSidebarState] = useState({
        isExpanded: false,
        showText: false
    })

    useEffect(() => {
        if (sidebarState.isExpanded) {
            const timeout = setTimeout(() => setSidebarState(prevState => ({ ...prevState, showText: true })), 100)
            return () => clearTimeout(timeout)
        } else {
            const timeout = setTimeout(() => setSidebarState(prevState => ({ ...prevState, showText: false })), 75)
            return () => clearTimeout(timeout)
        }

    }, [sidebarState.isExpanded])

    return (
        <div className={`max-h-screen w-full sticky top-0 ${sidebarState.isExpanded ? 'max-w-[256px] px-8' : 'max-w-15 px-2'
            } bg-primary-50 flex flex-col rounded-r-2xl py-8  transition-all duration-400 ease-in-out space-y-8`}>
            <div className='flex justify-center items-center'>
                <SidebarIcon
                    onClickIcon={() => setSidebarState(prevState => ({ ...prevState, isExpanded: !prevState.isExpanded }))}
                    classes={`${sidebarState.isExpanded ? 'rotate-90' : 'rotate-none'} transition-transform duration-400`}
                    icon={OpenSidebarIcon} />
            </div>

            <div className='flex flex-col'>
                {defaultOptions && defaultOptions.map((option, index) => (
                    <SidebarOption selected={option.selected} key={index} showTextOption={sidebarState.showText} data={{ ...option }} />
                ))}
            </div>

            <div className='flex flex-col mt-auto'>
                {preferenceOptions && preferenceOptions.map((option, index) => (
                    <SidebarOption key={index} showTextOption={sidebarState.showText} data={{ ...option }} />
                ))}
            </div>
        </div>
    )
}

export default NavigationSidebar