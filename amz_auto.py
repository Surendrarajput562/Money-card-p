import requests
from bs4 import BeautifulSoup
import os

# --- DETAILS ---
EMAIL = "rajputsurendra562@gmail.com"
# ---------------

def login():
    session = requests.Session()
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
    
    print(f"[*] Logging in for: {EMAIL}")
    res = session.get("https://www.amazon.in/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.in%2F&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=inflex&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0", headers=headers)
    
    # 1. Email Step
    soup = BeautifulSoup(res.text, 'html.parser')
    data = {f['name']: f.get('value', '') for f in soup.find_all('input', {'name': True})}
    data['email'] = EMAIL
    res = session.post("https://www.amazon.in/ap/signin", data=data, headers=headers)
    
    # 2. Password Step
    password = input("[?] Enter Amazon Password: ")
    soup = BeautifulSoup(res.text, 'html.parser')
    data = {f['name']: f.get('value', '') for f in soup.find_all('input', {'name': True})}
    data['password'] = password
    res = session.post("https://www.amazon.in/ap/signin", data=data, headers=headers)

    # 3. OTP Step (Manual Input)
    if "otp" in res.text.lower() or "auth" in res.text.lower() or "verification" in res.text.lower():
        print("\n[!] 2FA/OTP Required!")
        otp = input("[?] Enter 6-digit OTP from App: ")
        
        soup = BeautifulSoup(res.text, 'html.parser')
        data = {f['name']: f.get('value', '') for f in soup.find_all('input', {'name': True})}
        # Amazon different forms use different OTP field names, checking 'otpCode'
        data['otpCode'] = otp
        res = session.post("https://www.amazon.in/ap/signin", data=data, headers=headers)

    # 4. Token Check
    cookies = session.cookies.get_dict()
    if 'at-main' in cookies:
        with open("token.txt", "w") as f:
            f.write(cookies['at-main'])
        print("\n[SUCCESS] Bhai Token mil gaya! token.txt check kar.")
    else:
        print("\n[-] Login Failed! Shayad OTP ya Password galat tha.")

if __name__ == "__main__":
    login()
