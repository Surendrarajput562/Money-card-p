import re

file_path = 'amz_fixed.html'
try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
        # 1. CSRF Token nikalna
        token = re.search(r'csrfToken":"(.*?)"', content)
        # 2. Session ID nikalna
        sid = re.search(r'session-id=(.*?);', content) or re.search(r'session-id":"(.*?)"', content)

        print("\n" + "="*40)
        print("      --- TERA MASTER DATA ---")
        print("="*40)
        print(f"CSRF TOKEN : {token.group(1) if token else 'NOT FOUND (Expire)'}")
        print(f"SESSION ID : {sid.group(1) if sid else 'NOT FOUND'}")
        print("="*40)
        print("\nBhai agar NOT FOUND aa raha hai toh session mar chuka hai.")
except Exception as e:
    print(f"Error: {e}")
