import generatePageButtons from "@/util/pagenation"
import { useEffect, useMemo } from "react"

interface Props {
    pageNumberHandler: (v: number) => void
    totalPageNumber: number
    curPageNumber: number
}

export default function PagenationButtons({ pageNumberHandler, totalPageNumber, curPageNumber }: Props) {
    const pageButtonList = useMemo(() => {
        return generatePageButtons(curPageNumber, totalPageNumber);
    }, [totalPageNumber, curPageNumber]);

    if(totalPageNumber === 0) return null;
    return (
        <div className="flex gap-5">
            {pageButtonList.map((number) => (
                <button
                    key={number}
                    onClick={() => pageNumberHandler(number)}
                >{number}</button>
            ))}
        </div>
    )
}