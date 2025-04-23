import PageLayout from "../components/PageLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import { FacultiesPage } from "../pages/system-pages/faculties-page/FacultiesPage";
import SpecialtiesPage from "../pages/system-pages/specialties-page/SpecialtiesPage";
import SpecialtyProvider from "../pages/system-pages/specialties-page/SpecialtyProvider";
import SystemPage from "../pages/system-pages/SystemPage";
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