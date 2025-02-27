import generatePageButtons from "@/util/pagenation"
import { useMemo } from "react"

interface Props {
    pageNumberHandler: (v: number) => void
    totalPageNumber: number
    curPageNumber: number
}

export default function PagenationButtons({ pageNumberHandler, totalPageNumber, curPageNumber }: Props) {
    const pageButtonList = useMemo(() => {
        return generatePageButtons(curPageNumber, totalPageNumber);
    }, [totalPageNumber, curPageNumber]);

    if (totalPageNumber === 0) return null;
    return (
        <div className="absolute flex gap-5 bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {pageButtonList.map((number) => (
                <button
                    key={number}
                    onClick={() => pageNumberHandler(number)}
                >{number}
                </button>
            ))}
        </div>
    )
}