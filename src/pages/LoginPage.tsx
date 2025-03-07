import { useAuth } from "../components/AuthProvider"

const LoginPage = () => {

    const { handleLogin, handleLogout } = useAuth()

    return (
        <>
            Test text
            <button className="bg-black rounded text-white px-4 py-2 cursor-pointer text-4xl font-bold"
                onClick={() => handleLogin("test@test.com", "StrongPassword123@1")}>
                Login
            </button>
            <button className="bg-black rounded text-white px-4 py-2 cursor-pointer text-4xl font-bold"
                onClick={handleLogout}>
                Logout
            </button>
        </>
    )
}

export default LoginPage