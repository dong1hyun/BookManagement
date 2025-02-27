"use client"

import BookList from "@/components/booksContainer/BookList";
import ErrorMessage from "@/components/common/Error";
import PagenationButtons from "@/components/booksContainer/PagenationButtons";
import SearchBar from "@/components/booksContainer/SearchBar";
import { getBooks } from "@/lib/bookList";
import { BookBasicType, ParamsType } from "@/types/book";
import { useCallback, useEffect, useState } from "react";

export default function BooksContainer() {
    const [params, setParams] = useState<ParamsType>({
        filterType: "None",
        filterValue: "",
        curPageNumber: 1,
    });
    const [totalPageNumber, setTotalPageNumber] = useState(0);
    const [books, setBooks] = useState<BookBasicType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBooks = useCallback(async () => {
        try {
            setIsLoading(true);
            const { books, totalPageNumber } = await getBooks(params);
            setBooks(books);
            setTotalPageNumber(totalPageNumber);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }, [params]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);
    return (
        <>
            <SearchBar
                filterHandler={(filterType, filterValue) => {
                    setParams((prev) => ({ ...prev, filterType, filterValue }))
                }}
            />
            <ErrorMessage message={error} />
            <BookList books={books} isLoading={isLoading} />
            <PagenationButtons
                pageNumberHandler={(v) =>
                    setParams((prev) => ({ ...prev, curPageNumber: v }))
                }
                totalPageNumber={totalPageNumber}
                curPageNumber={params.curPageNumber}
            />
        </>
    )
}