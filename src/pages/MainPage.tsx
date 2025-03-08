import { useAuth } from "../components/AuthProvider";
import LogoutIcon from "../components/ui/icons/LogoutIcon";
import UniversityIcon from "../components/ui/icons/UniversityIcon";
import UsersIcon from "../components/ui/icons/UsersIcon";
import Sidebar from "../components/ui/sidebar/Sidebar";
import { SidebarOptionType } from "../components/ui/sidebar/SidebarOption";
import { Role } from "../types/user";

const getSideBarOptions = (sidebarOptionsByRoles: { [role: string]: SidebarOptionType[] }, userRoles: Role[]) => {

  let sidebarOptions: SidebarOptionType[] = []

  userRoles.forEach((role) => {
    if (sidebarOptionsByRoles[role]) {
      sidebarOptions = [...sidebarOptions, ...sidebarOptionsByRoles[role]];
    }
  })

  return sidebarOptions
}

const MainPage = () => {

  const { currentUser, handleLogout } = useAuth()

  const sidebarOptionsByRoles = {
    [Role.ADMIN.toString()]: [
      {
        title: "System",
        onOptionClick: () => { },
        icon: UniversityIcon
      },
      {
        title: "Users",
        onOptionClick: () => { },
        icon: UsersIcon
      }
    ],
    [Role.TEACHER.toString()]: [
      {
        title: "Surveys",
        onOptionClick: () => { },
        icon: UsersIcon
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
      
    </div>
  );
}

export default MainPage