import axios from 'axios';

export default async function handler(req, res) {
    // CORS Headers: Isse teri HTML file Vercel se baat kar payegi
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        const { upi, amount } = req.body;
        
        // TERA MACRODROID WEBHOOK URL
        const MACRODROID_URL = "https://trigger.macrodroid.com/adf4ed2b-bf71-433f-8db8-e5b779ac3876/navi_payout/payout";

        try {
            // MacroDroid ko signal bhejna
            const response = await axios.get(`${MACRODROID_URL}?v_upi=${upi}&v_amount=${amount}`);
            
            return res.status(200).json({ success: true, message: "Phone par signal bhej diya!" });
        } catch (error) {
            return res.status(500).json({ success: false, error: "MacroDroid connect nahi ho raha" });
        }
    } else {
        res.status(405).json({ message: "Only POST allowed" });
    }
}
