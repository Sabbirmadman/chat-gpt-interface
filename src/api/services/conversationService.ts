import { axiosInstance } from "../config";
import type { Conversation, UserInput } from "../../globalTypes";

export const conversationService = {
    // Create a new conversation
    createConversation: async (input: UserInput) => {
        const response = await axiosInstance.post<Conversation>(
            "/conversations",
            input
        );
        return response.data;
    },

    // Get a specific conversation
    getConversation: async (id: string) => {
        const response = await axiosInstance.get<Conversation>(
            `/conversations/${id}`
        );
        return response.data;
    },

    // Get all conversations
    getConversations: async () => {
        const response = await axiosInstance.get<Conversation[]>(
            "/conversations"
        );
        return response.data;
    },
};
