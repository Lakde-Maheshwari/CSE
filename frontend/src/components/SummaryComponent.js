// Example: src/components/SummaryComponent.js
import React, { useState } from "react";
import { summarizeText } from "../api/aiService";

const SummaryComponent = () => {
    const [text, setText] = useState("");
    const [summary, setSummary] = useState("");

    const handleSummarize = async () => {
        const result = await summarizeText(text);
        setSummary(result);
    };

    return (
        <div>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to summarize"
            />
            <button onClick={handleSummarize}>Summarize</button>
            {summary && <p><strong>Summary:</strong> {summary}</p>}
        </div>
    );
};

export default SummaryComponent;
