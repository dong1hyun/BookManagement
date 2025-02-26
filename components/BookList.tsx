"use client"

import { addBook } from "@/lib/book";
import { BookType } from "@/types/book";
import Loading from "./Loading";

export default function BookList({ books, isLoading }: { books: BookType[] | [], isLoading: boolean }) {
    if (isLoading) return <Loading />
    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 py-10 px-5 max-h-[400px] overflow-y-auto">
            {books.map((book) => {
                return (
                    <div
                        className="flex flex-col justify-center items-center shadow-xl bg-white p-2 rounded-xl w-[100px]"
                        key={book.id}
                    >
                        <div className="border-b">{book.title}</div>
                        <div>{book.author}</div>
                    </div>
                )
            })}
        </div>
    );
};