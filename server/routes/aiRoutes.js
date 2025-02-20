const express = require("express");
const axios = require("axios");

const router = express.Router();

// Delay function to prevent hitting rate limits
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to make OpenAI request with retry logic
async function getSummary(text, retries = 5, delay = 1000) {
    try {
        await sleep(delay);

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: `Summarize this: ${text}` }]
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                },
                timeout: 10000, 
            }
        );

        return response.data.choices[0].message.content;

    } catch (error) {
        console.error("Error Response:", error.response?.data || error.message);
        if (error.response?.status === 429 && retries > 0) {
            console.log(`Rate limit reached. Retrying in ${delay}ms...`);
            await sleep(delay);
            return getSummary(text, retries - 1, delay * 2);
        } else {
            throw new Error(`API Error: ${error.response?.data?.error?.message || error.message}`);
        }
    }
}


// Express route to summarize text
router.post("/summarize", async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ message: "Text is required" });

        const summary = await getSummary(text);
        res.json({ summary });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
