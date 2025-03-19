import LoginForm from "./LoginForm"
import { useAuth } from "../../components/AuthProvider"
import { User } from "../../types/user"
import { Navigate, useLocation } from "react-router-dom"
import PageLoader from "../../components/PageLoader"
import { routesByPriority } from "../../routes/route-config"
import { useCallback } from "react"

const LoginPage = () => {

    const { currentUser } = useAuth()
    const { search } = useLocation()

    const getRedirectRoute = useCallback((loggedInUser: User) => {
        const { roles: userRoles } = loggedInUser

        for (const { routes, role } of routesByPriority) {
            if (userRoles.includes(role)) {

                if (routes.length > 0) {

                    const baseRoute = routes[0]
                    if (baseRoute.children && baseRoute.children.length > 0) {
                        const firstChild = baseRoute.children[0]
                        if ('path' in firstChild) {
                            return firstChild.path
                        }
                    }

                    if ('path' in baseRoute) {
                        return baseRoute.path as string
                    }
                }
            }
        }

        return '/'
    }, [routesByPriority])

    if (currentUser === undefined) {
        return <PageLoader />
    }

    if (currentUser === null) {
        return (
            <div className="flex w-full h-screen">
                <LoginForm />
            </div>
        )
    }

    if (search.includes('redirect') && new URLSearchParams(search).get('redirect')) {
        const redirectPath = new URLSearchParams(search).get('redirect') as string
        return <Navigate to={redirectPath} />
    }

    return <Navigate to={getRedirectRoute(currentUser)} />

}

export default LoginPage