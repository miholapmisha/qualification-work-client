import { PropsWithChildren } from "react";
import { User } from "../types/user"
import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";
import PageLoader from "./PageLoader";
import PageFallback from "./PageFallback";

type ProtectedRouteProps = PropsWithChildren & {
    allowedRoles?: User['roles'];
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {

    const { currentUser } = useAuth()

    if (currentUser === undefined) {
        return <PageLoader />
    }

    if (currentUser === null) {
        return <Navigate to={"/login"} />
    }

    if (allowedRoles && !allowedRoles.some(role => currentUser.roles.includes(role))) {
        return <PageFallback code="403" message="You dont have permission to visit this page"/>
    }

    return children
}

export default ProtectedRoute