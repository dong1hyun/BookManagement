import AddBookForm from "@/components/addBookForm";

export default function Page() {
    return (
        <div className="flex flex-col gap-5">
            <h1>수정할 책의 정보를 입력해주세요.</h1>
            <AddBookForm />
        </div>
    )
}