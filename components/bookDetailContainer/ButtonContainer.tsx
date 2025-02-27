import { useState } from "react";
import Button from "../common/Button";
import { deleteBook } from "@/lib/deleteBook";
import { useParams, useRouter } from "next/navigation";
import Loading from "../common/Loading";
import ErrorMessage from "../common/Error";

export default function ButtonContainer() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams();
    const bookId = id as string;
    const router = useRouter();
    const onDelete = async () => {
        try {
            setIsLoading(true);
            await deleteBook(+bookId);
            router.push("/");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
        finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="flex flex-col items-center gap-3">
            <ErrorMessage message={error} />
            <div className="flex gap-10">
                <Button style="bg-blue-500" onClick={() => { router.push(`/book/${id}/edit`) }}>수정</Button>
                {isLoading ? <Loading /> : <Button style="bg-red-500" onClick={onDelete}>삭제</Button>}
            </div>

        </div>
    )
}