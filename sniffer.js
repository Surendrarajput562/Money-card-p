
const http = require('http');

const server = http.createServer((req, res) => {
    let rawHeaders = JSON.stringify(req.headers).toLowerCase();
    
    // OmniCard ka har tarah ka data capture karne ke liye
    if (rawHeaders.includes('omni') || req.headers['authorization'] || req.headers['x-hwid']) {
        console.log("\n========================================");
        console.log("🔥 [!!! OMNI DATA DETECTED !!!] 🔥");
        console.log("----------------------------------------");
        console.log("💎 TOKEN:", req.headers['authorization'] || "Not Found");
        console.log("📱 HWID:", req.headers['x-hwid'] || "Not Found");
        console.log("📦 DEVICE:", req.headers['x-device-model'] || "N/A");
        console.log("🔗 URL:", req.url);
        console.log("========================================\n");
    }

    res.writeHead(200);
    res.end();
});

server.listen(8080, '127.0.0.1', () => {
    console.log("🚀 Radar ON hai... Mobile data se Omni App kholo!");
});

