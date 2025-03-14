import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Role } from "../types/user";
import { useAuth } from "./AuthProvider";
import LogoutIcon from "./ui/icons/LogoutIcon";
import NavigationSidebar from "./ui/sidebar/NavigationSidebar";
import { SidebarOptionType } from "./ui/sidebar/SidebarOption";
import { ROUTE_SIDEBAR_CONFIG } from "../routes/route-config";

const getSidebarOptions = (userRoles: Role[]): SidebarOptionType[] => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return userRoles.flatMap(role => {
        const routeConfig = ROUTE_SIDEBAR_CONFIG[role] || [];

        return routeConfig.map(config => ({
            title: config.title,
            icon: config.icon,
            onOptionClick: () => navigate(config.path),
            selected: pathname === config.path
        }))
    });
}

const PageLayout = () => {

    const { currentUser, handleLogout } = useAuth()

    const preferenceOptions: SidebarOptionType[] = [
        {
            icon: LogoutIcon,
            title: "Logout",
            onOptionClick: () => handleLogout()
        }
    ]
    const defaultOptions = getSidebarOptions(currentUser?.roles ?? [])

    return (
        <div className="flex w-full max-h-screen space-x-2 py-2 pr-2">
            <NavigationSidebar defaultOptions={defaultOptions} preferenceOptions={preferenceOptions} />
            <Outlet />
        </div>
    );
}

export default PageLayout