import PageLayout from "../components/PageLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import { FacultiesPage } from "../pages/system-page/faculties-page/FacultiesPage";
import SpecialtiesPage from "../pages/system-page/specialties-page/SpecialtiesPage";
import SpecialtyProvider from "../pages/system-page/specialties-page/SpecialtyProvider";
import SystemPage from "../pages/system-page/SystemPage";
import UsersPage from "../pages/users-page/UsersPage";
import UsersProvider from "../pages/users-page/UsersProvider";
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
                        element: <FacultiesPage />
                    },
                    {
                        path: 'specialties',
                        element:
                            <SpecialtyProvider>
                                <SpecialtiesPage />
                            </SpecialtyProvider>
                    }
                ]
            },
            {
                path: '/users',
                element:
                    <UsersProvider>
                        <UsersPage />
                    </UsersProvider>
            },
        ]
    }
]