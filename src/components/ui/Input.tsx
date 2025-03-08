import { InputHTMLAttributes, PropsWithChildren } from "react"
import { FieldError } from "react-hook-form"

type InputProps =
    {
        label?: string,
        error?: FieldError
    }
    & PropsWithChildren<InputHTMLAttributes<HTMLInputElement>>

const Input = ({ label, error, ...props }: InputProps) => {

    return (
        <div className="space-y-1 h-14">
            <div className="relative w-full h-12 flex flex-col justify-center box-border">
                <input
                    className={`${error?.message ? 'border-red-600' : 'focus:border-black border-gray-300'} peer w-full h-full outline-none  border rounded px-4`}
                    id={props.id}
                    placeholder=" "
                    {...props}
                />
                {label && (
                    <label
                        className={`${error?.message ? 'text-red-600' : 'text-gray-400 peer-focus:text-black'} bg-white  left-4 absolute duration-300 transform 
                       peer-placeholder-shown:scale-100
                       peer-placeholder-shown:translate-y-1
                       peer-focus:-translate-y-5
                       peer-focus:scale-75
                       -translate-y-5
                       scale-75 
                       top-2 
                       z-10 px-1`}
                        htmlFor={props.id}>
                        {label}
                    </label>
                )}
            </div>
            <div className="text-red-600 text-xs ml-1">
                {error?.message && error.message}
            </div>
        </div>

    )
}

export default Input