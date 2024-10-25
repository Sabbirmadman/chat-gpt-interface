import { useEffect, useState } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import ChatHeader from "../components/chat/ChatHeader";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInputWindow from "../components/chat/ChatInputWindow";
import { Conversation, UserInput, FilePreview } from "../globalTypes";
import { conversationService, fileService } from "../api";

export default function ChatPage() {
    const [state, setState] = useState({
        isPaneOpen: false,
    });
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch all conversations
    const fetchConversations = async () => {
        try {
            setLoading(true);
            setError(null);
            const fetchedConversations =
                await conversationService.getConversations();
            setConversations(fetchedConversations);
        } catch (err) {
            setError("Failed to load conversations");
            console.error("Error fetching conversations:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConversations();
    }, []);

    // Handle file uploads
    const handleFileUpload = async (files: File[]): Promise<FilePreview[]> => {
        try {
            setLoading(true);
            setError(null);

            // Upload multiple files if available
            if (files.length > 1) {
                return await fileService.uploadFiles(files);
            }

            // Upload single file
            if (files.length === 1) {
                const uploadedFile = await fileService.uploadFile(files[0]);
                return [uploadedFile];
            }

            return [];
        } catch (err) {
            setError("Failed to upload files");
            console.error("Error uploading files:", err);
            return [];
        } finally {
            setLoading(false);
        }
    };

    // Handle sending messages
    const handleSend = async (data: UserInput) => {
        try {
            setLoading(true);
            setError(null);

            // Upload any files first
            let uploadedFiles: FilePreview[] = [];
            if (data.files.length > 0) {
                const filesToUpload = data.files.filter(
                    (file) => file instanceof File
                ) as File[];
                uploadedFiles = await handleFileUpload(filesToUpload);
            }

            // Create conversation with uploaded files
            const newConversation =
                await conversationService.createConversation({
                    ...data,
                    files: uploadedFiles,
                });

            // Update conversations list
            setConversations((prev) => [newConversation, ...prev]);

            return newConversation;
        } catch (err) {
            setError("Failed to send message");
            console.error("Error sending message:", err);

            // Add error handling UI feedback here if needed
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Handle retrying failed requests
    const handleRetry = () => {
        setError(null);
        fetchConversations();
    };

    return (
        <div className="h-screen bg-primary">
            <SlidingPane
                isOpen={state.isPaneOpen}
                from="left"
                onRequestClose={() => setState({ isPaneOpen: false })}
                width="300px"
                className="bg-custom-gradient text-textLight bg-cover bg-fixed bg-no-repeat"
                hideHeader
            >
                <div>Chat Pane</div>
            </SlidingPane>
            <div className="h-full bg-primary text-textPrimary rounded-lg flex flex-col overflow-hidden">
                <ChatHeader setState={setState} />
                <div className="flex-1 bg-secondary mx-2 rounded-md overflow-y-auto bg-custom-gradient border-2 border-gray relative">
                    {loading && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                        </div>
                    )}

                    {error && (
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md flex items-center space-x-2">
                            <span>{error}</span>
                            <button
                                onClick={handleRetry}
                                className="text-sm underline hover:no-underline"
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    <ChatWindow conversations={conversations} />
                </div>

                <ChatInputWindow onSend={handleSend} disabled={loading} />
            </div>
        </div>
    );
}
