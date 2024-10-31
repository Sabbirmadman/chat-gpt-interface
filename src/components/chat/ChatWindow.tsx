import { useEffect, useRef } from "react";
import { Conversation } from "../../globalTypes";

export default function ChatWindow({
    conversations,
    pendingResponse,
}: {
    conversations: Conversation[];
    pendingResponse?: string | null;
}) {
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [conversations, pendingResponse]);

    return (
        <div className="max-w-4xl mx-auto w-full pt-12 space-y-4">
            {conversations.map((conv, index) => (
                <div
                    key={index}
                    className={`p-4 rounded-lg ${"bg-secondary text-textPrimary text-left"}`}
                >
                    <p>{conv.text}</p>
                </div>
            ))}

            {/* Pending bot response message */}
            {pendingResponse && (
                <div className="p-4 bg-secondary text-textPrimary rounded-lg text-left animate-pulse">
                    <p>{pendingResponse}</p>
                </div>
            )}

            <div ref={chatEndRef} />
        </div>
    );
}
