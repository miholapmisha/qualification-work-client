import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import SurveyIcon from "../../../components/common/icons/SurveyIcon";
import Loader from "../../../components/common/Loader";
import { searchSurveys } from "../../../services/api/surveys";
import { FilterOperator } from "../../../types/filtering";
import SurveyCard from "./SurveyCard";
import Pagination from "../../../components/common/Pagination";
import { useAuth } from "../../../components/AuthProvider";
import { Survey } from "../../../types/survey";
import { useEffect, useState } from "react";

type SurveysTabProps = {
    debouncedSearchQuery: string;
    onClickAssign: (survey: Survey) => void;
    type: 'my' | 'all';
};

const SurveysTab = ({ debouncedSearchQuery, onClickAssign, type }: SurveysTabProps) => {
    const { currentUser } = useAuth();
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const [totalPages, setTotalPages] = useState(0)

    const { data: surveysResponse, isLoading: fetchingSurveys } = useQuery({
        queryKey: ['surveys', type, currentUser?._id, debouncedSearchQuery, page],
        queryFn: () => searchSurveys({
            searchParams: [
                ...(type === 'my' && currentUser?._id
                    ? [{ field: 'authorId', operator: FilterOperator.EQ, value: currentUser._id }]
                    : []),
                { field: 'title', operator: FilterOperator.REGEX, value: debouncedSearchQuery },
            ],
            pagination: {
                page: page,
                take: 6,
            },
        }),
    });

    const surveys = Array.isArray(surveysResponse?.data?.payload)
        ? surveysResponse?.data?.payload
        : surveysResponse?.data?.payload?.data;

    const paginationData = !Array.isArray(surveysResponse?.data?.payload)
        ? surveysResponse?.data?.payload?.metaData
        : undefined;

    useEffect(() => {
        if (paginationData?.pageCount) {
            setTotalPages(paginationData?.pageCount)
        }
    }, [paginationData?.pageCount])

    if (fetchingSurveys) {
        return (
            <div className="h-full flex flex-col justify-between">
                <div className="flex flex-col justify-center items-center space-y-4">
                    <Loader size={{ width: '64px', height: '64px' }} />
                    <p className="text-primary-600 text-center">Loading surveys...</p>
                </div>
                <div className="mt-auto flex justify-center">
                    {totalPages > 0 && <Pagination totalPages={totalPages} />}
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col justify-between">
            {!surveys || surveys.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <SurveyIcon width={'64px'} height={'64px'} />
                    <h3 className="text-xl font-medium text-primary-800 mb-2">
                        {type === 'my' ? 'No surveys' : 'No system surveys available'}
                    </h3>
                    <p className="text-primary-600 mb-6 max-w-md">
                        {type === 'my'
                            ? 'Create your survey to start collecting responses from students'
                            : 'There are currently no system-wide surveys available'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {surveys.map((survey) => (
                        <SurveyCard
                            onClickAssign={onClickAssign}
                            key={survey._id}
                            survey={survey}
                            isOwner={currentUser?._id === survey.authorId}
                        />
                    ))}
                </div>
            )}
            <div className="mt-auto flex justify-center">
                {totalPages > 0 && <Pagination totalPages={totalPages} />}
            </div>
        </div>
    );
};

export default SurveysTab;