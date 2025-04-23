import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategories, deleteCategory, fetchCategories, updateCategory } from "../services/api/category";
import { ApiResponse } from "../services/api/common";
import { Category } from "../types/category";
import { useState } from "react";
import { defaultPathSeparator } from "../pages/system-pages/common";
import { getParentId, isDescendant } from "../util/category";
import { NetworkError } from "../types/error";

type useCategoryProps = {
    queryKey: any[];
    fetchParams: any;
    enabled?: boolean;
};

export const useCategory = ({ queryKey, fetchParams, enabled }: useCategoryProps) => {
    const queryClient = useQueryClient();
    const [proceedingCategoriesIds, setProceedingCategoriesIds] = useState<string[]>([]);
    const [parentIdsCreatingCategories, setParentIdsCreatingCategories] = useState<string[]>([]);
    const [lastErrorMessage, setLastErrorMessage] = useState<NetworkError | undefined>(undefined);

    const { data: response, isLoading: fetchingCategories } = useQuery({
        queryFn: async () => {
            const response = await fetchCategories(fetchParams)
            if (response.error) {
                setLastErrorMessage({ id: crypto.randomUUID(), message: response.data.message })
            }

            return response
        },
        queryKey,
        enabled
    });

    const { mutateAsync: createCategoriesMutation } = useMutation({
        mutationFn: (categories: Category[]) => {
            setParentIdsCreatingCategories((prevIds) => {
                const parentIds = categories.map((category) => getParentId(category, defaultPathSeparator));
                return [...prevIds, ...parentIds];
            });

            return createCategories(categories);
        },
        onSettled: (response, _, context) => {
            const categories = context;
            setParentIdsCreatingCategories((prevIds) => {
                const parentIds = categories.map((category) => getParentId(category, defaultPathSeparator));
                return prevIds.filter((id) => !parentIds.includes(id));
            });

            if (response?.error) {
                setLastErrorMessage({ message: response.data.message, id: crypto.randomUUID() });
            } else {
                queryClient.setQueryData(queryKey, (oldData: ApiResponse<Category[] | undefined>) => {
                    if (!response?.error && response?.data.payload && oldData?.data?.payload) {
                        return {
                            ...oldData,
                            data: {
                                message: response.data.message,
                                payload: [...oldData.data.payload, ...response.data.payload],
                            },
                        };
                    }

                    return oldData;
                });
            }
        },
    });

    const { mutateAsync: deleteCategoryMutation } = useMutation({
        mutationFn: (_id: string) => {
            setProceedingCategoriesIds((prevIds) => [...prevIds, _id]);
            return deleteCategory({ _id });
        },
        onSettled: (response, _, context) => {
            const deletionId = context;
            setProceedingCategoriesIds((prevIds) => prevIds.filter((id) => id !== deletionId));

            if (response?.error) {
                setLastErrorMessage({ message: response.data.message, id: crypto.randomUUID() });
            } else {
                queryClient.setQueryData(queryKey, (oldData: ApiResponse<Category[] | undefined>) => {
                    if (!response?.error && oldData?.data?.payload) {
                        return {
                            ...oldData,
                            data: {
                                message: response?.data.message,
                                payload: oldData.data.payload.filter(
                                    (category) =>
                                        category._id !== deletionId &&
                                        !isDescendant(category, deletionId, defaultPathSeparator)
                                ),
                            },
                        };
                    }

                    return oldData;
                });
            }
        },
    });

    const { mutateAsync: updateCategoryMutation } = useMutation({
        mutationFn: ({ _id, data }: { _id: string; data: Category }) => {
            setProceedingCategoriesIds((prevIds) => [...prevIds, _id]);
            return updateCategory({ _id, data });
        },
        onSettled: (response, _, context) => {
            const editionId = context._id;
            setProceedingCategoriesIds((prevIds) => prevIds.filter((id) => id !== editionId));

            if (response?.error) {
                setLastErrorMessage({ message: response.data.message, id: crypto.randomUUID() });
            } else {
                queryClient.setQueryData(queryKey, (oldData: ApiResponse<Category[] | undefined>) => {
                    if (!response?.error && oldData?.data?.payload) {
                        const updatedCategories = [...oldData.data.payload];
                        const index = updatedCategories.findIndex((category) => category._id === editionId);
                        if (index !== -1) {
                            updatedCategories[index] = response?.data.payload;
                        }

                        return {
                            ...oldData,
                            data: {
                                message: response?.data.message,
                                payload: updatedCategories,
                            },
                        };
                    }

                    return oldData;
                });
            }
        },
    });

    return {
        fetchingCategories,
        categories: response?.data?.payload,
        error: lastErrorMessage,
        message: response?.data?.message,
        parentIdsCreatingCategories,
        proceedingCategoriesIds,
        createCategories: createCategoriesMutation,
        deleteCategory: deleteCategoryMutation,
        updateCategory: updateCategoryMutation,
    };
};