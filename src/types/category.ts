export enum CategoryType {
    FACULTY = "faculty",
    SPECIALTY = "specialty",
    DEGREE = "degree",
    YEAR = "course",
    GROUP = "group"
}

export type Category = {
    id: string
    name: string,
    type: CategoryType,
    path: string
}