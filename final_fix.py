from sandbox_sdk import Sandbox

# Teri Keys
api_key = "key_live_6bd0ae57d7ac403e9c3e41e53d72b4e6"
api_secret = "secret_live_e71e327b4eb2404ebe9639fa58f73397"

def create_virtual_account():
    # SDK khud hi Signature aur Token handle karega
    sb = Sandbox(api_key=api_key, api_secret=api_secret)
    
    payload = {
        "name": "SURENDRA SHYAM SINGH",
        "mobile": "9999999999",
        "vpa_label": "moneycard"
    }

    print("--- Signing request with AWS SigV4 and creating account ---")
    try:
        # Bank Virtual Account endpoint
        response = sb.bank.create_virtual_account(payload)
        print("🚀 Account Details:", response)
    except Exception as e:
        print("❌ Error:", str(e))

if __name__ == "__main__":
    create_virtual_account()
