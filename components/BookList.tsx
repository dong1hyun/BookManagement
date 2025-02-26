"use client"

import { addBook } from "@/lib/book";
import { BookType } from "@/types/book";
import Loading from "./Loading";

export default function BookList({ books, isLoading }: { books: BookType[] | [], isLoading: boolean }) {
    if(isLoading) return <Loading />
    return (
        <div>
            {books.map((book) => {
                return (
                    <div key={book.id}>
                        <div className="flex">
                            <div>{book.title}</div>
                            <div>{book.author}</div>
                        </div>
                    </div>
                )
            })}
            <button onClick={addBook}>추가</button>
        </div>
    );
};