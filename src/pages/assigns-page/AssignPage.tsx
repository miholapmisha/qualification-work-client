import { useAuth } from "../../components/AuthProvider"
import { searchAssigns } from "../../services/api/assign"
import Loader from "../../components/common/Loader"
import AssignCard from "./AssignCard"
import { ASSIGN_ID_SEPARATOR, useAssigns } from "../../hooks/useAssigns"
import LoaderCard from "../../components/LoaderCard"
import { FilterOperator } from "../../types/filtering"
import Pagination from "../../components/common/Pagination"
import { useSearchParams } from "react-router-dom"
import Dropdown, { DropdownOption } from "../../components/common/Drowdown"
import { useEffect, useState } from "react"
import CloseIcon from "../../components/common/icons/CloseIcon"
import CheckmarkIcon from "../../components/common/icons/CheckmarkIcon"
import CheckedRadioIcon from "../../components/common/icons/CheckedRadioIcon"

type AssignType = 'all' | 'completed' | 'uncompleted'

const dropDownOptions: DropdownOption<AssignType>[] = [
    {
        id: 1,
        label: 'All',
        value: 'all',
        icon: <CheckedRadioIcon width={'16px'} height={'16px'} />
    },
    {
        id: 2,
        label: 'Completed',
        value: 'completed',
        icon: <CheckmarkIcon width={'16px'} height={'16px'} />

    },
    {
        id: 2,
        label: 'Uncompleted',
        value: 'uncompleted',
        icon: <CloseIcon width={'16px'} height={'16px'} />
    }
]

const AssignsPage = () => {

    const { currentUser } = useAuth()
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page')) || 1;
    const [assignsType, setAssignsType] = useState<AssignType>('all')
    const [totalPages, setTotalPages] = useState(0)

    const { assigns, fetchingAssigns, proceedingAssignsIds, paginationData } = useAssigns({
        queryKey: ['assigns', currentUser?._id, page, assignsType],
        queryFn: () => searchAssigns({
            searchParams: [
                { field: 'studentId', operator: FilterOperator.EQ, value: currentUser?._id },
                ...(assignsType === 'all') ? [] :
                    [{ field: 'answers', operator: FilterOperator.EXISTS, value: assignsType === 'completed' }],
            ],
            pagination: {
                page: page,
                take: 6,
            }
        }),
    })

    const handleTypeChange = (type: AssignType) => {
        setAssignsType(type)
        setSearchParams((prevParams) => {
            const params = new URLSearchParams(prevParams);
            params.delete('page')
            return params;
        });
    }

    useEffect(() => {
        if (paginationData?.pageCount) {
            setTotalPages(paginationData?.pageCount)
        }
    }, [paginationData?.pageCount])

    return (
        <div className="w-full flex-auto rounded-2xl bg-primary-50 overflow-y-auto p-16 space-y-10 flex flex-col">
            <div className="space-y-6 ">
                <div className="border-b-1 border-primary-800 pb-4 flex justify-between items-end">
                    <div className="flex flex-col text-4xl  space-y-4">
                        <div className="font-secondary">
                            <span className="font-light">You are participant of group </span>
                            <span className="font-secondary font-medium">
                                {currentUser?.group?.name}
                            </span>
                        </div>

                        <span className="text-2xl">Here is surveys that assign to your group</span>
                    </div>
                    <Dropdown
                        options={dropDownOptions}
                        value={assignsType}
                        onChange={handleTypeChange}
                    />
                </div>
                {fetchingAssigns ?
                    <div className="w-full h-full">
                        <Loader size={{ width: '86px', height: '86px' }} classes="m-auto" />
                    </div>
                    :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {(assigns?.map((assign =>
                        (proceedingAssignsIds.some(
                            (processedId) => processedId === currentUser?._id + ASSIGN_ID_SEPARATOR + assign.survey._id
                        )
                            ?
                            <LoaderCard key={assign.survey._id} />
                            :
                            <AssignCard key={assign.survey._id} assign={assign} />)
                        ))
                        )}

                    </div>
                }


            </div>
            <div className="mt-auto flex justify-center">
                {totalPages > 0 && <Pagination totalPages={totalPages} />}
            </div>
        </div>
    )

}

export default AssignsPage