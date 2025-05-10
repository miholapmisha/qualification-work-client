import { Category } from "../../types/category";
import { api } from "./api";
import { ApiResponse, handleError, handleSuccess } from "./common";

export const createCategories = async (categories: Category[]): Promise<ApiResponse<Category[]>> => {
    try {
        await new Promise((resolve) => { setTimeout(resolve, 4000) });
        const response = await api.post("/category", categories);
        return handleSuccess(response.data, 'Category created successfully');
    } catch (err) {
        const defaultMessage = "Unable to create category due to some internal reasons, please try again later"; 11
        return handleError(err, defaultMessage);
    }
}

export const fetchCategories = async (params: any): Promise<ApiResponse<Category[]>> => {
    try {
        await new Promise((resolve) => { setTimeout(resolve, 2000) });
        const response = await api.get("/category", { params });
        return handleSuccess(response.data, 'Categories fetched successfully');
    } catch (err) {
        const defaultMessage = "Unable to fetch categories due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
}

export const getGroupCategoriesTree = async (): Promise<ApiResponse<Category[]>> => {
    try {
        await new Promise((resolve) => { setTimeout(resolve, 2000) });
        const response = await api.get("/category/group-tree");
        return handleSuccess(response.data, 'Groups category trees fetched successfully');
    } catch (err) {
        const defaultMessage = "Unable to fetch Groups category trees due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
}

export const deleteCategory = async (params: any): Promise<ApiResponse<any>> => {
    try {
        await new Promise((resolve) => { setTimeout(resolve, 2000) });
        const response = await api.delete("/category", { params } as any);
        return handleSuccess(response.data, 'Category deleted successfully');
    } catch (err) {
        const defaultMessage = "Unable to delete category due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
}

export const updateCategory = async ({ _id, data }: { _id: string, data: Category }) => {
    try {
        await new Promise((resolve) => { setTimeout(resolve, 2000) });
        const response = await api.put(`/category/${_id}`, { ...data });
        return handleSuccess(response.data, 'Category updated successfully');
    } catch (err) {
        const defaultMessage = "Unable to update category due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
}