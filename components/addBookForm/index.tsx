"use client"

import ErrorMessage from "@/components/common/Error";
import InputWithLabel from "@/components/common/InputWithLabel";
import { BookFormType } from "@/types/book";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "../common/Loading";
import { useParams, useRouter } from "next/navigation";
import { addBook } from "@/lib/addBook";
import { getBook } from "@/lib/bookDetail";
import { editBook } from "@/lib/editBook";

export default function AddBookForm() {
    const { id } = useParams();
    const [book, setBook] = useState<BookFormType | null>();
    const [error, setError] = useState<string | null>(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<BookFormType>();
    if (id) {
        useEffect(() => {
            async function fetchBook() {
                try {
                    if (id) {
                        setIsLoading(true);
                        const book = await getBook(+id);
                        console.log(book)
                        setBook(book);
                        reset({
                            title: book?.title,
                            author: book?.author,
                            publisher: book?.publisher,
                            salesVolume: book?.salesVolume,
                            availableCopies: book?.availableCopies
                        });
                        setIsLoading(false);
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
    }
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const onValid = async (bookData: BookFormType) => {
        try {
            setIsLoading(true);
            if(id) {
                await editBook(+id, bookData);
                router.push(`/book/${id}`);
            } else {
                await addBook(bookData);
                router.push("/");
            }
        } catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }
    return (
        <form
            onSubmit={handleSubmit(onValid)}
            className="flex flex-col gap-5"
        >
            <div>
                <InputWithLabel
                    label="책 제목"
                    placeholder="제목을 입력해주세요."
                    type="string"
                    register={register("title", {
                        required: "제목을 입력해주세요.",
                        maxLength: { value: 20, message: "최대 20자까지만 입력할 수 있습니다." }
                    })}
                />
                <ErrorMessage message={errors?.title?.message} />
            </div>
            <div>
                <InputWithLabel
                    label="저자"
                    placeholder="저자를 입력해주세요."
                    type="string"
                    register={register("author", {
                        required: "저자를 입력해주세요.",
                        maxLength: { value: 20, message: "최대 15자까지만 입력할 수 있습니다." }
                    })}
                />
                <ErrorMessage message={errors?.author?.message} />
            </div>
            <div>
                <InputWithLabel
                    label="출판사"
                    placeholder="출판사를 입력해주세요."
                    type="string"
                    register={register("publisher", {
                        required: "출판사를 입력해주세요.",
                        maxLength: { value: 20, message: "최대 15자까지만 입력할 수 있습니다." }
                    })}
                />
                <ErrorMessage message={errors?.publisher?.message} />
            </div>
            <div>
                <InputWithLabel
                    label="판매량"
                    placeholder="판매량 입력해주세요."
                    type="number"
                    register={register("salesVolume", {
                        required: "판매량을 입력해주세요.",
                        max: { value: 1000000, message: "최대 1,000,000까지만 입력할 수 있습니다." },
                        min: { value: 0, message: "판매량은 0보다 작을 수 없습니다." }
                    })}
                />
                <ErrorMessage message={errors?.salesVolume?.message} />
            </div>
            <div>
                <InputWithLabel
                    label="재고량"
                    placeholder="재고량을 입력해주세요."
                    type="number"
                    register={register("availableCopies", {
                        required: "재고량을 입력해주세요.",
                        max: { value: 1000000, message: "최대 1,000,000까지만 입력할 수 있습니다." },
                        min: { value: 0, message: "재고량은 0보다 작을 수 없습니다." }
                    })}
                />
                <ErrorMessage message={errors?.availableCopies?.message} />
            </div>
            {
                isLoading ?
                    <Loading /> :
                    <button className="w-full bg-cyan-200 p-2 rounded-xl">{id ? "수정" : "추가"}</button>}
        </form>
    )
};