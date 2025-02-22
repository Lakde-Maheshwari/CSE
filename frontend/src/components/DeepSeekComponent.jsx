import React, { useState } from 'react';
import axios from 'axios';

const DeepSeekComponent = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5175/api/deepseek', {
                prompt: prompt,
            });
            setResponse(res.data.choices[0].text); // Adjust based on the DeepSeek API response structure
        } catch (error) {
            console.error('Error fetching response:', error);
            setResponse('Failed to fetch response');
        }
    };

    return (
        <div>
            <h1>DeepSeek API Integration</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt"
                    rows={4}
                    cols={50}
                />
                <br />
                <button type="submit">Submit</button>
            </form>
            <h2>Response:</h2>
            <p>{response}</p>
        </div>
    );
};

export default DeepSeekComponent;