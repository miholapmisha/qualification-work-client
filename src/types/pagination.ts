export type MetaData = {
    page: number,
    itemCount: number,
    pageCount: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
    take: number
}

export type PaginationObject<T> = {
    data: T[],
    metaData: MetaData
} 