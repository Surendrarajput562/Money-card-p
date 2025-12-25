prompt = input("prompt likho: ")

html = f"""
<!DOCTYPE html>
<html>
<head>
<title>{prompt}</title>
<style>
body {{ font-family: Arial; padding:20px; background:#f4f4f4; }}
.box {{ background:white; padding:20px; border-radius:10px; }}
</style>
</head>
<body>

<div class="box">
<h1>{prompt}</h1>
<p>Auto-generated HTML/CSS/JS</p>
<button onclick="run()">Click</button>
</div>

<script>
function run(){{
    alert("Generated for: {prompt}");
}}
</script>

</body>
</html>
"""

with open("goldrupi.html", "w") as f:
    f.write(html)

print("✅ goldrupi.html generate ho gaya")
