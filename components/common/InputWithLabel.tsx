import { UseFormRegisterReturn } from "react-hook-form"

interface Props {
    label: string
    placeholder: string
    type: string
    register: UseFormRegisterReturn;
}

export default function InputWithLabel({ label, placeholder, type, register }: Props) {
    return (
        <div className="flex gap-3 items-center">
            <label className="flex-1" htmlFor={label}>{label}</label>
            <input
                className="border-solid border-2 border-neutral-200 p-2 rounded-xl"
                id={label}
                placeholder={placeholder}
                type={type}
                {...register}
            />
        </div>
    )
}