export interface BookType {
    id: number
    title: string
    author: string
}

export type FilterType = "title" | "author" | "None";

export interface ParamsType {
    filterType: FilterType
    filterValue: string
    curPageNumber: number
    totalPageNumber: number
}