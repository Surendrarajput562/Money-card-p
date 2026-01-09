import requests
import hashlib
import hmac
from datetime import datetime, timezone

# --- TERI KEYS ---
api_key = "key_live_6bd0ae57d7ac403e9c3e41e53d72b4e6"
api_secret = "secret_live_e71e327b4eb2404ebe9639fa58f73397" 

def start():
    # 1. PEHLE TOKEN NIKALTE HAIN
    auth_url = "https://api.sandbox.co.in/authenticate"
    auth_headers = {"x-api-key": api_key, "x-api-secret": api_secret, "x-api-version": "1.0"}
    r = requests.post(auth_url, headers=auth_headers)
    if r.status_code != 200:
        print("Auth Fail:", r.text); return
    token = r.json().get("access_token")
    print("✅ Token Mil Gaya!")

    # 2. STATUS CHECK (Bina Signature wala endpoint)
    # Isse pata chal jayega ki account active hai ya nahi
    status_url = "https://api.sandbox.co.in/entity/status"
    headers = {
        "Authorization": token,
        "x-api-key": api_key,
        "x-api-version": "1.0"
    }
    
    print("--- Status Check kar raha hu... ---")
    res = requests.get(status_url, headers=headers)
    print(f"🚀 Account Status: {res.status_code}")
    print(f"Response: {res.text}")

if __name__ == "__main__":
    start()
