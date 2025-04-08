import { IconProps } from "./icon-props"

const SquareOptionIcon = ({ ...props }: IconProps) => {
    return (
        <svg {...props} widths={`${props.width ? props.width : '24px'}`} height={`${props?.height ? props.height : '24px'}`} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="16" height="16" rx="2" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export default SquareOptionIcon