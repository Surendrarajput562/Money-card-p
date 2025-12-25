# ai_5_1_coad_writer.py
# termux-ready gpt-5.1 client that reads prompt lines from stdin and appends replies into Coad.html
# usage:
# export OPENAI_API_KEY="sk-..."
# python3 ai_5_1_coad_writer.py
# type prompts (one line each). replies are NOT printed to terminal; they are appended to Coad.html.
# type "exit" or "quit" to stop.

from openai import OpenAI
import os
import sys
import time
import html as htmllib
from datetime import datetime

API_KEY = os.getenv("OPENAI_API_KEY", "")
MODEL = "gpt-5.1"
OUTFILE = "Coad.html"
RATE_LIMIT_WAIT = 20
MAX_RATE_RETRIES = 6
WRAP_COLS = 52  # if you need to pre-wrap before writing (we use pre-wrap in html so not strictly needed)

if not API_KEY:
    sys.exit(1)

client = OpenAI(api_key=API_KEY)

def ensure_html(path):
    if not os.path.exists(path):
        header = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>coad replies</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
body{font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial; background:#0f1724;color:#e6eef8;padding:12px}
.container{max-width:900px;margin:0 auto}
.card{background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); padding:12px;border-radius:10px;margin-bottom:12px;border:1px solid rgba(255,255,255,0.03)}
.meta{font-size:13px;color:#9aa4b2;margin-bottom:8px}
.content{white-space:pre-wrap;word-break:break-word;font-family:ui-monospace,Menlo,Monaco,Roboto Mono,monospace;font-size:14px;line-height:1.45;color:#cfe9ff}
</style>
</head>
<body>
<div class="container">
<h2 style="margin-top:6px">coad — assistant replies</h2>
<div id="entries"></div>
</div>
</body>
</html>
"""
        with open(path, "w", encoding="utf-8") as f:
            f.write(header)

def append_entry(file_path, prompt, reply_text):
    safe_prompt = htmllib.escape(prompt)
    safe_reply = htmllib.escape(reply_text)
    ts = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    entry = f"""
<div class="card">
  <div class="meta">prompt: <strong>{safe_prompt}</strong> — <span>{ts}</span></div>
  <div class="content">{safe_reply}</div>
</div>
"""
    with open(file_path, "r", encoding="utf-8") as f:
        data = f.read()
    marker = '<div id="entries">'
    i = data.find(marker)
    if i == -1:
        new = data + "\n" + entry
    else:
        pos = i + len(marker)
        new = data[:pos] + "\n" + entry + data[pos:]
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new)

def extract_text(resp):
    if hasattr(resp, "output_text") and resp.output_text:
        return resp.output_text
    try:
        parts = []
        out = getattr(resp, "output", None)
        if out:
            for item in out:
                if isinstance(item, dict):
                    content = item.get("content") or item.get("text") or item.get("value")
                    if isinstance(content, list):
                        for c in content:
                            if isinstance(c, dict) and c.get("type") == "output_text":
                                parts.append(c.get("text",""))
                            elif isinstance(c, str):
                                parts.append(c)
                    elif isinstance(content, str):
                        parts.append(content)
                elif isinstance(item, str):
                    parts.append(item)
        return "\n".join(parts).strip()
    except Exception:
        return ""

def clean_text(text):
    if not isinstance(text, str):
        return ""
    lines = text.splitlines()
    cleaned = []
    for ln in lines:
        s = ln.lstrip()
        if s.lower().startswith("you:"):
            continue
        cleaned.append(ln)
    while cleaned and cleaned[0].strip() == "":
        cleaned.pop(0)
    while cleaned and cleaned[-1].strip() == "":
        cleaned.pop()
    return "\n".join(cleaned)

def query(prompt):
    retries = 0
    while True:
        try:
            resp = client.responses.create(
                model=MODEL,
                input=[{"role":"user","content":prompt}]
            )
            txt = extract_text(resp)
            return clean_text(txt)
        except KeyboardInterrupt:
            raise
        except Exception as e:
            err = str(e).lower()
            if "rate limit" in err or "requests per min" in err or "too many requests" in err:
                retries += 1
                if retries > MAX_RATE_RETRIES:
                    return f"[error] rate limit retries exceeded: {e}"
                time.sleep(RATE_LIMIT_WAIT)
                continue
            return f"[error] {e}"

def main():
    ensure_html(OUTFILE)
    try:
        while True:
            try:
                prompt = input().strip()
            except EOFError:
                break
            if not prompt:
                continue
            if prompt.lower() in ("exit","quit"):
                break
            reply = query(prompt)
            append_entry(OUTFILE, prompt, reply)
    except KeyboardInterrupt:
        pass

if __name__ == "__main__":
    main()
