import { IconProps } from "./icon-props"

const UsersIcon = ({ ...props }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} widths={`${props.width ? props.width : '24px'}`} height={`${props.height ? props.height : '24px'}`} viewBox="0 0 32 32" xmlSpace="preserve">
            <path d="M12 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm0-12C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zM23 32a1 1 0 0 1-1-1v-6.115a6.95 6.95 0 0 0-6.942-6.943H8.942A6.95 6.95 0 0 0 2 24.885V31a1 1 0 1 1-2 0v-6.115c0-4.93 4.012-8.943 8.942-8.943h6.116c4.93 0 8.942 4.012 8.942 8.943V31a1 1 0 0 1-1 1zM31 32a1 1 0 0 1-1-1v-6.115a6.95 6.95 0 0 0-6.942-6.943 1 1 0 1 1 0-2c4.93 0 8.942 4.012 8.942 8.943V31a1 1 0 0 1-1 1z" /><path d="M20 14a1 1 0 1 1 0-2c2.757 0 5-2.243 5-5s-2.243-5-5-5a1 1 0 1 1 0-2c3.86 0 7 3.14 7 7s-3.14 7-7 7z" />
        </svg>
    )
}

export default UsersIcon