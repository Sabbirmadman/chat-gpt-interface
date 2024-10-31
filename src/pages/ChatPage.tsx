import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../ThemeProvider";
import { BiMoon, BiSend, BiSun } from "react-icons/bi";

interface Message {
    sender: "user" | "bot";
    text: string;
}

const ChatPage = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState<string>("");
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const { theme, toggleTheme } = useTheme();

    const sendMessage = async () => {
        if (!inputText.trim()) return;

        const userMessage: Message = { sender: "user", text: inputText };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInputText("");
        setIsTyping(true);

        try {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: "" },
            ]);

            const eventSource = new EventSource(
                `http://localhost:9292/api/v1/generate?promptMessage=${encodeURIComponent(
                    inputText
                )}`
            );

            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
                setMessages((prevMessages) => {
                    const newMessages = [...prevMessages];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage.sender === "bot") {
                        lastMessage.text += data.text;
                    }
                    return newMessages;
                });
            };

            eventSource.onerror = () => {
                eventSource.close();
                setIsTyping(false);
            };

            return () => {
                eventSource.close();
            };
        } catch (error) {
            console.error("Error fetching response from server:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: "Error: could not fetch response." },
            ]);
            setIsTyping(false);
        }
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-primary-light dark:bg-primary-dark">
            <div className="w-full max-w-4xl bg-secondary-light dark:bg-secondary-dark rounded-lg shadow-lg overflow-hidden flex flex-col h-[80vh]">
                {/* Chat Header */}
                <div className="bg-gray-light dark:bg-gray-dark border-b border-text-light-light dark:border-text-light-dark px-6 py-4 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
                            Chat Assistant
                        </h2>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                            Ask me anything
                        </p>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-primary-light dark:hover:bg-primary-dark transition-colors"
                    >
                        {theme === "dark" ? (
                            <BiSun className="w-5 h-5 text-text-primary-dark" />
                        ) : (
                            <BiMoon className="w-5 h-5 text-text-primary-light" />
                        )}
                    </button>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-secondary-light dark:bg-secondary-dark">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${
                                message.sender === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div
                                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                                    message.sender === "user"
                                        ? "bg-appBlue text-white rounded-br-none"
                                        : "bg-gray-light dark:bg-gray-dark text-text-primary-light dark:text-text-primary-dark rounded-bl-none"
                                }`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-gray-light dark:bg-gray-dark text-text-primary-light dark:text-text-primary-dark rounded-lg rounded-bl-none px-4 py-2">
                                <div className="flex space-x-2">
                                    <div className="w-2 h-2 bg-text-secondary-light dark:bg-text-secondary-dark rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-text-secondary-light dark:bg-text-secondary-dark rounded-full animate-bounce delay-100"></div>
                                    <div className="w-2 h-2 bg-text-secondary-light dark:bg-text-secondary-dark rounded-full animate-bounce delay-200"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Container */}
                <div className="border-t border-text-light-light dark:border-text-light-dark p-4 bg-gray-light dark:bg-gray-dark">
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            className="flex-1 bg-secondary-light dark:bg-secondary-dark border border-text-light-light dark:border-text-light-dark rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-appBlue focus:border-transparent text-text-primary-light dark:text-text-primary-dark placeholder-text-secondary-light dark:placeholder-text-secondary-dark"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") sendMessage();
                            }}
                            placeholder="Type your message..."
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-appBlue text-white rounded-lg px-4 py-2 hover:bg-appBlue/80 transition-colors duration-200 flex items-center space-x-2"
                        >
                            <span>Send</span>
                            <BiSend size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
