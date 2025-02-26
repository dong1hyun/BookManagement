"use client"

import BookList from "@/components/BookList";
import { getBooks } from "@/lib/book";
import { BookType, ParamsType } from "@/types/book";
import { useEffect, useState } from "react";

export default function Home() {
  const [params, setParams] = useState<ParamsType>({
    filterType: "None",
    filterValue: "",
    pageNumber: 1,
  });
  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      const books = await getBooks(params);
      setBooks(books);
    };

    fetchBooks();
  }, []);

  return (
   <div>
      <BookList books={books} />
   </div>
  );
}
