// Example: src/components/ChatComponent.js
import React, { useState } from "react";
import { getAIResponse } from "../api/aiService";

const ChatComponent = () => {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");

    const handleChat = async () => {
        const reply = await getAIResponse(message);
        setResponse(reply);
    };

    return (
        <div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask AI something..."
            />
            <button onClick={handleChat}>Send</button>
            {response && <p><strong>AI:</strong> {response}</p>}
        </div>
    );
};

export default ChatComponent;
