import { useQuery } from "@tanstack/react-query";
import SurveyIcon from "../../../components/common/icons/SurveyIcon";
import Loader from "../../../components/common/Loader";
import { searchSurveys } from "../../../services/api/surveys";
import { FilterOperator } from "../../../types/filtering";
import SurveyCard from "./SurveyCard";
import Pagination from "../../../components/common/Pagination";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/AuthProvider";

type AllSurveysTabProps = {
    debouncedSearchQuery: string;
}

const AllSurveysTab = ({ debouncedSearchQuery }: AllSurveysTabProps) => {

    const { currentUser } = useAuth();
    const [searchParams] = useSearchParams();
    const [totalPages, setTotalPages] = useState(0);
    const page = Number(searchParams.get('page')) || 1;

    const { data: usersSurveysResponse, isLoading: fetchingUsersSurveys } = useQuery({
        queryKey: ['surveys', 'all', debouncedSearchQuery, page],
        queryFn: () => searchSurveys({
            searchParams: [
                { field: 'title', operator: FilterOperator.REGEX, value: debouncedSearchQuery },
            ],
            pagination: {
                page: page,
                take: 6,
            }
        })
    });

    const usersSurveys = Array.isArray(usersSurveysResponse?.data?.payload)
        ? usersSurveysResponse?.data?.payload
        : usersSurveysResponse?.data?.payload?.data;

    const paginationData = !Array.isArray(usersSurveysResponse?.data?.payload)
        ? usersSurveysResponse?.data?.payload?.metaData
        : undefined

    useEffect(() => {
        if (paginationData?.pageCount) {
            setTotalPages(paginationData?.pageCount);
        }
    }, [paginationData])

    if (fetchingUsersSurveys) {
        return (
            <div className='h-full flex flex-col justify-between'>
                <div className="flex flex-col justify-center items-center space-y-4">
                    <Loader size={{ width: '64px', height: '64px' }} />
                    <p className="text-primary-600 text-center">Loading system surveys...</p>
                </div>
                <div className="mt-auto flex justify-center">
                    {totalPages > 0 && <Pagination totalPages={totalPages} />}
                </div>
            </div>
        );
    }

    if (!usersSurveys || usersSurveys.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <SurveyIcon width={'64px'} height={'64px'} />
                <h3 className="text-xl font-medium text-primary-800 mb-2">No system surveys available</h3>
                <p className="text-primary-600 mb-4">There are currently no system-wide surveys available</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col justify-between">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {usersSurveys.map(survey => (
                    <SurveyCard key={survey._id} survey={survey} isOwner={currentUser?._id === survey.authorId} />
                ))}
            </div>
            <div className="mt-auto flex justify-center">
                {totalPages > 0 && <Pagination totalPages={totalPages} />}
            </div>
        </div>
    );
};

export default AllSurveysTab