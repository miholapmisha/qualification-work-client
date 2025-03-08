import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import UniversityIcon from "../../components/ui/icons/UniversityIcon"
import Loader from "../../components/ui/Loader"
import { LoginInputs } from "./LoginPage"
import { useForm } from "react-hook-form"

type LoginFormProps = {
    onSubmit: (data: LoginInputs) => Promise<void>,
    loading: boolean
}

const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>();

    return (
        <div className="relative font-secondary bg-white rounded-xl pt-14 pb-6 px-8 mb-8">
            <div className="bg-white absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 border-3 rounded-full p-3 w-[86px] h-[86px] flex items-center justify-center">
                <UniversityIcon width={'56px'} height={'56px'} />
            </div>
            <div className="space-y-8">
                <h1 className="text-center text-4xl font-bold">Login</h1>
                <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-6">

                        <Input {...register('email', { required: "Email is required" })} error={errors?.email} id="email-input" label="Email" />
                        <Input {
                            ...register('password', {
                                required: "Password is required",
                                minLength: { value: 8, message: "Should contain at least 8 characters" }
                            })}
                            error={errors?.password}
                            type="password" id="password-input" label="Password" />

                    </div>
                    <Button type="submit">
                        <div className="relative flex items-center justify-center">
                            <span>Login</span>
                            {loading &&
                                <div className="absolute right-0">
                                    <Loader size={{ width: "24px", height: "24px" }} />
                                </div>}
                        </div>
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm
