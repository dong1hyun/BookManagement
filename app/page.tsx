"use client"
import BooksContainer from "@/components/booksContainer";
import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";

export default function Home() {

  return (
    <div className="relative max-w-[800px] h-[500px] p-5">
      <BooksContainer />
      <Link href="/addBook"><CiCirclePlus size={48} className="fixed right-5 bottom-5 cursor-pointer" /></Link>
    </div>
  );
}