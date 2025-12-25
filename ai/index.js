// Node.js CLI for OpenAI GPT-5.1
// Direct API key usage (do not share this file)
// Usage: node gemini-cli-direct.js

import OpenAI from "openai";
import readline from "readline";

// **Direct API key here**
const client = new OpenAI({ apiKey: "
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" });

// Readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Recursive prompt loop
function ask() {
    rl.question("PROMPT ➤ ", async (prompt) => {
        if(prompt.toLowerCase() === "exit") {
            console.log("Exiting...");
            rl.close();
            return;
        }

        try {
            const res = await client.chat.completions.create({
                model: "gpt-5.1",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 8000 // adjust if needed for larger output
            });

            console.log("\nOUTPUT:\n");
            console.log(res.choices[0].message.content);
            console.log("\n---------------------------------\n");
        } catch (err) {
            console.error("❌ Error:", err.message);
        }

        ask(); // repeat prompt
    });
}

// Start CLI
console.log("OpenAI GPT-5.1 CLI ready. Type 'exit' to quit.\n");
ask();
