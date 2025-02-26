export interface BookType {
    id: number
    title: string
    author: string
}

type FilterType = "title" | "author" | "None";

export interface ParamsType {
    filterType: FilterType
    filterValue: string
    curPageNumber: number
    totalPageNumber: number
}