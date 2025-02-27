"use client"

import { getBook } from "@/lib/bookDetail";
import { BookFormType } from "@/types/book";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import Loading from "../common/Loading";
import BookInfoItem from "../common/BookInfoItem";
import ErrorMessage from "../common/Error";

export default function BookDetail() {
    const { id } = useParams();
    const bookId = id as string;
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [book, setBook] = useState<BookFormType | null>();

    useEffect(() => {
        async function fetchBook() {
            try {
                if (id) {
                    setIsLoading(true);
                    const book = await getBook(+id);
                    setBook(book);
                }
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchBook();
    }, [id]);
    return (
        <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">책 정보</h2>
            <ErrorMessage message={error} />
            {
                isLoading ?
                    <Loading /> :
                    <div className="flex flex-col md:grid md:grid-cols-2 gap-10 text-gray-700">
                        <BookInfoItem label="고유번호" value={bookId} />
                        <BookInfoItem label="출판사" value={book?.publisher} />
                        <BookInfoItem label="제목" value={book?.title} />
                        <BookInfoItem label="판매량" value={book?.salesVolume} />
                        <BookInfoItem label="저자" value={book?.author} />
                        <BookInfoItem label="재고량" value={book?.availableCopies} />
                    </div>
            }
        </div>
    )
}