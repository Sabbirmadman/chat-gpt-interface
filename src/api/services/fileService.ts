import { axiosInstance } from "../config";
import type { FilePreview } from "../../globalTypes";

export const fileService = {
    // Upload a file
    uploadFile: async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axiosInstance.post<FilePreview>(
            "/files",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    },

    // Upload multiple files
    uploadFiles: async (files: File[]) => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });

        const response = await axiosInstance.post<FilePreview[]>(
            "/files/bulk",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    },
};
