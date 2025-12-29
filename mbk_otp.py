import requests
import json

MOBILE = "6268520141"

def login():
    s = requests.Session()
    # Real Browser Headers
    h = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Origin": "https://www.mobikwik.com",
        "Referer": "https://www.mobikwik.com/"
    }

    print(f"[*] OTP Bhej Raha Hoon: {MOBILE}")
    
    # Naya OTP Endpoint
    otp_url = "https://webapi.mobikwik.com/pwa/v1/user/sendotp"
    payload = {"cell": MOBILE, "source": "web"}
    
    try:
        r = s.post(otp_url, json=payload, headers=h)
        # Agar 404 aaye toh alternate try karega
        if r.status_code != 200:
            otp_url = "https://api.mobikwik.com/v2/otp/send"
            payload = {"mobile": MOBILE, "action": "login"}
            r = s.post(otp_url, json=payload, headers=h)
            
        res = r.json()
        if res.get("status") == "success" or res.get("status") == "SUCCESS":
            print("[+] OTP Chala Gaya! SMS check kar.")
            otp = input("[?] OTP Daalo: ")
            
            # Verify Endpoint
            v_url = "https://webapi.mobikwik.com/pwa/v1/user/verifyotp"
            v_payload = {"cell": MOBILE, "otp": otp, "source": "web"}
            
            rv = s.post(v_url, json=v_payload, headers=h)
            if rv.status_code != 200:
                v_url = "https://api.mobikwik.com/v2/user/login"
                v_payload = {"mobile": MOBILE, "otp": otp}
                rv = s.post(v_url, json=v_payload, headers=h)
                
            vd = rv.json()
            if vd.get("status") == "success" or vd.get("status") == "SUCCESS":
                with open("mbk_token.txt", "w") as f:
                    f.write(json.dumps(s.cookies.get_dict()))
                print("[SUCCESS] Login Done! mbk_token.txt ban gayi.")
            else:
                print(f"[-] Verify Fail: {vd.get('message')}")
        else:
            print(f"[-] OTP Fail: {res.get('message')} (Code: {r.status_code})")
            
    except Exception as e:
        print(f"[-] Error: Server ne connection reject kar diya.")

if __name__ == "__main__":
    login()
