import { IconProps } from "./icon-props"

const TrashIcon = ({ ...props }: IconProps) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            widths={`${props.width ? props.width : '24px'}`}
            height={`${props.height ? props.height : '24px'}`}
            {...props}
        >
            <path d="M9 3h6a1 1 0 0 1 1 1v1h5a1 1 0 1 1 0 2h-1v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7H3a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1zm1 2v1h4V5h-4zM7 8v12h10V8H7z" />
        </svg>
    )
}

export default TrashIcon