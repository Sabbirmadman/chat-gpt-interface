import { CiBookmark, CiSquareChevLeft, CiStar } from "react-icons/ci";

export default function ChatHeader({
    setState,
    title,
}: {
    setState: (state: { isPaneOpen: boolean }) => void;
    title?: string;
}) {
    return (
        <div className="p-4 flex justify-between items-center  w-full bg-primary text-textPrimary ">
            <span className="flex items-center gap-2">
                <button onClick={() => setState({ isPaneOpen: true })}>
                    <CiSquareChevLeft className="text-2xl cursor-pointer" />
                </button>
                <h1 className="text-xl font-bold">{title ?? "Chat title"}</h1>
            </span>
            <span className="flex items-center gap-2">
                <CiBookmark className="text-2xl cursor-pointer" />
                <CiStar className="text-2xl cursor-pointer" />
            </span>
        </div>
    );
}
