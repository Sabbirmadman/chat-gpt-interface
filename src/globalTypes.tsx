// Represents basic file information for both user and bot interactions
export interface FilePreview {
    name: string;
    size: number;
    type: string;
    url?: string;
    lastModified?: number;
}

// User input structure that contains prompt and files
export interface UserInput {
    files: FilePreview[];
    prompt: string;
    creationDateTime: string;
}

// Bot's response to user input, including files or text response
export interface BotResponse {
    files?: FilePreview[];
    botResponse: string;
    creationDateTime: string;
}

// Represents a single conversation exchange between user and bot
export interface Conversation {
    id?: string;
    user: UserInput;
    bot: BotResponse;
    status?: "pending" | "completed" | "failed";
}
