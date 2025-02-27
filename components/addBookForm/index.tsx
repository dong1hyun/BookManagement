"use client"

import ErrorMessage from "@/components/common/Error";
import InputWithLabel from "@/components/common/InputWithLabel";
import { BookFormType } from "@/types/book";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "../common/Loading";
import { useRouter } from "next/navigation";
import { addBook } from "@/lib/addBook";

export default function AddBookForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<BookFormType>();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const onValid = async (bookData: BookFormType) => {
        try {
            setIsLoading(true);
            const response = await addBook(bookData);
            router.push("/");
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
                    <button className="w-full bg-cyan-200 p-2 rounded-xl">추가</button>}
        </form>
    )
};