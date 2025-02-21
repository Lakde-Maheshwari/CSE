// src/api/aiService.js
export const summarizeText = async (text) => {
    try {
        const response = await fetch('http://localhost:6471/api/ai/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        const data = await response.json();
        return data.summary;
    } catch (error) {
        console.error("Error summarizing text:", error);
        return null;
    }
};

export const getAIResponse = async (message) => {
    try {
        const response = await fetch('http://localhost:6471/api/ai/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error("Error getting AI response:", error);
        return null;
    }
};
