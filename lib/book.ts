import { unstable_cache as nextCache } from "next/cache";
import db from "./db";

async function getBooks() {
    const books = await db.book.findMany({
        select: {
            id: true,
            title: true,
            author: true,
        },
        orderBy: {
            createdAt: "asc"
        }
    });

    return books;
}

export const getCachedBooks = nextCache(getBooks, ["books"], {
    tags: ["books"],
    revalidate: 5
});