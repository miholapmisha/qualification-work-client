import Modal from "../../../../components/common/Modal";
import { useEffect, useMemo, useState } from "react";
import CurrentMembersTab from "./CurrentMembersTab";
import AddUsersTab from "./AddUsersTab";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { assignUsersToGroup, getUsers } from "../../../../services/api/user";
import { Role, User } from "../../../../types/user";
import { useDebounce } from "../../../../hooks/useDebounce";
import { FilterOperator } from "../../../../types/filtering";
import Button from "../../../../components/common/Button";
import Loader from "../../../../components/common/Loader";

type GroupModalProps = {
    groupId: string,
    isOpen: boolean;
    onClose: () => void;
};

const GroupModal = ({ isOpen, onClose, groupId }: GroupModalProps) => {

    const [searchQuery, setSearchQuery] = useState("")
    const [activeTab, setActiveTab] = useState<"members" | "search">("members")
    const debouncedSearchQuery = useDebounce({ value: searchQuery, milliseconds: 1000 }) || ''
    const [groupMembers, setGroupMembers] = useState<User[]>([])
    const groupMembersIds = useMemo(() => groupMembers.map(member => member._id), [groupMembers]);
    const queryClient = useQueryClient();

    const { data: searchUsersResponse, isFetching: searchingUsers } = useQuery({
        queryKey: ['searchUsers', debouncedSearchQuery, groupId],
        queryFn: () => getUsers({
            searchParams: [
                {
                    operator: FilterOperator.OR,
                    value: [
                        { field: 'name', operator: FilterOperator.REGEX, value: debouncedSearchQuery },
                        { field: 'email', operator: FilterOperator.REGEX, value: debouncedSearchQuery },
                        { field: 'groupId', operator: FilterOperator.EQ, value: groupId },
                    ]
                },
                {
                    operator: FilterOperator.OR,
                    value: [
                        { field: 'groupId', operator: FilterOperator.EXISTS, value: false },
                        { field: 'groupId', operator: FilterOperator.EQ, value: "" },
                        { field: 'groupId', operator: FilterOperator.EQ, value: groupId },
                    ]
                },
                { field: 'roles', operator: FilterOperator.IN, value: [Role.STUDENT] },
            ]
        }),
        enabled: debouncedSearchQuery.trim() !== '',
    });

    const { data: groupMembersResponse, isFetching: fetchingGroupMembers } = useQuery({
        queryKey: ['groupMembers', groupId],
        queryFn: () => getUsers({
            searchParams: [
                { field: 'groupId', operator: FilterOperator.EQ, value: groupId }
            ]
        }),
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        if (!groupMembersResponse?.error) {
            setGroupMembers((groupMembersResponse?.data.payload as User[]) || [])
        }
    }, [groupMembersResponse])

    const { mutateAsync: assignUsersToGroupMutation, isPending: assigningUsers } = useMutation({
        mutationFn: ({ groupId, users }: { groupId: string; users: User[] }) =>
            assignUsersToGroup({ groupId, usersIds: users.map(user => user._id) }),

        onSettled: (response, _, context) => {
            const updatedUsers = context?.users
            if (response && response.error) {
                setGroupMembers((groupMembersResponse?.data.payload as User[]) || [])
            }
            if (response && !response.error) {
                queryClient.setQueryData(['groupMembers', groupId], () => {
                    return {
                        ...groupMembersResponse,
                        data: {
                            ...groupMembersResponse?.data,
                            payload: updatedUsers
                        }
                    }
                })
            }
        }
    })

    const searchUsers = useMemo(() => {
        if (debouncedSearchQuery.trim() === '') return [];
        return ((searchUsersResponse?.data.payload as User[]) || []).filter(
            (user: User) => !groupMembersIds.includes(user._id)
        );
    }, [debouncedSearchQuery, searchUsersResponse, groupMembersIds]);

    const handleSearch = (e: any) => {
        setSearchQuery(e.target.value)
    };

    const addUserToGroup = (user: User) => {
        setGroupMembers([...groupMembers, user]);
    };

    const removeUserFromGroup = (userId: string) => {
        const removedUser = groupMembers.find((user) => user._id === userId);
        if (removedUser) {
            setGroupMembers(groupMembers.filter((user) => user._id !== userId));
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="min-w-[768px] w-[768px]">
                <div className="p-6">
                    {/* Header with Title and Tabs */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-primary-800 mb-4">Manage Group Users</h2>

                        <div className="flex border-b border-primary-200">
                            <button
                                className={`flex items-center cursor-pointer py-2 px-4 font-medium text-sm -mb-px ${activeTab === "members"
                                    ? "border-b-2 text-cyan-600 border-cyan-600"
                                    : "text-primary-500 hover:text-primary-700"
                                    }`}
                                onClick={() => setActiveTab("members")}
                            >
                                Current Members
                                {fetchingGroupMembers ?
                                    <Loader classes="ml-2" size={{ width: '12px', height: '12px' }} />
                                    :
                                    <span className="ml-2 bg-primary-100  px-2 py-0.5 rounded-full text-xs">
                                        {groupMembers.length}
                                    </span>
                                }

                            </button>
                            <button
                                className={`cursor-pointer py-2 px-4 font-medium text-sm -mb-px ${activeTab === "search"
                                    ? "border-b-2 text-cyan-600 border-cyan-600"
                                    : " hover:text-primary-700"
                                    }`}
                                onClick={() => setActiveTab("search")}
                            >
                                Add Students
                            </button>
                        </div>
                    </div>

                    <div className="h-[400px] overflow-y-auto">
                        {activeTab === "members" && (
                            <CurrentMembersTab
                                assigningUsers={assigningUsers}
                                fetchingGroupMembers={fetchingGroupMembers}
                                groupMembers={groupMembers}
                                removeUserFromGroup={removeUserFromGroup}
                            />
                        )}
                        {activeTab === "search" && (
                            <AddUsersTab
                                searching={searchingUsers}
                                searchQuery={searchQuery}
                                handleSearch={handleSearch}
                                searchResults={searchUsers}
                                addUserToGroup={addUserToGroup}
                            />
                        )}
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="cursor-pointer px-4 py-2 border border-primary-300 rounded-md text-primary-700 hover:bg-primary-50"
                        >
                            {assigningUsers ? 'Close' : 'Cancel'}
                        </button>
                        <Button onClick={() => {
                            assignUsersToGroupMutation({ groupId, users: groupMembers })
                            setActiveTab("members")
                        }}>
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default GroupModal;