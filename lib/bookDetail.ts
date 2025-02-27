"use server"

import db from "./db";
import { unstable_cache as nextCache } from "next/cache";

async function fetchBook(id: number) {
    try {
        const book = await db.book.findUnique({
            where: {
                id: id
            }
        });

        return book;
    } catch (error) {
        console.error(error);
        throw new Error("책 데이터를 가져오는 중 오류가 발생했습니다.");
    }
}


export async function getBook(id: number) {
    try {
        const getCachedBook = nextCache(fetchBook, [`${id}`], {
            tags: [`${id}`],
            revalidate: 20
        });

        const book = await getCachedBook(id);

        return book;
    } catch (error) {
        console.error(error);
        throw error;
    }
}