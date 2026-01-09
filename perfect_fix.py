import requests
import hashlib
import hmac
import json
from datetime import datetime, timezone

# --- TERI KEYS ---
api_key = "key_live_6bd0ae57d7ac403e9c3e41e53d72b4e6"
api_secret = "secret_live_e71e327b4eb2404ebe9639fa58f73397" 

def sign(key, msg):
    return hmac.new(key, msg.encode('utf-8'), hashlib.sha256).digest()

def start():
    # 1. PEHLE TOKEN
    auth_res = requests.post("https://api.sandbox.co.in/authenticate", 
                             headers={"x-api-key": api_key, "x-api-secret": api_secret, "x-api-version": "1.0"})
    token = auth_res.json().get("access_token")
    if not token:
        print("Auth Fail"); return

    # 2. AWS SIG V4 PREP
    t = datetime.now(timezone.utc)
    amz_date, datestamp = t.strftime('%Y%m%dT%H%M%SZ'), t.strftime('%Y%m%d')
    region, service, host = 'ap-south-1', 'execute-api', 'api.sandbox.co.in'
    
    # NEW ENDPOINT BASED ON YOUR INPUT
    uri = "/bank/virtual/accounts/create"
    payload = json.dumps({"name": "SURENDRA SHYAM SINGH", "mobile": "9999999999", "vpa_label": "moneycard"})
    
    payload_hash = hashlib.sha256(payload.encode('utf-8')).hexdigest()
    canonical_headers = f'host:{host}\nx-amz-date:{amz_date}\n'
    signed_headers = 'host;x-amz-date'
    canonical_request = f'POST\n{uri}\n\n{canonical_headers}\n{signed_headers}\n{payload_hash}'
    
    credential_scope = f'{datestamp}/{region}/{service}/aws4_request'
    string_to_sign = f'AWS4-HMAC-SHA256\n{amz_date}\n{credential_scope}\n{hashlib.sha256(canonical_request.encode("utf-8")).hexdigest()}'
    
    # SIGNING
    k_date = sign(('AWS4' + api_secret).encode('utf-8'), datestamp)
    k_region = sign(k_date, region)
    k_service = sign(k_region, service)
    k_signing = sign(k_service, 'aws4_request')
    signature = hmac.new(k_signing, string_to_sign.encode('utf-8'), hashlib.sha256).hexdigest()

    auth_header = f"AWS4-HMAC-SHA256 Credential={api_key}/{credential_scope}, SignedHeaders={signed_headers}, Signature={signature}"

    # 3. FINAL SEND
    headers = {
        "Authorization": auth_header,
        "x-api-token": token,
        "x-api-key": api_key,
        "x-api-version": "1.0",
        "x-amz-date": amz_date,
        "Content-Type": "application/json"
    }
    
    res = requests.post(f"https://{host}{uri}", data=payload, headers=headers)
    print(f"🚀 Status: {res.status_code}\nResponse: {res.text}")

if __name__ == "__main__":
    start()
