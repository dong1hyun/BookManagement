"use server"

import { unstable_cache as nextCache } from "next/cache";
import db from "./db";
import { ParamsType } from "@/types/book";

async function fetchBooks(params: ParamsType) {
    try {
        const pageSize = 10;
        const skip = (params.curPageNumber - 1) * pageSize;
        const take = pageSize;
        const condition = params.filterType !== "None" ? {
            [params.filterType]: {
                contains: params.filterValue,
                mode: "insensitive"
            },
        } : {};
        const books = await db.book.findMany({
            select: {
                id: true,
                title: true,
                author: true,
            },
            where: condition,
            skip,
            take,
            orderBy: {
                createdAt: "asc"
            }
        });

        const totalCount = await db.book.count({
            where: condition,
        });

        const totalPageNumber = Math.ceil(totalCount / pageSize);

        return { books, totalPageNumber };
    } catch (error) {
        console.error(error);
        throw new Error("책 데이터를 가져오는 중 오류가 발생했습니다.");
    }
}

export async function getBooks(params: ParamsType) {
    try {
        const getCachedBooks = nextCache(fetchBooks, [`page-${params.curPageNumber}`], {
            tags: [`page-${params.curPageNumber}`],
            revalidate: 20
        });

        const { books, totalPageNumber } = await getCachedBooks(params);

        return { books, totalPageNumber };
    } catch (error) {
        console.error(error);
        throw error;
    }
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