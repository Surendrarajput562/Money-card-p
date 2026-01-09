import requests

# Bhai yahan apni sahi keys daal
api_key = "key_live_6bd0ae57d7ac403e9c3e41e53d72b4e6"
api_secret = "secret_live_e71e327b4eb2404ebe9639fa58f73397" 

def start():
    auth_url = "https://api.sandbox.co.in/authenticate"
    auth_headers = {
        "x-api-key": api_key,
        "x-api-secret": api_secret,
        "x-api-version": "1.0"
    }
    
    print("--- Token nikal raha hu... ---")
    auth_res = requests.post(auth_url, headers=auth_headers)
    
    if auth_res.status_code != 200:
        print(f"Token Fail: {auth_res.text}")
        return

    token = auth_res.json().get("access_token")
    print("✅ Token Mil Gaya!")

    acc_url = "https://api.sandbox.co.in/bank/virtual-accounts"
    acc_headers = {
        "Authorization": token,
        "x-api-key": api_key,
        "x-api-version": "1.0",
        "Content-Type": "application/json"
    }
    
    data = {
        "name": "SURENDRA SHYAM SINGH",
        "mobile": "9999999999",
        "vpa_label": "moneycard"
    }

    print("--- Virtual Account bana raha hu... ---")
    acc_res = requests.post(acc_url, json=data, headers=acc_headers)
    print(f"🚀 Status Code: {acc_res.status_code}")
    print(f"Response: {acc_res.text}")

if __name__ == "__main__":
    start()
