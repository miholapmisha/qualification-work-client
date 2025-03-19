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
            const parentId = getParentId(category, pathSeparator)

            if (parentId && categoryMap[parentId]) {
                categoryMap[parentId].children.push(treeCategory);
            } else {
                rootCategories.push(treeCategory);
            }
        }
    });

    return rootCategories;
}

export const getParentId = (category: Category, pathSeparator: string) => {
    const pathParts = category.path.split(pathSeparator);
    return pathParts[pathParts.length - 1];
}

export const isDescendant = (category: Category, parentId: string, defaultPathSeparator: string): boolean => {
    const pathParts = category.path.split(defaultPathSeparator)
    return pathParts.includes(parentId)
}

export const sortCategories = (categories: TreeCategory[]): TreeCategory[] => {
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