export default function BookInfoItem({ label, value }: { label: string; value: string | number | undefined }) {
    return (
        <div className="flex gap-2">
            <span className="font-semibold">{label}:</span>
            <span>{value || "정보 없음"}</span>
        </div>
    );
}
