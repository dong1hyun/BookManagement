import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
    return (
        <div className="flex justify-center items-center">
            <AiOutlineLoading3Quarters className="animate-spin text-3xl text-blue-400" />
        </div>
    )
}