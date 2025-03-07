import { useAuth } from "../components/AuthProvider";
import UniversityIcon from "../components/ui/sidebar/icons/UniversityIcon";
import UsersIcon from "../components/ui/sidebar/icons/UsersIcon";
import Sidebar from "../components/ui/sidebar/Sidebar";
import { roles } from "../types/user";

// title: string,
//     textOptionClasses?: string
//     onOptionClick: () => void,
//     icon: React.ElementType
//     iconClasses?: string



const sidebarOptionsByRoles = {
  [roles.ADMIN]: [
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
  [roles.TEACHER]: [

  ],
  [roles.STUDENT]: [

  ]
}

const MainPage = () => {

  const { currentUser } = useAuth()

  return (
    <div className="flex w-full h-screen">
      <Sidebar options={sidebarOptionsByRoles[roles.ADMIN]} />
    </div>
  );
}

export default MainPage