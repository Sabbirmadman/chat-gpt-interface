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
    prompt: string;
    creationDateTime: string;
}

// Bot's response to user input, including files or the incrementally typed text response
export interface BotResponse {
    files?: FilePreview[];
    botResponseChunks: string[]; // Updated to hold typed chunks in sequence
    creationDateTime: string;
}

// Represents a single conversation exchange between user and bot
export interface Conversation {
    text?: string;
    botResponseChunks: string[]; // For capturing the incremental response in real-time
    isTyping: boolean; // To indicate if the typing simulation is in progress
}
