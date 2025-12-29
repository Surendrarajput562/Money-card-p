import requests
from bs4 import BeautifulSoup

# --- DETAILS ---
EMAIL = "rajputsurendra562@gmail.com"
PASSWORD = "Suren@1712"  # <-- Iske beech apna password daal de
# ---------------

def capture_token():
    session = requests.Session()
    headers = {
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; SM-G960F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
    }

    print(f"\n[*] Login Shuru... User: {EMAIL}")
    
    # 1. Page Load
    url = "https://www.amazon.in/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.in%2F&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=inflex&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0"
    res = session.get(url, headers=headers)
    
    # 2. Submit Email
    soup = BeautifulSoup(res.text, 'html.parser')
    data = {f['name']: f.get('value', '') for f in soup.find_all('input', {'name': True})}
    data['email'] = EMAIL
    res = session.post("https://www.amazon.in/ap/signin", data=data, headers=headers)
    
    # 3. Submit Password
    soup = BeautifulSoup(res.text, 'html.parser')
    data = {f['name']: f.get('value', '') for f in soup.find_all('input', {'name': True})}
    data['password'] = PASSWORD
    res = session.post("https://www.amazon.in/ap/signin", data=data, headers=headers)

    # 4. OTP Check (Sirf ye maangega)
    if "otp" in res.text.lower() or "verification" in res.text.lower() or "auth" in res.text.lower():
        print("\n[!] 2FA/OTP Detected!")
        otp = input("[?] Enter 6-digit OTP from App: ")
        soup = BeautifulSoup(res.text, 'html.parser')
        data = {f['name']: f.get('value', '') for f in soup.find_all('input', {'name': True})}
        
        # Checking possible OTP fields
        otp_field = 'otpCode' if 'otpCode' in data else 'code'
        data[otp_field] = otp
        res = session.post("https://www.amazon.in/ap/signin", data=data, headers=headers)

    # 5. Save Token
    cookies = session.cookies.get_dict()
    if 'at-main' in cookies:
        with open("token.txt", "w") as f:
            f.write(cookies['at-main'])
        print("\n[SUCCESS] Bhai kaam ho gaya! token.txt save ho gayi.")
    else:
        print("\n[-] Login Failed! Password check kar ya shayad Captcha aa gaya.")

if __name__ == "__main__":
    capture_token()
