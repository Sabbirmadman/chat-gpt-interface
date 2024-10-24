import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
    AiOutlineCloudUpload,
    AiOutlineSend,
    AiOutlineClose,
} from "react-icons/ai";

import { FilePreview } from "../../globalTypes";
import FileIcon from "../FileIcon";

export default function ChatInputWindow({
    onSend,
}: {
    onSend: (data: {
        files: FilePreview[];
        prompt: string;
        creationDateTime: string;
    }) => void;
}) {
    const [input, setInput] = useState("");
    const [files, setFiles] = useState<FilePreview[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map((file) => ({
            name: file.name,
            size: file.size,
            type: file.type,
        }));
        setFiles((prev) => [...prev, ...newFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        noClick: true,
    });

    const handleSend = () => {
        if (input || files.length > 0) {
            const data = {
                files,
                prompt: input,
                creationDateTime: new Date().toISOString(),
            };
            onSend(data);
            setInput("");
            setFiles([]);
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

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="w-full bg-white p-4">
            <div className="max-w-4xl mx-auto w-full">
                {/* File Preview Area */}
                {files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center bg-gray-100 rounded-lg p-2 pr-3 space-x-2 group hover:bg-gray-200 transition-colors"
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
                    <div className="flex items-center space-x-2">
                        <input
                            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            onKeyPress={handleKeyPress}
                        />
                        <button
                            onClick={handleSend}
                            className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-sm flex items-center space-x-2"
                        >
                            <AiOutlineSend className="w-5 h-5" />
                            <span>Send</span>
                        </button>
                        <label
                            htmlFor="file-upload"
                            className="bg-gray-100 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors text-gray-700 font-medium shadow-sm flex items-center space-x-2"
                        >
                            <AiOutlineCloudUpload className="w-5 h-5" />
                            <span>Upload</span>
                            <input
                                {...getInputProps()}
                                id="file-upload"
                                className="hidden"
                                multiple
                            />
                        </label>
                    </div>
                    {isDragActive && (
                        <div className="absolute inset-0 bg-blue-50 bg-opacity-50 rounded-lg border-2 border-blue-500 border-dashed flex items-center justify-center">
                            <div className="flex items-center space-x-2 text-blue-500">
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
