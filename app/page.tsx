import BookList from "@/components/BookList";
import { getCachedBooks } from "@/lib/book";

export default async function Home() {
  const books = await getCachedBooks();
  return (
   <div>
      <BookList books={books} />
   </div>
  );
}
