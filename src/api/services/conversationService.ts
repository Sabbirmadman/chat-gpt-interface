import { axiosInstance } from "../config";
import type { Conversation, UserInput } from "../../globalTypes";
import axios from "axios";

export const conversationService = {
    // Create a new conversation
    createConversation: async (
        input: UserInput
    ): Promise<Conversation | null> => {
        try {
            const response = await axiosInstance.get<Conversation>(
                `/v1/generate?promptMessage=${input.prompt}`
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Log Axios-specific error details
                console.error(
                    "Error creating conversation:",
                    error.response?.data || error.message
                );
            } else {
                // Handle non-Axios errors
                console.error("Unexpected error:", error);
            }
            return null; // Return null or handle the error as per your requirement
        }
    },
};
