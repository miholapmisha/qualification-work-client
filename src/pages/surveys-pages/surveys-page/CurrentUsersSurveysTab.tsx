import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../../../components/common/Button";
import SurveyIcon from "../../../components/common/icons/SurveyIcon";
import Loader from "../../../components/common/Loader";
import { searchSurveys } from "../../../services/api/surveys";
import { FilterOperator } from "../../../types/filtering";
import SurveyCard from "./SurveyCard";
import { useEffect, useState } from "react";
import Pagination from "../../../components/common/Pagination";
import { useAuth } from "../../../components/AuthProvider";
import { Survey } from "../../../types/survey";

type CurrentUsersSurveysTabProps = {
    debouncedSearchQuery: string;
    onClickAssign: (survey: Survey) => void
}

const CurrentUsersSurveysTab = ({ debouncedSearchQuery, onClickAssign }: CurrentUsersSurveysTabProps) => {

    const [searchParams] = useSearchParams();
    const [totalPages, setTotalPages] = useState(0);
    const { currentUser } = useAuth();
    const page = Number(searchParams.get('page')) || 1;

    const { data: currentUserSurveysResponse, isLoading: fetchingCurrentUserSurveys } = useQuery({
        queryKey: ['surveys', currentUser?._id, debouncedSearchQuery, page],
        queryFn: () => searchSurveys({
            searchParams: [
                { field: 'authorId', operator: FilterOperator.EQ, value: currentUser?._id },
                { field: 'title', operator: FilterOperator.REGEX, value: debouncedSearchQuery },
            ],
            pagination: {
                page: page,
                take: 6,
            }
        })
    });


    const currentUsersSurveys = Array.isArray(currentUserSurveysResponse?.data?.payload)
        ? currentUserSurveysResponse?.data?.payload
        : currentUserSurveysResponse?.data?.payload?.data;
    console.log("Current users surveys: ", currentUsersSurveys)
    const paginationData = !Array.isArray(currentUserSurveysResponse?.data?.payload)
        ? currentUserSurveysResponse?.data?.payload?.metaData
        : undefined

    useEffect(() => {
        if (paginationData?.pageCount) {
            setTotalPages(paginationData?.pageCount);
        }
    }, [paginationData])

    if (fetchingCurrentUserSurveys) {
        return (
            <div className='h-full flex flex-col justify-between'>
                <div className="flex flex-col justify-center items-center space-y-4">
                    <Loader size={{ width: '64px', height: '64px' }} />
                    <p className="text-primary-600 text-center">Loading your surveys...</p>
                </div>
                <div className="mt-auto flex justify-center">
                    {totalPages > 0 && <Pagination totalPages={totalPages} />}
                </div>
            </div>
        );
    }

    if (!currentUsersSurveys || currentUsersSurveys.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <SurveyIcon width={'64px'} height={'64px'} />
                <h3 className="text-xl font-medium text-primary-800 mb-2">No surveys yet</h3>
                <p className="text-primary-600 mb-6 max-w-md">Create your first survey to start collecting responses from students</p>
                <Button classes='flex items-center space-x-2'>
                    <Link to='/surveys/create' className="flex items-center space-x-2">
                        <span>+ Create Survey</span>
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col justify-between">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentUsersSurveys.map(survey => (
                    <SurveyCard onClickAssign={onClickAssign} key={survey._id} survey={survey} isOwner={true} />
                ))}
            </div>
            <div className="mt-auto flex justify-center">
                {totalPages > 0 && <Pagination totalPages={totalPages} />}
            </div>
        </div>
    );
};

export default CurrentUsersSurveysTab