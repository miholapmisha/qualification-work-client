import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "../services/api/common";
import { Assign } from "../types/assign";
import { completeSurveyAssign } from "../services/api/assign";
import { AnswersObject } from "../types/answer";
import { useProceedingIds } from "./useProcessingIds";
import { PaginationObject } from "../types/pagination";

export type useAssignProps = {
    queryFn?: () => Promise<ApiResponse<PaginationObject<Assign> | Assign[]>>;
    queryKey: any[];
};

export const PROCEEDING_ASSIGNS_CACHE_KEY = 'proceedingAssignsIds'
export const ASSIGN_ID_SEPARATOR = '::'

export const useAssigns = ({ queryFn, queryKey }: useAssignProps) => {

    const queryClient = useQueryClient();
    const { proceedingIds: proceedingAssignsIds, setProceedingIds: setProceedingAssignsIds } = useProceedingIds(
        {
            queryKey: [PROCEEDING_ASSIGNS_CACHE_KEY]
        }
    );

    const { mutateAsync: completeSurveyMutation } = useMutation({
        mutationFn: ({ assignId, answers }: { assignId: string; answers: AnswersObject }) => {
            const parts = assignId.split(ASSIGN_ID_SEPARATOR)
            const userId = parts[0]
            const surveyId = parts[1]
            return completeSurveyAssign({ userId, surveyId }, answers)
        },
        onMutate: async ({ assignId }) => {
            setProceedingAssignsIds((prevIds) => [...prevIds, assignId]);
        },
        onSuccess: async (response, { assignId }) => {
            if (response && !response.error) {
                await queryClient.refetchQueries({ queryKey });
            }
            setProceedingAssignsIds((prevIds) => (prevIds.filter((itemId) => itemId !== assignId)));
        },
    });

    if (!queryFn) {

        return {
            completeSurveyMutation,
            proceedingAssignsIds
        }
    }

    const { data: userAssignsResponse, isLoading: fetchingAssigns } = useQuery({
        queryKey,
        queryFn,
    });

    const assigns = Array.isArray(userAssignsResponse?.data?.payload)
        ? userAssignsResponse?.data?.payload
        : userAssignsResponse?.data?.payload?.data;

    const paginationData = !Array.isArray(userAssignsResponse?.data?.payload)
        ? userAssignsResponse?.data?.payload?.metaData
        : undefined

    return {
        proceedingAssignsIds,
        paginationData,
        assigns,
        fetchingAssigns,
        completeSurveyMutation,
    };
};