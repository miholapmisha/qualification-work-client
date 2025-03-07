import { PropsWithChildren } from "react";
import { User } from "../types/user"
import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";
import PageLoader from "./PageLoader";

type ProtectedRouteProps = PropsWithChildren & {
    allowedRoles?: User['roles'];
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {

    const { currentUser } = useAuth()

    if (currentUser === undefined) {
        return <PageLoader/>
    }

    if (currentUser === null || (allowedRoles && !allowedRoles.some(role => currentUser.roles.includes(role)))) {
        return <Navigate to={"/login"} />
    }

    return children
}

export default ProtectedRoute