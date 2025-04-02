import UsersGroupIcon from "../../../../components/ui/icons/UsersGroupIcon";
import { User } from "../../../../types/user";
import GroupUsersSkeleton from "./GroupUsersSkeleton";

type CurrentMembersTabProps = {
    groupMembers: User[];
    removeUserFromGroup: (userId: string) => void,
    fetchingGroupMembers: boolean,
    assigningUsers: boolean
};

const CurrentMembersTab = ({ groupMembers, removeUserFromGroup, fetchingGroupMembers, assigningUsers }: CurrentMembersTabProps) => {

    return fetchingGroupMembers ?
        <div className="space-y-2 overflow-y-auto">
            {[...Array(5)].map((_, i) => (
                <GroupUsersSkeleton key={i} />
            ))}
        </div>
        :
        groupMembers.length > 0 ? (
            <div className="space-y-2">
                <div className="grid grid-cols-12 text-xs font-medium text-primary-500 py-2 px-4 sticky top-0 bg-primary-100 rounded-t-lg">
                    <div className="col-span-5">User</div>
                    <div className="col-span-4">Email</div>
                    <div className="col-span-1"></div>
                </div>
                <div className={`${assigningUsers ? 'blur-sm' : null}`}>
                    {groupMembers.map((user) => (
                        <div
                            key={user._id}
                            className="grid grid-cols-12 items-center bg-white rounded-lg border border-primary-200 p-3 hover:shadow-sm"
                        >
                            <div className="col-span-5 flex items-center">
                                <div className="w-8 h-8 rounded-full bg-primary-700 text-white flex items-center justify-center font-medium">
                                    {user.name.charAt(0)}
                                </div>
                                <span className="ml-3 font-medium">{user.name}</span>
                            </div>
                            <div className="col-span-4 text-primary-600 truncate">{user.email}</div>
                            <div className="col-span-1 text-right">
                                <button
                                    onClick={() => removeUserFromGroup(user._id)}
                                    className="text-primary-400 hover:text-primary-700 p-1"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <div className="h-full flex-auto flex flex-col items-center justify-center text-primary-500 bg-primary-50 rounded-lg border border-primary-200">
                <UsersGroupIcon fill="none" width={"46px"} height={"46px"} />
                <p>No users in this group</p>
            </div>
        );
};

export default CurrentMembersTab;