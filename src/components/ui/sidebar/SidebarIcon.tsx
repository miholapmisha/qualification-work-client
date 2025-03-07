type SidebarIconProps = {
    icon: React.ElementType,
    classes?: string,
    onClickIcon?: () => void
}

const SidebarIcon = ({ classes, onClickIcon, icon: Icon }: SidebarIconProps) => {

    return (
        <>
            <div
                id="data-tooltip-target"
                onClick={onClickIcon}
                className={`${classes} hover:bg-gray-100 rounded-full flex items-center justify-center p-2 cursor-pointer`}>
                <Icon />
            </div>
        </>
    )
} 

export default SidebarIcon