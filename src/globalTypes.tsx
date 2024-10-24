export interface FilePreview {
    name: string;
    size: number;
    type: string;
}

export interface userInputInterface {
    files: FilePreview[];
    prompt: string;
    creationDateTime: string;
}
export interface Conversation {
    user: userInputInterface;
    bot: string;
}
