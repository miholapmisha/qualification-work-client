import PageLayout from "../components/PageLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import { FacultyPage } from "../pages/system-page/faculties-page/FacultyPage";
import SystemPage from "../pages/system-page/SystemPage";
import UsersPage from "../pages/users-page/UsersPage";
import { Role } from "../types/user";

export const adminRoutes = [
    {
        element:
            <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                <PageLayout />
            </ProtectedRoute>,
        children: [
            {
                path: '/system',
                element:
                    <SystemPage />,
                children: [
                    {
                        path: '',
                        element: <FacultyPage />
                    }
                ]
            },
            {
                path: '/users',
                element:
                    <UsersPage />
            },
        ]
    }
]