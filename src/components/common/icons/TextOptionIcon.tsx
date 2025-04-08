import { IconProps } from "./icon-props"

const TextOptionIcon = ({ ...props }: IconProps) => {

    return (
        <svg {...props} widths={`${props.width ? props.width : '24px'}`} height={`${props?.height ? props.height : '24px'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 4V20M17 12V20M6 20H10M15 20H19M13 7V4H3V7M21 14V12H13V14" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export default TextOptionIcon