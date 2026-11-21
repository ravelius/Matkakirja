# Pelin kuvake + pyöreä päivitysmerkki oikeaan alakulmaan → .icns (JU 16.11.2026)
import sys, os, subprocess, tempfile
from PIL import Image, ImageDraw
src, out = sys.argv[1], sys.argv[2]
d = tempfile.mkdtemp(); subprocess.run(["iconutil", "-c", "iconset", src, "-o", d + "/p.iconset"], check=True)
iset = d + "/p.iconset"; big = sorted(os.listdir(iset), key=lambda f: os.path.getsize(os.path.join(iset, f)))[-1]
im = Image.open(os.path.join(iset, big)).convert("RGBA").resize((1024, 1024), Image.LANCZOS)
dr = ImageDraw.Draw(im); cx, cy, r = 760, 760, 210
dr.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(122, 78, 34, 255), outline=(244, 236, 220, 255), width=18)
w = 34; rr = 120
dr.arc((cx - rr, cy - rr, cx + rr, cy + rr), start=200, end=500, fill=(244, 236, 220, 255), width=w)
import math
a = math.radians(140); px, py = cx + rr * math.cos(a), cy + rr * math.sin(a)
dr.polygon([(px - 55, py - 10), (px + 40, py - 40), (px + 15, py + 60)], fill=(244, 236, 220, 255))
o = d + "/u.iconset"; os.makedirs(o)
for s in (16, 32, 128, 256, 512):
    im.resize((s, s), Image.LANCZOS).save(f"{o}/icon_{s}x{s}.png"); im.resize((2 * s, 2 * s), Image.LANCZOS).save(f"{o}/icon_{s}x{s}@2x.png")
subprocess.run(["iconutil", "-c", "icns", o, "-o", out], check=True)
