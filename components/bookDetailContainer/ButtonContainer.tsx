import Button from "../common/Button";

export default function ButtonContainer() {
    return (
        <div className="flex gap-10">
            <Button style="bg-blue-500" onClick={() => {}}>수정</Button>
            <Button style="bg-red-500" onClick={() => {}}>삭제</Button>
        </div>
    )
}