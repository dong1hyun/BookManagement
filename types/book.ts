export interface BookBasicType {
    id: number
    title: string
    author: string
}

export interface BookFormType {
    title: string
    author: string
    publisher: string
    salesVolume: number
    availableCopies: number
}

export type FilterType = "title" | "author" | "None";

export interface ParamsType {
    filterType: FilterType
    filterValue: string
    curPageNumber: number
}