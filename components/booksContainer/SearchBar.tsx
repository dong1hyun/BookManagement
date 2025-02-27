import { FilterType } from "@/types/book";
import { useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

interface Props {
    filterHandler: (filterType: FilterType, filterValue: string) => void
}

export default function SearchBar({ filterHandler }: Props) {
    const [filterType, setFilterType] = useState<FilterType>("None");
    const [filterValue, setFilterValue] = useState("");
    const selectorRef = useRef<HTMLSelectElement>(null);
    const onValid = (e: React.FormEvent) => {
        e.preventDefault();
        if (filterType === "None") {
            if (filterValue === "") {
                filterHandler("None", "");
            }
            else {
                alert("필터 타입을 선택해주세요.");
                selectorRef?.current?.focus();
                return;
            }
        }
        if (filterValue.length > 50) {
            alert("최대 50자까지만 검색 가능해요!");
            return;
        }
        filterHandler(filterType, filterValue);
    }
    return (
        <form className="flex justify-end gap-3 mb-10" onSubmit={onValid}>
            <select
                className="border-solid border-neutral-400 border-2 px-3 py-1 rounded-xl"
                ref={selectorRef}
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as FilterType)}
            >
                <option value="None">전체</option>
                <option value="title">제목</option>
                <option value="author">저자</option>
            </select>
            <div className="relative">
                <input
                    className="w-full border-solid border-neutral-400 border-2 py-2 pl-3 pr-10 bg-white rounded-xl"
                    onChange={(e) => setFilterValue(e.target.value)}
                    placeholder="검색어 입력해주세요."
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2"><IoSearchOutline /></button>
            </div>

        </form>
    )
}