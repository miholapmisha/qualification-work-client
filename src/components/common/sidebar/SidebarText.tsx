type SidebarOptionTextProps = {
    title: string,
    onOptionClick: () => void,
    classes?: string,
    selected?: boolean
}

const SidebarText = ({ onOptionClick, classes, title, selected }: SidebarOptionTextProps) => {
    return (
        <div onClick={onOptionClick} className={`${selected ? 'bg-primary-100' : ''} w-full ${classes} border-l-1 rounded-r cursor-pointer flex items-center justify-center h-12 hover:bg-primary-100`}>
            <span className='text-xl'>{title}</span>
        </div>
    )
}

export default SidebarText