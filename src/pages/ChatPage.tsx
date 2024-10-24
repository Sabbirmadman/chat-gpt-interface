import { useState } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import ChatHeader from "../components/chat/ChatHeader";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInputWindow from "../components/chat/ChatInputWindow";
import { Conversation, userInputInterface } from "../globalTypes";
export default function ChatPage() {
    const [state, setState] = useState({
        isPaneOpen: false,
    });

    const [conversations, setConversations] = useState<Conversation[]>([]);

    const handleSend = (data: userInputInterface) => {
        setConversations((prev) => [
            ...prev,
            {
                user: data,
                bot: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            },
        ]);
    };

    return (
        <div className="h-screen bg-custom-gradient bg-cover bg-fixed bg-no-repeat p-2">
            <SlidingPane
                isOpen={state.isPaneOpen}
                from="left"
                onRequestClose={() => setState({ isPaneOpen: false })}
                width="300px"
                className="bg-custom-gradient text-textLight bg-cover bg-fixed bg-no-repeat"
                hideHeader
            >
                <div>And I am pane content. BTW, what rocks?</div>
            </SlidingPane>
            <div className="h-full bg-white rounded-lg flex flex-col ">
                <ChatHeader setState={setState} />
                <div className="flex-1 bg-secondary mx-8 rounded-md overflow-y-auto">
                    <ChatWindow conversations={conversations} />
                </div>

                <ChatInputWindow onSend={handleSend} />
            </div>
        </div>
    );
}
