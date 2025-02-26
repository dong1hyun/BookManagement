export default function ErrorMessage({message}: {message: string | null}) {
    return (
        <div>
            {message}
        </div>
    )
}