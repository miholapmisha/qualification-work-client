import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../components/AuthProvider"
import { getAssigns } from "../../services/api/assign"
import Loader from "../../components/common/Loader"
import AssignCard from "./AssignCard"

const AssignsPage = () => {

    const { currentUser } = useAuth()
    const { data: userAssignsResponse, isLoading: fetchingAssigns } = useQuery({
        queryKey: ['assigns', currentUser?._id],
        queryFn: () => getAssigns(currentUser?._id ? currentUser._id : ''),
    })

    const assigns = userAssignsResponse?.data.payload

    return (
        <div className="flex-auto rounded-2xl bg-primary-50 overflow-y-auto py-12 px-8 md:px-16 lg:px-32 flex">

            {fetchingAssigns ?
                <Loader size={{ width: '86px', height: '86px' }} classes="m-auto" />
                :
                <div className="h-full w-full flex flex-col justify-between">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {assigns?.map((assigns => <AssignCard key={assigns.survey._id} assign={assigns} />))}
                    </div>
                </div>
            }
        </div>
    )

}

export default AssignsPage