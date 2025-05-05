import SurveyAssignIcon from "../components/common/icons/SurveyAssignIcon";
import SurveyIcon from "../components/common/icons/SurveyIcon";
import UniversityIcon from "../components/common/icons/UniversityIcon";
import UsersIcon from "../components/common/icons/UsersIcon";
import { Role } from "../types/user";
import { adminRoutes } from "./admin";
import { studentsRoutes } from "./student";
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
    [Role.STUDENT.toString()]: [
        {
            title: "Assigns",
            path: '/assigns',
            icon: SurveyAssignIcon
        }
    ]
};

export const routesByPriority = [
    { routes: adminRoutes, role: Role.ADMIN },
    { routes: teacherRoutes, role: Role.TEACHER },
    { routes: studentsRoutes, role: Role.STUDENT },
]