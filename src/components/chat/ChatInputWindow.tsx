import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
    AiOutlineCloudUpload,
    AiOutlineSend,
    AiOutlineClose,
} from "react-icons/ai";

import { FilePreview, UserInput } from "../../globalTypes";
import FileIcon from "../FileIcon";
import { MdOutlineAttachFile } from "react-icons/md";

export default function ChatInputWindow({
    onSend,
    disabled,
}: {
    onSend: (data: UserInput) => Promise<void>;
    disabled: boolean;
}) {
    const [input, setInput] = useState("");
    const [files, setFiles] = useState<FilePreview[]>([]);
    const [sending, setSending] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map((file) => ({
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
        }));
        setFiles((prev) => [...prev, ...newFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        noClick: true,
    });

    const handleSend = async () => {
        if (input.trim()) {
            const data = {
                prompt: input,
                creationDateTime: new Date().toISOString(),
            };
            await onSend(data);
            setInput("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / 1048576).toFixed(1) + " MB";
    };

    return (
        <div className="w-full bg-primary text-textPrimary p-4">
            <div className="max-w-4xl mx-auto w-full">
                {/* File Preview Area */}
                {files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center bg-gray-100 rounded-lg p-2 pr-3 space-x-2 group hover:bg-gray-200 transition-colors border border-dashed border-gray-300"
                            >
                                <FileIcon fileType={file.type} />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium truncate max-w-[200px]">
                                        {file.name}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {formatFileSize(file.size)}
                                    </span>
                                </div>
                                <button
                                    onClick={() => removeFile(index)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-gray-500 hover:text-gray-700"
                                >
                                    <AiOutlineClose className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Input Area */}
                <div {...getRootProps()} className="relative">
                    <div className="flex items-end space-x-2 border border-transparent focus-within:border-appBlue rounded-lg p-1">
                        <label
                            htmlFor="file-upload"
                            className="hover:text-textPrimary hover:bg-appBlue px-4 h-[46px] rounded-lg cursor-pointer hover:bg-gray-200 transition-colors text-gray-700 font-medium  flex items-center space-x-2"
                        >
                            <MdOutlineAttachFile className="w-5 h-5" />
                            <input
                                {...getInputProps()}
                                id="file-upload"
                                className="hidden"
                                multiple
                            />
                        </label>
                        <textarea
                            className="flex-1 text-textSecondary p-3 rounded-lg bg-primary outline-none min-h-[46px] max-h-[200px] overflow-y-auto resize-none leading-6 no-scrollbar"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            onKeyPress={handleKeyPress}
                            rows={1}
                            disabled={sending || disabled}
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = "46px";
                                target.style.height = `${Math.min(
                                    target.scrollHeight,
                                    200
                                )}px`;
                            }}
                        />
                        <button
                            onClick={handleSend}
                            className="text-textPrimary px-4 h-[46px] rounded-lg hover:bg-appBlue transition-colors font-medium flex items-center space-x-2"
                            disabled={
                                sending ||
                                disabled ||
                                (!input.trim() && files.length === 0)
                            }
                        >
                            <AiOutlineSend className="w-5 h-5" />
                            <span>{sending ? "Sending..." : "Send"}</span>
                        </button>
                    </div>
                    {isDragActive && (
                        <div className="absolute inset-0 bg-blue-50 bg-opacity-50 rounded-lg border-2 border-appBlue border-dashed flex items-center justify-center">
                            <div className="flex items-center space-x-2 text-appBlue">
                                <AiOutlineCloudUpload className="w-6 h-6" />
                                <span className="font-medium">
                                    Drop files here
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
