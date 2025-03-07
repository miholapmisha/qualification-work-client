type SidebarOptionTextProps = {
    title: string,
    onOptionClick: () => void,
    classes?: string
}

const SidebarOptionText = ({ onOptionClick, classes, title }: SidebarOptionTextProps) => {
    return (
        <div onClick={onOptionClick} className={`w-full ${classes} border-l-1 rounded-r cursor-pointer flex items-center justify-center h-12 hover:bg-gray-100`}>
            <span className='text-xl'>{title}</span>
        </div>
    )
}

export default SidebarOptionText