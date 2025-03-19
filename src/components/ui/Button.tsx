import { ButtonHTMLAttributes, PropsWithChildren } from "react"

type ButtonProps = {
    classes?: string
} & PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>

const Button = ({ children, classes, ...props }: ButtonProps) => {

    return (
        <button className={`${classes ? classes : ''} disabled:bg-primary-400 cursor-pointer hover:bg-primary-800 bg-black text-white rounded px-4 py-2`} {...props}>{children}</button>
    )
}

export default Button