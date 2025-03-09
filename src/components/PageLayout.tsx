import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import { Role } from "../types/user";
import { useAuth } from "./AuthProvider";
import LogoutIcon from "./ui/icons/LogoutIcon";
import UniversityIcon from "./ui/icons/UniversityIcon";
import UsersIcon from "./ui/icons/UsersIcon";
import Sidebar from "./ui/sidebar/Sidebar";
import { SidebarOptionType } from "./ui/sidebar/SidebarOption";
import SurveyIcon from "./ui/icons/SurveyIcon";


const getSideBarOptions = (sidebarOptionsByRoles: { [role: string]: SidebarOptionType[] }, userRoles: Role[]) => {

    let sidebarOptions: SidebarOptionType[] = []

    userRoles.forEach((role) => {
        if (sidebarOptionsByRoles[role]) {
            sidebarOptions = [...sidebarOptions, ...sidebarOptionsByRoles[role]];
        }
    })

    return sidebarOptions
}

const PageLayout = () => {

    const { currentUser, handleLogout } = useAuth()
    const navigate = useNavigate()

    const sidebarOptionsByRoles = {
        [Role.ADMIN.toString()]: [
            {
                title: "System",
                onOptionClick: () => { navigate('/system') },
                icon: UniversityIcon
            },
            {
                title: "Users",
                onOptionClick: () => { navigate('/users') },
                icon: UsersIcon
            }
        ],
        [Role.TEACHER.toString()]: [
            {
                title: "Surveys",
                onOptionClick: () => { navigate('/surveys') },
                icon: SurveyIcon
            }
        ],
        [Role.STUDENT.toString()]: [

        ]
    }

    const preferenceOptions: SidebarOptionType[] = [
        {
            icon: LogoutIcon,
            title: "Logout",
            onOptionClick: () => handleLogout()
        }
    ]

    const defaultOptions = getSideBarOptions(sidebarOptionsByRoles, currentUser?.roles ?? [])

    return (
        <div className="flex w-full min-h-screen">
            <Sidebar defaultOptions={defaultOptions} preferenceOptions={preferenceOptions} />
            <Outlet />
        </div>
    );
}

export default PageLayout