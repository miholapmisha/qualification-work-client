import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import UniversityIcon from "../../components/ui/icons/UniversityIcon"
import Loader from "../../components/ui/Loader"
import { useForm } from "react-hook-form"
import { startTransition, useActionState, useEffect, useRef, useState } from "react"
import { useAuth } from "../../components/AuthProvider"
import AlertBlock from "../../components/ui/AlertBlock"

type FormState = {
    success: boolean,
    data?: LoginInputs,
    error?: string
}

type LoginInputs = {
    email: string,
    password: string
}

const LoginForm = () => {

    const { handleLogin } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>();
    const formRef = useRef<HTMLFormElement>(null)
    const [showAlert, setShowAlert] = useState(false)

    const [loginResult, loginAction, isPending] = useActionState(
        async (prevState: FormState, payload: FormData): Promise<FormState> => {
            const plaintObject = Object.fromEntries(payload.entries()) as LoginInputs
            const { email, password } = plaintObject
            const { data: { message }, error } = await handleLogin(email, password)

            if (error) {
                return { ...prevState, success: false, error: message }
            }

            return { success: true }
        },
        { success: false }
    )

    useEffect(() => {
        if (loginResult.error) {
            setShowAlert(true)
        } else {
            setShowAlert(false)
        }
    }, [loginResult])

    return (
        <div className="relative m-auto o w-full max-w-lg">
            <div className="relative font-secondary bg-white rounded-xl pt-14 pb-6 px-8 mb-8">
                <div className="bg-white absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 border-3 rounded-full p-3 w-[86px] h-[86px] flex items-center justify-center">
                    <UniversityIcon width={'56px'} height={'56px'} />
                </div>
                <div className="space-y-8">
                    <h1 className="text-center text-4xl font-bold">Login</h1>
                    <form ref={formRef} className="space-y-8"
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleSubmit(() => {
                                startTransition(() => loginAction(new FormData(formRef.current!)));
                            })(event);
                        }}>
                        <div className="space-y-6">

                            <Input {...register('email', { required: "Email is required" })} error={errors?.email} name="email" id="email" label="Email" />
                            <Input {
                                ...register('password', {
                                    required: "Password is required",
                                    minLength: { value: 8, message: "Should contain at least 8 characters" }
                                })}
                                error={errors?.password}
                                type="password" name="password" id="password" label="Password" />

                        </div>
                        <Button type="submit" classes="w-full">
                            <div className="relative flex items-center justify-center">
                                <span>Login</span>
                                {isPending &&
                                    <div className="absolute right-0">
                                        <Loader size={{ width: "24px", height: "24px" }} />
                                    </div>}
                            </div>
                        </Button>
                    </form>
                </div>
            </div>
            {showAlert && loginResult.error && <AlertBlock alertMessage={loginResult.error} onCloseAlert={() => setShowAlert(false)} />}
        </div>
    )
}

export default LoginForm
