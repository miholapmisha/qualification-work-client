import Modal from "../../components/ui/Modal"
import Button from "../../components/ui/Button"
import UsersIcon from "../../components/ui/icons/UsersIcon"
import Input from "../../components/ui/Input"
import { Role, User, UserFormPayload } from "../../types/user"
import Switch from "../../components/ui/Switch"
import InfoIcon from "../../components/ui/icons/InfoIcon"
import { useForm } from "react-hook-form"
import { isStrongPassword } from "../../util/user"

type UserFormProps = {
    isOpen: boolean,
    onClose: () => void,
    onSave: (user: UserFormPayload) => void,
    user?: User | null
}

const UserFormModal = ({ user, isOpen, onClose, onSave }: UserFormProps) => {

    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<UserFormPayload>({
        defaultValues: {
            ...user,
            roles: user?.roles || [Role.TEACHER]
        }
    });
    const roles = watch('roles')

    const handleRoleSwitch = (userRoles: Role[], roleToUpdate: Role, value: boolean) => {

        const updatedRoles = value
            ? [...userRoles, roleToUpdate]
            : userRoles.filter((role) => role !== roleToUpdate);

        if (updatedRoles.length <= 0) {
            return userRoles
        }

        if (roleToUpdate === Role.ADMIN || roleToUpdate === Role.TEACHER) {
            return [...updatedRoles.filter(role => role !== Role.STUDENT)]
        }

        return updatedRoles.filter(role => role !== Role.TEACHER && role !== Role.ADMIN)
    }


    // TODO: update to more flexible function logic
    const handleFormSubmission = (data: UserFormPayload) => {
        if (user && !data.password) {
            delete data.password
        }
        if (user && user.email === data.email) {
            delete data.email
        }
        if (user && user.name === data.name) {
            delete data.name
        }
        if (user && JSON.stringify(user.roles) === JSON.stringify(data.roles)) {
            delete data.roles
        }
        
        onSave(data)
    }

    const validatePassword = (value: string | undefined) => {
        if (user) {
            if (value && !isStrongPassword(value)) {
                return "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character";
            }
        } else {
            if (!value) {
                return "Password is required";
            }
            if (!isStrongPassword(value)) {
                return "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character";
            }
        }
        return true;
    }

    return (
        <Modal key={user?._id} isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(handleFormSubmission)}>
                <div className="w-full max-w-[568px] h-full p-4 space-y-10">
                    <div className="space-y-6">
                        <div className="flex space-x-4 items-baseline">
                            <UsersIcon />
                            <h2 className="text-xl font-semibold text-gray-900">{user ? `Edit ${user.name}` : 'Create a new user'}</h2>
                        </div>
                        <div className="flex justify-between h-full max-h-[52px]">

                            <Input defaultValue={user?.name || ''} {...register('name', { required: "Name is required" })} error={errors?.name} name="name" id="name" label="Name" />
                            <Input defaultValue={user?.email || ''} {...register('email', { required: "Email is required" })} error={errors?.email} name="email" id="email" label="Email" />
                        </div>
                        <div className={`${user ? 'h-[92px]' : 'h-[62px]'} space-y-2`}>
                            {user && <h2 className="font-semibold text-gray-900">Set new password for user (optional)</h2>}
                            <Input
                                {...register('password', {
                                    validate: (value) => validatePassword(value)
                                })}
                                error={errors?.password}
                                type="password"
                                name="password"
                                id="password"
                                label="Password"
                            />
                        </div>
                        <div className="space-y-2">
                            <h2 className="font-semibold text-gray-900">Select role</h2>
                            <div className="flex space-x-2">
                                <InfoIcon className="fill-primary-400" />
                                <p className="font-secondary text-primary-400">Note that a user cannot have the student role along with other roles at the same time</p>
                            </div>
                        </div>
                        <div className="flex justify-center space-x-14">
                            {Object.values(Role).map((role) => (
                                <div className="flex space-x-2 items-center" key={role}>
                                    <span className="font-secondary text-primary-600">
                                        {role}
                                    </span>
                                    <Switch
                                        switchOn={roles && roles.includes(role) || false}
                                        onChangeSwitchState={(value) => {
                                            const updatedRoles = handleRoleSwitch(roles || [], role, value)
                                            setValue("roles", updatedRoles);
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                        {errors.roles && <p className="text-red-600">{errors.roles.message}</p>}
                    </div>
                    <div className="flex justify-end space-x-4">
                        <Button className="cursor-pointer hover:bg-primary-300 bg-primary-200 px-2 rounded" onClick={() => onClose()}>Close</Button>
                        <Button type="submit">Save</Button>
                    </div>
                </div>
            </form>
        </Modal >
    )
}

export default UserFormModal