"use client"

import { BookBasicType } from "@/types/book";
import Loading from "../common/Loading";
import Link from "next/link";

export default function BookList({ books, isLoading }: { books: BookBasicType[] | [], isLoading: boolean }) {
    if (isLoading) return <Loading />
    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 py-10 px-5 max-h-[400px] overflow-y-auto">
            {books.map((book) => {
                return (
                    <Link
                        href={`book/${book.id}`}
                        className="flex flex-col justify-center items-center shadow-xl bg-white p-2 rounded-xl w-[100px] hover:scale-110"
                        key={book.id}
                    >
                        <div className="border-b">{book.title}</div>
                        <div>{book.author}</div>
                    </Link>
                )
            })}
        </div>
    );
};