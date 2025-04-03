import SurveyIcon from "../components/common/icons/SurveyIcon";
import UniversityIcon from "../components/common/icons/UniversityIcon";
import UsersIcon from "../components/common/icons/UsersIcon";
import { Role } from "../types/user";
import { adminRoutes } from "./admin";
import { teacherRoutes } from "./teacher";

export const ROUTE_SIDEBAR_CONFIG = {
    [Role.ADMIN.toString()]: [
        {
            title: "System",
            path: '/system',
            icon: UniversityIcon
        },
        {
            title: "Users",
            path: '/users',
            icon: UsersIcon
        }
    ],
    [Role.TEACHER.toString()]: [
        {
            title: "Surveys",
            path: '/surveys',
            icon: SurveyIcon
        }
    ],
    [Role.STUDENT.toString()]: []
};

export const routesByPriority = [
    { routes: adminRoutes, role: Role.ADMIN },
    { routes: teacherRoutes, role: Role.TEACHER },
    { routes: [], role: Role.STUDENT },
]