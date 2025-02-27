export default function ErrorMessage({message}: {message: string | null | undefined}) {
    if(!message) return null;
    return (
        <div className="text-red-500">
            {message}
        </div>
    )
}