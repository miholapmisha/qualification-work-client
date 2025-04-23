import UsersTable from "./users-table/UsersTable"
import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";
import UserFormModal from "./UserFormModal";
import { User, UserPayload } from "../../types/user";

const defaultPage = 1;
const defaultItemsPerPage = 2;

const UsersPage = () => {

    const [searchParams] = useSearchParams();
    const [totalPages, setTotalPages] = useState(0);
    const page = Number(searchParams.get('page')) || defaultPage;

    const [editableUser, setEditableUser] = useState<null | undefined | User>(null)

    const {
        fetchingUsers,
        isPlaceholderUsers,
        users,
        paginationData,
        createUser,
        updateUser,
        deleteUser,
        proceedingUsersIds,
        isUserCreating
    } = useUsers({
        queryKey: ['users', page, defaultItemsPerPage],
        fetchParams: {
            pagination: {
                page, take: defaultItemsPerPage
            }
        }
    })

    useEffect(() => {
        if (paginationData?.pageCount) {
            setTotalPages(paginationData?.pageCount);
        }
    }, [paginationData])

    const handleUserFormSave = (userData: UserPayload) => {
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
            <div className="flex-auto rounded-2xl bg-primary-50 overflow-y-auto p-16 space-y-10 flex flex-col items-center">
                {fetchingUsers && !users && <Loader classes="m-auto" size={{ width: '86px', height: '86px' }} />}
                {users && users.length > 0 && totalPages > 0 &&
                    <>
                        <div className={`flex-auto w-full space-y-6 ${isPlaceholderUsers && fetchingUsers && 'blur-sm'}`}>
                            <UsersTable onDeleteUser={(_id: string) => deleteUser(_id)}
                                proceedingUsersIds={proceedingUsersIds}
                                onEditUser={(user: User) => setEditableUser(user)} users={users} />
                        </div>
                        <button disabled={isUserCreating} className={`disabled:bg-primary-100 disabled:text-primary-400 mr-auto hover:bg-primary-300 text-sm text-primary-600 rounded-2xl cursor-pointer px-4 py-2 bg-primary-200`}
                            onClick={() => { setEditableUser(undefined) }}>
                            {isUserCreating ?
                                <div className="flex items-center space-x-2">
                                    <Loader color={"#9ca3af"} size={{ width: '16px', height: '16px' }} />
                                    <span>Creating...</span>
                                </div> :
                                <span>+ Add user</span>
                            }

                        </button>
                    </>
                }

                {totalPages > 0 && <Pagination totalPages={totalPages} />}
            </div>

            {editableUser !== null &&
                <UserFormModal user={editableUser} onSave={(userData) => handleUserFormSave(userData)}
                    isOpen={editableUser !== null}
                    onClose={() => setEditableUser(null)} />}
        </>
    )
}

export default UsersPage