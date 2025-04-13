import { IconProps } from "./icon-props";

const CheckedCheckboxIcon = ({ ...props }: IconProps) => {
    return (
        <svg
            {...props}

            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="4"
                y="4"
                width="16"
                height="16"
                rx="2"
                fill="#000000"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9 12L11 14L15 10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default CheckedCheckboxIcon;