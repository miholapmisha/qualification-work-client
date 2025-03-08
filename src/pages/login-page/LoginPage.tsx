import { useState } from "react"
import LoginForm from "./LoginForm"
import { useAuth } from "../../components/AuthProvider"
import { useNavigate } from "react-router-dom"
import AlertBlock from "../../components/ui/AlertBlock"

export type LoginInputs = {
    email: string,
    password: string
}

const LoginPage = () => {
    const { handleLogin } = useAuth()
    const [loginError, setLoginError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onSubmit = async (data: LoginInputs) => {
        setLoading(true)
        const { message, error } = await handleLogin(data.email, data.password)
        setLoading(false)
        if (error) {
            setLoginError(message)
            return
        }
        navigate('/')
    }

    return (
        <div className="flex w-full h-screen">
            <div className="relative m-auto w-full max-w-lg">
                <LoginForm onSubmit={onSubmit} loading={loading} />
                <AlertBlock key={loginError} onCloseAlert={() => setLoginError(null)} alertMessage={loginError}></AlertBlock>
            </div>
        </div>
    )
}

export default LoginPage