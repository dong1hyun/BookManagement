import { ReactNode } from "react"

interface Props {
    children: ReactNode
    style?: string
    onClick: () => void
}

export default function Button({ children, onClick, style }: Props) {
    return (
        <button
            onClick={onClick}
            className={`py-1 px-3 rounded-xl text-white ${style}`}
        >
            {children}
        </button>
    )
}