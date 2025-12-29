import os
from flask import Flask, request
app = Flask(__name__)

@app.route('/callback')
def callback():
    cookie = request.headers.get('Cookie')
    if cookie:
        with open("at_main.txt", "w") as f: f.write(cookie)
        return "<h1>TOKEN CAPTURED! Termux check karo.</h1>"
    return "<h1>Cookie missing!</h1>"

if __name__ == "__main__":
    print("\n[1] Pehle Chrome mein Amazon Login karlo.")
    print("[2] Login hone ke baad, browser ke address bar mein ye paste karo:")
    print("\nhttp://127.0.0.1:5000/callback\n")
    app.run(host='127.0.0.1', port=5000)
