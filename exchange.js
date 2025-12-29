




const qucoin = require('kucoin-node-sdk');

// KuCoin API Credentials (Ye tujhe KuCoin API management mein milenge)
qucoin.init({
    baseUrl: 'https://api.kucoin.com',
    apiAuth: {
        key: '694dcdb738bda300015bc77c',
        secret: '1880f20b-4cb2-4641-b177-dd36037b745f',
        passphrase: 'MONEYGOLD'
    }
});

// 1. Live Market Price Check (Buy/Sell Rate)
async function getMarketPrice(symbol) {
    try {
        const res = await qucoin.getTicker(symbol); // Example: 'BTC-USDT'
        console.log(`\n📊 Market: ${symbol}`);
        console.log(`💰 Buy Price: ${res.data.buy}`);
        console.log(`💵 Sell Price: ${res.data.sell}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching price:", error);
    }
}

// 2. Simple Swap / Order Logic
async function placeOrder(symbol, side, size) {
    try {
        const order = await qucoin.placeOrder({
            clientOid: Date.now().toString(),
            side: side, // 'buy' or 'sell'
            symbol: symbol,
            type: 'market',
            size: size
        });
        console.log("✅ Order Placed Successfully:", order);
    } catch (error) {
        console.error("❌ Order Failed:", error);
    }
}

// Check Price immediately
getMarketPrice('BTC-USDT');

