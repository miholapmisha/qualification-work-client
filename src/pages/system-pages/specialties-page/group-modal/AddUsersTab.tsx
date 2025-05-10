import { User } from "../../../../types/user";
import SearchIcon from "../../../../components/common/icons/SearchIcon";
import GroupUsersSkeleton from "./GroupUsersSkeleton";
import { useState } from "react";
import Button from "../../../../components/common/Button";
import CloseIcon from "../../../../components/common/icons/CloseIcon";

type AddUsersTabProps = {
    searchQuery: string;
    searching: boolean;
    handleSearch: (e: any) => void;
    searchResults: User[] | undefined;
    addUserToGroup: (user: any) => void;
};

const AddUsersTab = ({ searchQuery, handleSearch, searchResults, addUserToGroup, searching }: AddUsersTabProps) => {

    const [startedSearch, setStartedSearch] = useState<boolean>(true)

    return (
        <div className="h-full flex flex-col">

            <div className="mb-4 relative">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                        setStartedSearch(true)
                        handleSearch(e)
                    }}
                    placeholder="Search users by name or email..."
                    className="outline-none w-full py-2 pl-10 pr-4 border border-primary-300 rounded-lg outline-0"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <SearchIcon fill="none" color="gray" />
                </div>
            </div>

            {!startedSearch ?
                <div className="flex flex-col items-center justify-center h-[340px] text-primary-500 rounded-lg ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <p className="text-center">Start search for new users</p>
                </div> :
                (searching) ? (
                    <div className="space-y-2 h-[310px] overflow-y-auto">
                        {[...Array(4)].map((_, i) => (
                            <GroupUsersSkeleton key={i} />
                        ))}
                    </div>
                ) : <>
                    {searchResults && searchResults?.length > 0 ? (
                        <div className="space-y-2 h-[310px] overflow-y-auto">
                            {searchResults && searchResults.map((user) => (
                                <div
                                    key={user._id}
                                    className="flex items-center justify-between bg-white rounded-lg border border-primary-200 p-3 hover:shadow-sm"
                                >
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-primary-200 text-primary-700 flex items-center justify-center font-medium">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div className="ml-3">
                                            <div className="font-medium">{user.name}</div>
                                            <div className="text-sm text-primary-500">{user.email}</div>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => addUserToGroup(user)}
                                        classes="flex items-center"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                        Add to Group
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) :
                        <div className="flex flex-col items-center justify-center h-[340px] text-primary-500 rounded-lg space-y-4">
                            <div className="border-1 border-primary-400  rounded-full p-2">
                                <CloseIcon />
                            </div>
                            <div className="text-center">
                                <p className="text-center text-2xl">No new students found</p>
                                <p className="text-primary-400 mt-1">Try a different search term</p>
                            </div>
                        </div>}
                </>}


        </div>
    );
};

export default AddUsersTab;