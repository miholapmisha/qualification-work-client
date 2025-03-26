import { Role } from "../../../types/user"

const ROLE_STYLES = {
    [Role.ADMIN]: {
        background: 'bg-red-100',
        text: 'text-red-800',
        border: 'border-red-300'
    },
    [Role.STUDENT]: {
        background: 'bg-blue-100',
        text: 'text-blue-800',
        border: 'border-blue-300'
    },
    [Role.TEACHER]: {
        background: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-300'
    },
    default: {
        background: 'bg-primary-100',
        text: 'text-primary-800',
        border: 'border-primary-300'
    }
}

interface RoleCellProps {
    roles: Role[]
}

const RoleCell = ({ roles }: RoleCellProps) => {
    return (
        <div className="flex flex-wrap gap-2">
            {roles.map((role, index) => {
                const styles = ROLE_STYLES[role] || ROLE_STYLES.default

                return (
                    <div
                        key={index}
                        className={`
                            px-2 py-1 rounded-full 
                            text-sm font-medium 
                            ${styles.background} 
                            ${styles.text} 
                            ${styles.border}
                            border
                            inline-flex items-center
                        `}
                    >
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                    </div>
                )
            })}
        </div>
    )
}

export default RoleCell
