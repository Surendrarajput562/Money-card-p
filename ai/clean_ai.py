import requests
import json

API_KEY = ""
URL = "https://api.openai.com/v1/chat/completions"

while True:
    prompt = input("\n>>> ")

    r = requests.post(
        URL,
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "gpt-4o-mini",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.2
        }
    )

    try:
        data = r.json()
    except:
        print(r.text)
        continue

    if "error" in data:
        print("\n" + data["error"]["message"] + "\n")
        continue

    msg = data["choices"][0]["message"]["content"]

    # MOBILE FIX: long text wrap
    lines = msg.split("\n")
    for line in lines:
        while len(line) > 60:
            print(line[:60])
            line = line[60:]
        print(line)
