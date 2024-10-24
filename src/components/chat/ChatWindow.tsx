import { useEffect, useRef } from "react";
import { Conversation } from "../../globalTypes";
import { CiUser } from "react-icons/ci";
import { BsSoundwave } from "react-icons/bs";
import FileIcon from "../../components/FileIcon"; // Adjust the path as necessary
import { IoCloseOutline } from "react-icons/io5";

export default function ChatWindow({
    conversations,
}: {
    conversations: Conversation[];
}) {
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [conversations]);

    return (
        <div className="max-w-4xl mx-auto w-full pt-12">
            {conversations.map((conv, index) => (
                <div key={index} className="mb-12 gap-4 flex flex-col">
                    <div className="flex items-start space-x-3 mb-1 self-start">
                        <div className="flex-shrink-0">
                            <CiUser className="w-8 h-8 text-white bg-blue-500 p-1.5 rounded-full" />
                        </div>

                        <div className="bg-primary p-3 rounded-lg text-gray-800 font-medium">
                            {conv.user.files.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-3 mb-1 self-start border-dashed border-2 border-gray rounded-lg p-2 hover:border-textSecondary relative group"
                                >
                                    <IoCloseOutline className="absolute top-0 right-0 text-red-500 hidden group-hover:block cursor-pointer " />
                                    <div className="flex-shrink-0">
                                        <FileIcon fileType={file.type} />
                                    </div>
                                    <div className="bg-primary p-3 rounded-lg text-sm">
                                        {file.name}
                                    </div>
                                </div>
                            ))}
                            {conv.user.prompt}
                            <p className="text-xs text-gray-500">
                                {new Date(
                                    conv.user.creationDateTime
                                ).toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 mb-1 self-end">
                        <div className="bg-primary shadow-md p-3 rounded-lg font-medium">
                            {conv.bot}
                        </div>
                        <div className="flex-shrink-0">
                            <BsSoundwave className="w-8 h-8 text-white bg-blue-500 p-1.5 rounded-full" />
                        </div>
                    </div>
                </div>
            ))}
            <div ref={chatEndRef} />
        </div>
    );
}
