import { Category, TreeCategory, CategoryType } from "../types/category";

export const buildCategoryTree = (categories: Category[], pathSeparator: string = '.'): TreeCategory[] => {

    const categoryMap: Record<string, TreeCategory> = {};

    categories.forEach(category => {
        categoryMap[category._id] = {
            ...category,
            children: []
        };
    });

    const rootCategories: TreeCategory[] = [];

    categories.forEach(category => {
        const treeCategory = categoryMap[category._id];

        if (!category.path || category.path === '') {
            rootCategories.push(treeCategory);
        } else {
            const pathParts = category.path.split(pathSeparator);
            const parentId = pathParts[pathParts.length - 1];

            if (parentId && categoryMap[parentId]) {
                categoryMap[parentId].children.push(treeCategory);
            } else {
                rootCategories.push(treeCategory);
            }
        }
    });


    const sortCategories = (categories: TreeCategory[]): TreeCategory[] => {
        const typeOrder = {
            [CategoryType.FACULTY]: 1,
            [CategoryType.SPECIALTY]: 2,
            [CategoryType.DEGREE]: 3,
            [CategoryType.YEAR]: 4,
            [CategoryType.GROUP]: 5
        };

        return categories.sort((a, b) => {
            const typeComparison = (typeOrder[a.categoryType] || 99) - (typeOrder[b.categoryType] || 99);
            if (typeComparison !== 0) return typeComparison;

            return a.name.localeCompare(b.name);
        }).map(category => ({
            ...category,
            children: sortCategories(category.children)
        }));
    };

    return sortCategories(rootCategories);
}