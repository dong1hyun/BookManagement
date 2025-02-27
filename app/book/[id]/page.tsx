"use client"

import BookDetail from "@/components/bookDetailContainer";
import ButtonContainer from "@/components/bookDetailContainer/ButtonContainer";

export default function Page() {
    return (
        <div className="flex flex-col items-center gap-20">
            <BookDetail />
            <ButtonContainer />
        </div>
    )
}