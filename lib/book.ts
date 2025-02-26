"use server"

import { unstable_cache as nextCache } from "next/cache";
import db from "./db";
import { ParamsType } from "@/types/book";

async function fetchBooks(params: ParamsType) {
    const pageSize = 10;
    const skip = (params.pageNumber - 1) * pageSize;
    const take = pageSize;
    const books = await db.book.findMany({
        select: {
            id: true,
            title: true,
            author: true,
        },
        where: params.filterType !== "None" ? {
            [params.filterType]: {
                contains: params.filterValue,
                mode: "insensitive"
            },
        } : {},
        skip,
        take,
        orderBy: {
            createdAt: "asc"
        }
    });

    return books;
}

export async function getBooks(params: ParamsType) {
    const getCachedBooks = nextCache(() => fetchBooks(params), ["books"], {
        tags: ["books"],
        revalidate: 1
    });

    const books = await getCachedBooks();

    return books;
}


export const addBook = async () => {
  await db.book.create({
    data: {
      title: "test",
      author: "lim",
      summary: "good",
    }
  })
}