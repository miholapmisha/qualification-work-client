import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createCategories, deleteCategory, fetchCategories, updateCategory } from "../services/api/category"
import { ApiResponse } from "../services/api/common"
import { Category } from "../types/category"
import { useState } from "react"

type useCategoryProps = {
    queryKey: any[],
    fetchParams: any
    enabled?: boolean
}

export const useCategory = ({ queryKey, fetchParams, enabled }: useCategoryProps) => {
    const queryClient = useQueryClient()
    const [proceedingCategoriesIds, setProceedingCategoriesIds] = useState<string[]>([])

    const { data: response, isLoading: fetchingCategories } = useQuery({
        queryFn: () => fetchCategories(fetchParams),
        queryKey,
        enabled
    })

    const { mutateAsync: createCategoriesMutation, isPending: addingCategories } = useMutation({
        mutationFn: createCategories,
        onSuccess: (response: ApiResponse<Category[]>) => {

            queryClient.setQueryData(queryKey, (oldData: ApiResponse<Category[] | undefined>) => {

                if (!response.error && response.data.payload && oldData.data.payload) {
                    return { ...oldData, data: { message: response.data.message, payload: [...oldData.data.payload, ...response.data.payload] } }
                }

                return {
                    ...oldData, error: response.error,
                    data: { message: response.data.message, payload: oldData.data.payload }
                }
            })
        }
    })

    const { mutateAsync: deleteCategoryMutation } = useMutation({
        mutationFn: (_id: string) => {
            setProceedingCategoriesIds(prevIds => [...prevIds, _id])
            return deleteCategory({ _id })
        },
        onSuccess: (response, context) => {
            const deletionId = context
            setProceedingCategoriesIds(prevIds => prevIds.filter(id => id !== deletionId))
            queryClient.setQueryData(queryKey, (oldData: ApiResponse<Category[] | undefined>) => {
                if (response.error) {
                    return { ...oldData, error: response.error, data: { message: response.data.message, payload: oldData.data.payload } }
                }

                return {
                    ...oldData,
                    data: {
                        message: response.data.message,
                        payload: oldData.data.payload?.filter(category => category._id !== deletionId)
                    }
                }

            })
        }
    })

    const { mutateAsync: updateCategoryMutation } = useMutation({
        mutationFn: ({ _id, data }: { _id: string, data: Category }) => {
            setProceedingCategoriesIds(prevIds => [...prevIds, _id])
            return updateCategory({ _id, data })
        },
        onSuccess: (response, context) => {
            const editionId = context._id

            setProceedingCategoriesIds(prevIds => prevIds.filter(id => id !== editionId))
            queryClient.setQueryData(queryKey, (oldData: ApiResponse<Category[] | undefined>) => {
                if (response.error) {
                    return { ...oldData, error: response.error, data: { message: response.data.message, payload: oldData.data.payload } }
                }

                const oldCategories = oldData.data.payload
                if (oldCategories) {

                    const updatedCategories = [...oldCategories]
                    const index = oldCategories.findIndex(category => category._id === editionId)
                    if (index !== -1) {
                        updatedCategories[index] = response.data.payload
                    }

                    return {
                        error: response.error,
                        data: {
                            message: response.data.message,
                            payload: updatedCategories
                        }
                    }
                }

                return oldData

            })
        }
    })

    return {
        fetchingCategories: fetchingCategories,
        categories: response?.data.payload,
        error: response?.error,
        message: response?.data.message,
        proceedingCategoriesIds: proceedingCategoriesIds,
        createCategories: createCategoriesMutation,
        addingCategories,
        deleteCategory: deleteCategoryMutation,
        updateCategory: updateCategoryMutation
    }
}