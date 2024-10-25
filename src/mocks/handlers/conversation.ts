import { http, HttpResponse } from "msw";
import { v4 as uuidv4 } from "uuid";
import type { Conversation, UserInput } from "../../globalTypes";
import { mockBotResponses } from "../data/mockResponses";
import { createMockFilePreview } from "../data/mockGenerators";

export const conversationHandlers = [
    http.post("/api/conversations", async ({ request }) => {
        try {
            const payload = (await request.json()) as UserInput;

            const conversation: Conversation = {
                id: uuidv4(),
                user: {
                    ...payload,
                    creationDateTime: new Date().toISOString(),
                },
                bot: {
                    botResponse:
                        mockBotResponses[
                            Math.floor(Math.random() * mockBotResponses.length)
                        ],
                    creationDateTime: new Date().toISOString(),
                    files:
                        payload.files.length > 0
                            ? [createMockFilePreview()]
                            : undefined,
                },
                status: "completed",
            };

            return HttpResponse.json(conversation, { status: 201 });
        } catch (error) {
            console.error("Handler error:", error);
            return new HttpResponse("Internal error", { status: 500 });
        }
    }),

    http.get("/api/conversations", () => {
        try {
            const conversations: Conversation[] = Array(5)
                .fill(null)
                .map(() => ({
                    id: uuidv4(),
                    user: {
                        files: [createMockFilePreview()],
                        prompt: "Sample user prompt",
                        creationDateTime: new Date().toISOString(),
                    },
                    bot: {
                        botResponse:
                            mockBotResponses[
                                Math.floor(
                                    Math.random() * mockBotResponses.length
                                )
                            ],
                        creationDateTime: new Date().toISOString(),
                    },
                    status: "completed",
                }));

            return HttpResponse.json(conversations);
        } catch (error) {
            console.error("Handler error:", error);
            return new HttpResponse("Internal error", { status: 500 });
        }
    }),
];
