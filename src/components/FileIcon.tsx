// FileIcon.tsx
import React from "react";
import {
    BsFiletypeDoc,
    BsFiletypeJpg,
    BsFiletypePdf,
    BsFiletypePng,
} from "react-icons/bs";
import { AiOutlineFile } from "react-icons/ai";

interface FileIconProps {
    fileType: string;
}

const FileIcon: React.FC<FileIconProps> = ({ fileType }) => {
    if (fileType.includes("pdf"))
        return <BsFiletypePdf className="w-5 h-5 text-red-500" />;
    if (fileType.includes("doc"))
        return <BsFiletypeDoc className="w-5 h-5 text-blue-500" />;
    if (fileType.includes("jpg") || fileType.includes("jpeg"))
        return <BsFiletypeJpg className="w-5 h-5 text-green-500" />;
    if (fileType.includes("png"))
        return <BsFiletypePng className="w-5 h-5 text-purple-500" />;
    return <AiOutlineFile className="w-5 h-5 text-gray-500" />;
};

export default FileIcon;
