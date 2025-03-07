import { ButtonHTMLAttributes, PropsWithChildren } from "react"

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>

const Button = ({ children, ...props }: ButtonProps) => {

    return (
        <button {...props}>{children}</button>
    )
}

export default Button