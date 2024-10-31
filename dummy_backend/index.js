const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const port = 9292;

app.get("/api/v1/generate", (req, res) => {
    const promptMessage = req.query.promptMessage;

    if (!promptMessage) {
        return res.status(400).json({ error: "Prompt message is required" });
    }

    let botResponse = `Simulated response to: "${promptMessage}"`;
    let currentIndex = 0;

    // Set headers for server-sent events
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const typeText = () => {
        if (currentIndex < botResponse.length) {
            // Send the current chunk of text
            const chunk = botResponse[currentIndex];
            res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
            currentIndex++;
            setTimeout(typeText, 100); // Adjust typing speed here
        } else {
            res.end();
        }
    };

    // Start typing simulation
    typeText();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
