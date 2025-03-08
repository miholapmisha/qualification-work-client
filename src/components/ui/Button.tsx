import { ButtonHTMLAttributes, PropsWithChildren } from "react"

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>

const Button = ({ children, ...props }: ButtonProps) => {

    return (
        <button className="w-full h-full cursor-pointer hover:bg-gray-800 bg-black text-white rounded px-4 py-2" {...props}>{children}</button>
    )
}

export default Button