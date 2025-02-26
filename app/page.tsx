"use client"

import BookList from "@/components/BookList";
import ErrorMessage from "@/components/Error";
import PagenationButtons from "@/components/PagenationButtons";
import SearchBar from "@/components/SearchBar";
import { getBooks } from "@/lib/book";
import { BookType, ParamsType } from "@/types/book";
import { useEffect, useState } from "react";

export default function Home() {
  const [params, setParams] = useState<ParamsType>({
    filterType: "None",
    filterValue: "",
    curPageNumber: 1,
    totalPageNumber: 0
  });
  const [books, setBooks] = useState<BookType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchBooks() {
      try {
        setIsLoading(true);
        const { books, totalPageNumber } = await getBooks(params);
        setIsLoading(false);
        setBooks(books);
        setParams((prev) => ({ ...prev, totalPageNumber }));
      } catch (error) {
        if(error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [params.curPageNumber, params.filterType, params.filterValue]);

  return (
    <div className="relative max-w-[800px] h-[500px] mt-[100px] p-5">
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
        totalPageNumber={params.totalPageNumber}
        curPageNumber={params.curPageNumber}
      />
    </div>
  );
}