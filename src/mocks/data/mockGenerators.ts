import { v4 as uuidv4 } from "uuid";
import { FilePreview } from "../../globalTypes";

export const createMockFilePreview = (): FilePreview => ({
    name: `file-${uuidv4()}.pdf`,
    size: Math.floor(Math.random() * 1000000),
    type: "application/pdf",
    url: `https://example.com/files/${uuidv4()}`,
    lastModified: Date.now(),
});
