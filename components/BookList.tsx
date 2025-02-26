import { BookType } from "@/types/book";

export default async function BookList({books}: {books: BookType[]}) {
    return (
        <div>
            {books.map((book) => {
                return (
                    <div key={book.id}>
                        <div className="flex flex-row">
                            <div>{book.title}</div>
                            <div>{book.author}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};