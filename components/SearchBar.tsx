import { FilterType } from "@/types/book";
import { useRef, useState } from "react";

interface Props {
    filterHandler: (filterType: FilterType, filterValue: string) => void
}

export default function SearchBar({ filterHandler }: Props) {
    const [filterType, setFilterType] = useState<FilterType>("None");
    const [filterValue, setFilterValue] = useState("");
    const selectorRef = useRef<HTMLSelectElement>(null);
    const onValid = (e: React.FormEvent) => {
        e.preventDefault();
        if(filterType === "None") {
            if(filterValue === "") {
                filterHandler("None", "");
            }
            else {
                alert("필터 타입을 선택해주세요.");
                selectorRef?.current?.focus();
                return;
            }
        }
        if(filterValue.length > 50) {
            alert("최대 50자까지만 검색 가능해요!");
            return;
        }
        filterHandler(filterType, filterValue);
    }
    return (
        <div>
            <form onSubmit={onValid}>
                <select
                    ref={selectorRef}
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as FilterType)}
                >
                    <option value="None">전체</option>
                    <option value="title">제목</option>
                    <option value="author">저자</option>
                </select>
                <input
                    onChange={(e) => setFilterValue(e.target.value)}
                    placeholder="내용을 입력해주세요."
                    className="border-solid border-black border-2"
                />
                <button>검색</button>
            </form>
        </div>
    )
}