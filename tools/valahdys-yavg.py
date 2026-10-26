#!/usr/bin/env python3
# Välähdyshaku videosta (Raamattu 9.5): ruutukohtainen keskikirkkaus (ffmpeg signalstats YAVG);
# hälytys, kun peräkkäisten ruutujen ero > raja/255 ja palaa seuraavassa ruudussa (yhden ruudun väläys).
# Pohja: Valosepän valahdys-yavg.zsh 24.10.2026. Käyttö: python3 -I tools/valahdys-yavg.py <video.mp4> [raja=4]
import re, subprocess, sys, tempfile

if len(sys.argv) < 2:
    sys.exit("käyttö: valahdys-yavg.py <video> [raja]")
video = sys.argv[1]
raja = float(sys.argv[2]) if len(sys.argv) > 2 else 4.0
with tempfile.NamedTemporaryFile(suffix=".txt") as tmp:
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "fatal", "-i", video, "-vf",
                    f"scale=480:-2,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file={tmp.name}",
                    "-f", "null", "-"], check=True)
    t, y = [], []
    for r in open(tmp.name):
        m = re.search(r"pts_time:([\d.]+)", r)
        if m:
            t.append(float(m.group(1)))
        m = re.search(r"YAVG=([\d.]+)", r)
        if m:
            y.append(float(m.group(1)))
n = 0
for i in range(1, len(y) - 1):
    a, b = y[i] - y[i - 1], y[i + 1] - y[i]
    if abs(a) > raja and abs(b) > raja and a * b < 0:
        n += 1
        print(f"VÄLÄYS {t[i]:.3f} s: {y[i-1]:.1f} → {y[i]:.1f} → {y[i+1]:.1f}")
print(f"ruutuja {len(y)}, väläyksiä {n}")
sys.exit(1 if n else 0)
