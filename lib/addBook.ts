"use server"

import { BookFormType } from "@/types/book"
import db from "./db"
import { revalidateTag } from "next/cache";

export async function addBook(bookData: BookFormType) {
    try {
        await db.book.create({
            data: {
                title: bookData.title,
                author: bookData.author,
                publisher: bookData.publisher,
                availableCopies: +bookData.availableCopies,
                salesVolume: +bookData.salesVolume,
            }
        });
        revalidateTag("book");
    } catch (error) {
        console.error(error);
        throw new Error("새로운 책을 추가하는데 실패했습니다.");
    }
}