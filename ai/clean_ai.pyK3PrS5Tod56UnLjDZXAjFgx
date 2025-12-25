import requests
import json

API_KEY = "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"
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
