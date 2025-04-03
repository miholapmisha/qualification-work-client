import { useCallback, useMemo } from "react"
import Button from "./Button"
import { useSearchParams } from "react-router-dom"

type PaginationProps = {
    totalPages: number,
    selectedPage: number,
    setSelectedPage: (page: number) => void
}

const Pagination = ({ totalPages, selectedPage, setSelectedPage }: PaginationProps) => {

    const [, setSearchParams] = useSearchParams()

    const getPaginationArray = useCallback((currentPage: number) => {
        const edgeRange = 5;
        const middleRange = 3;

        if (totalPages <= edgeRange) {
            return Array.from({ length: totalPages }, (_, i) => `${i + 1}`);
        }

        const paginationArray: string[] = ['1'];

        if (currentPage < edgeRange) {
            for (let i = 2; i <= edgeRange; i++) {
                paginationArray.push(`${i}`);
            }
            paginationArray.push('...');
            paginationArray.push(`${totalPages}`);
            return paginationArray;
        }

        if (currentPage > totalPages - edgeRange + 1) {
            paginationArray.push('...');
            for (let i = totalPages - edgeRange + 1; i < totalPages; i++) {
                paginationArray.push(`${i}`);
            }
            paginationArray.push(`${totalPages}`);
            return paginationArray;
        }

        paginationArray.push('...');

        const startMiddle = currentPage - Math.floor(middleRange / 2);
        for (let i = 0; i < middleRange; i++) {
            paginationArray.push(`${startMiddle + i}`);
        }

        paginationArray.push('...');
        paginationArray.push(`${totalPages}`);

        return paginationArray;
    }, [totalPages, selectedPage])

    const renderPaginationArray = useMemo(() => {
        return getPaginationArray(selectedPage).map((item, index) => {
            if (+item) {
                if (selectedPage === +item) {
                    return <Button key={index}>{item}</Button>
                }
                return <button key={index} className={"hover:bg-primary-200 cursor-pointer rounded border-1 px-4 py-2"} onClick={() => {
                    setSelectedPage(+item)
                    setSearchParams({ 'page': `${+item}` })
                }}>{item}</button>
            } else {
                return <span className="text-xl tracking-widest">...</span>
            }
        })
    }, [selectedPage, totalPages])

    const handlePreviousButtonClick = () => {
        if (selectedPage - 1 > 0) {
            setSelectedPage(selectedPage - 1)
            setSearchParams({ 'page': `${+selectedPage - 1}` })
        }
    }

    const handleNextButtonClick = () => {
        if (selectedPage + 1 <= totalPages) {
            setSelectedPage(selectedPage + 1)
            setSearchParams({ 'page': `${+selectedPage + 1}` })
        }
    }

    if (totalPages <= 1) {
        return null
    }

    return (
        <div className="flex space-x-6 max-w-[456px]">
            <button className={"hover:bg-primary-200 cursor-pointer rounded border-1 px-4 py-2"} onClick={handlePreviousButtonClick}>{'<'}</button>
            {renderPaginationArray}
            <button className={"hover:bg-primary-200 cursor-pointer rounded border-1 px-4 py-2"} onClick={handleNextButtonClick}>{'>'}</button>
        </div>
    )
}

export default Pagination