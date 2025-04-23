import { useEffect, useState } from "react"
import { MetaData } from "../types/pagination"

type usePaginationProps = {
    paginationData?: MetaData,
    initialPage?: number
}

export const usePagination = ({ paginationData, initialPage }: usePaginationProps) => {

    const [totalPages, setTotalPages] = useState(0)
    const [selectedPage, setSelectedPage] = useState(initialPage)

    useEffect(() => {
        if (paginationData?.pageCount) {
            setTotalPages(paginationData?.pageCount);
        }
    }, [paginationData])

    const handleSelectedPage = (page: number) => {
        setSelectedPage(page)
    }

    return {
        totalPages,
        selectedPage,
        handleSelectedPage
    }
}