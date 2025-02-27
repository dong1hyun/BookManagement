"use server"

import { BookFormType } from "@/types/book";
import db from "./db";
import { revalidateTag } from "next/cache";

export async function editBook(id: number, bookData: BookFormType) {
    try {
        await db.book.update({
            where: {
                id
            },
            data: {
                title: bookData.title,
                author: bookData.author,
                publisher: bookData.publisher,
                availableCopies: +bookData.availableCopies,
                salesVolume: +bookData.salesVolume,
            }
        });
        revalidateTag(id.toString());
        revalidateTag("book");
    } catch (error) {
        console.error(error);
        throw new Error("책 정보를 수정하는데 실패했습니다.");
    }
}