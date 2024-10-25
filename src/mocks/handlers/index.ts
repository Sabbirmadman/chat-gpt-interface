import { conversationHandlers } from "./conversation";
import { fileHandlers } from "./file";

export const handlers = [...conversationHandlers, ...fileHandlers];
