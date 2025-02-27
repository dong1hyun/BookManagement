"use server"

import { revalidateTag } from "next/cache";
import db from "./db";

export async function deleteBook(id: number) {
    try {
        await db.book.delete({
            where: {
                id
            }
        });
        revalidateTag(id.toString());
        revalidateTag("book");
    } catch (error) {
        console.error(error);
        throw new Error("책을 삭제하는데 문제가 발생했습니다.");
    }
}