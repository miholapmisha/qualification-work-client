import UsersTable from "./users-table/UsersTable"
import Loader from "../../components/ui/Loader";
import Pagination from "../../components/ui/Pagination";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";
import UserFormModal from "./UserFormModal";
import Button from "../../components/ui/Button";
import { User, UserFormPayload } from "../../types/user";
import AlertBlock from "../../components/ui/AlertBlock";

const defaultPage = 1;
const defaultItemsPerPage = 10;

const UsersPage = () => {

    const { search } = useLocation()
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(() => {
        const pageParam = Number(new URLSearchParams(search).get('page'))
        return isNaN(pageParam) || pageParam == 0 ? defaultPage : pageParam
    });

    const [editableUser, setEditableUser] = useState<null | undefined | User>(null)

    const {
        fetchingUsers,
        isPlaceholderUsers,
        users,
        paginationData,
        createUser,
        updateUser,
        deleteUser,
        error,
        proceedingUsersIds,
        isUserCreating
    } = useUsers({
        queryKey: ['users', page, defaultItemsPerPage],
        fetchParams: { page, take: defaultItemsPerPage }
    })

    useEffect(() => {
        if (paginationData?.pageCount) {
            setTotalPages(paginationData?.pageCount);
        }
    }, [paginationData])

    const handleUserFormSave = (userData: UserFormPayload) => {
        if (editableUser) {
            if (Object.keys(userData).length > 1) {
                updateUser({ _id: userData._id, userData })
            }
        } else if (editableUser === undefined) {
            createUser(userData)
        }

        setEditableUser(null)
    }

    return (
        <>
            {error && <AlertBlock key={error.id} absolute={true} alertMessage={error.message} onCloseAlert={() => { }} />}
            <div className="flex-auto rounded-2xl bg-primary-50 overflow-y-auto p-16 space-y-10 flex flex-col items-center">
                {fetchingUsers && !users && <Loader classes="m-auto" size={{ width: '86px', height: '86px' }} />}
                {users && users.length > 0 && totalPages > 0 &&
                    <>
                        <div className={`flex-auto w-full space-y-6 ${isPlaceholderUsers && fetchingUsers && 'blur-sm'}`}>
                            <UsersTable onDeleteUser={(_id: string) => deleteUser(_id)}
                                proceedingUsersIds={proceedingUsersIds}
                                onEditUser={(user: User) => setEditableUser(user)} users={users} />
                        </div>
                        <Button disabled={isUserCreating} className={`disabled:bg-primary-100 disabled:text-primary-400 mr-auto hover:bg-primary-300 text-sm text-primary-600 rounded-2xl cursor-pointer px-4 py-2 bg-primary-200`}
                            onClick={() => { setEditableUser(undefined) }}>
                            {isUserCreating ?
                                <div className="flex items-center space-x-2">
                                    <Loader color={"#9ca3af"} size={{ width: '16px', height: '16px' }} />
                                    <span>Creating...</span>
                                </div> :
                                <span>+ Add user</span>
                            }

                        </Button>
                    </>
                }

                {totalPages > 0 && <Pagination selectedPage={page} setSelectedPage={(page) => setPage(page)} totalPages={totalPages} />}
            </div>

            {editableUser !== null &&
                <UserFormModal user={editableUser} onSave={(userData) => handleUserFormSave(userData)}
                    isOpen={editableUser !== null}
                    onClose={() => setEditableUser(null)} />}
        </>
    )
}

export default UsersPage