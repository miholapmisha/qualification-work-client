export enum CategoryType {
    FACULTY = "faculty",
    SPECIALTY = "specialty",
    DEGREE = "degree",
    YEAR = "year",
    GROUP = "group"
}

export type Category = {
    _id: string
    name: string,
    categoryType: CategoryType,
    path: string
}

export type TreeCategory = Category & {
    children: TreeCategory[]
}