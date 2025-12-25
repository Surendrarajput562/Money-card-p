# convert_run_to_code.py
# termux: put your html content into run.html then run:
# python3 convert_run_to_code.py
# this will write the same content into code.html without printing anything to stdout.

import io
import sys
import os

SRC = "run.html"
DST = "code.html"

def main():
    if not os.path.exists(SRC):
        # silently create empty dst if source missing
        open(DST, "w", encoding="utf-8").write("")
        return
    with io.open(SRC, "r", encoding="utf-8", errors="ignore") as f:
        data = f.read()
    # optional sanitization: ensure html tag exists; if not, wrap as pre
    if "<html" not in data.lower():
        data = "<!doctype html>\n<html>\n<body><pre>\n" + data + "\n</pre></body>\n</html>"
    with io.open(DST, "w", encoding="utf-8") as f:
        f.write(data)

if __name__ == "__main__":
    main()
