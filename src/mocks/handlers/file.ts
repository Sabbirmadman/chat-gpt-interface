import { http, HttpResponse } from "msw";
import { v4 as uuidv4 } from "uuid";
import type { FilePreview } from "../../globalTypes";

export const fileHandlers = [
    http.post("/api/files", async ({ request }) => {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        const filePreview: FilePreview = {
            name: file.name,
            size: file.size,
            type: file.type,
            url: `https://example.com/files/${uuidv4()}`,
            lastModified: Date.now(),
        };

        return HttpResponse.json(filePreview, { status: 201 });
    }),
];
