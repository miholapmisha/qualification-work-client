type SidebarIconProps = {
    icon: React.ElementType,
    classes?: string,
    onClickIcon?: () => void
    selected?: boolean
}

const SidebarIcon = ({ classes, onClickIcon, icon: Icon, selected }: SidebarIconProps) => {

    return (
        <>
            <div onClick={onClickIcon} className={`${selected ? 'bg-primary-100' : ''} ${classes} hover:bg-primary-100 rounded-full flex items-center justify-center p-2 cursor-pointer`}>
                <Icon />
            </div>
        </>
    )
}

export default SidebarIcon