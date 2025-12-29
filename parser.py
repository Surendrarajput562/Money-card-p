import re

try:
    with open('amz_fixed.html', 'r', encoding='utf-8') as f:
        data = f.read()
        
        # Token nikalne ka logic
        token = re.search(r'csrfToken":"(.*?)"', data)
        if not token:
            token = re.search(r'csrfToken" value="(.*?)"', data)
            
        # Session ID nikalne ka logic
        sid = re.search(r'session-id=(.*?);', data)

        print("\n" + "="*30)
        print("   AMAZON MASTER DATA")
        print("="*30)
        if token:
            print(f"REAL TOKEN: {token.group(1)}")
        else:
            print("TOKEN: Nahi mila (Login Expire)")
            
        if sid:
            print(f"SESSION ID: {sid.group(1)}")
        print("="*30)
except Exception as e:
    print(f"Error: {e}")
