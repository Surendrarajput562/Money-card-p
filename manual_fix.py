import requests
import hashlib
import hmac
from datetime import datetime, timezone

# --- TERI KEYS ---
api_key = "key_live_6bd0ae57d7ac403e9c3e41e53d72b4e6"
api_secret = "secret_live_e71e327b4eb2404ebe9639fa58f73397" 

def sign(key, msg):
    return hmac.new(key, msg.encode('utf-8'), hashlib.sha256).digest()

def get_signature_key(key, date_stamp, region_name, service_name):
    k_date = sign(('AWS4' + key).encode('utf-8'), date_stamp)
    k_region = sign(k_date, region_name)
    k_service = sign(k_region, service_name)
    k_signing = sign(k_service, 'aws4_request')
    return k_signing

def start():
    # 1. GET TOKEN
    auth_url = "https://api.sandbox.co.in/authenticate"
    auth_headers = {"x-api-key": api_key, "x-api-secret": api_secret, "x-api-version": "1.0"}
    r = requests.post(auth_url, headers=auth_headers)
    if r.status_code != 200:
        print("Auth Fail:", r.text); return
    token = r.json().get("access_token")
    print("✅ Token Mil Gaya!")

    # 2. PREPARE SIGNATURE (AWS V4 STYLE)
    method = 'POST'
    service = 'execute-api'
    region = 'ap-south-1' # Sandbox typical region
    host = 'api.sandbox.co.in'
    endpoint = 'https://api.sandbox.co.in/bank/virtual-accounts'
    
    t = datetime.now(timezone.utc)
    amz_date = t.strftime('%Y%m%dT%H%M%SZ')
    datestamp = t.strftime('%Y%m%d')

    # Ye header AWS maang raha hai
    headers = {
        "Authorization": token,
        "x-api-key": api_key,
        "x-api-version": "1.0",
        "x-amz-date": amz_date,
        "Content-Type": "application/json"
    }
    
    payload = {"name": "SURENDRA SHYAM SINGH", "mobile": "9999999999", "vpa_label": "moneycard"}

    print("--- Requesting Virtual Account with AWS SigV4 Logic ---")
    res = requests.post(endpoint, json=payload, headers=headers)
    
    print(f"🚀 Status: {res.status_code}")
    print(f"Response: {res.text}")

if __name__ == "__main__":
    start()
