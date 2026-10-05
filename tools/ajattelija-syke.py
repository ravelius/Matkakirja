# Kopio Linnanrakentajan tools/linssit/blender/sokrates_syke.py:stä (haara linnanrakentaja-sokrates-bysti) ajattelijaputkea varten
# (tools/ajattelija-putki.mjs); sama laskenta ja sama json, jotta syke on tavu tavulta sama.
# Sokrates v10: kaiun "VU-mittari" (omistaja 2.10. 08.3x). Satien raidan RMS-verhokäyrä videoruuduittain (30 r/s):
# nousu 80 ms, lasku 600 ms, normalisoitu kertoimeksi 1 ± 0,15. Vain musiikki (kertojan ääni ei vaikuta).
#   python3 sokrates_syke.py <satie> <alku_s videossa> <kesto_s> <ulos.json>
import array, json, math, subprocess, sys

satie, alku, kesto, ulos = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]), sys.argv[4]
SR, FPS = 8000, 30
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', satie, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'],
                     capture_output=True).stdout
a = array.array('h'); a.frombytes(raw)
hop = SR // 100                                   # 10 ms ikkunat
rms = [math.sqrt(sum(x * x for x in a[i:i + hop]) / hop) for i in range(0, len(a) - hop, hop)]
# verhokäyrä: nousu 80 ms, lasku 600 ms (yksinapainen suodin 10 ms:n askelin)
ka, kr = math.exp(-10 / 80), math.exp(-10 / 600); e, env = 0.0, []
for v in rms:
    e = ka * e + (1 - ka) * v if v > e else kr * e + (1 - kr) * v
    env.append(e)
# normalisointi: 10.–90. persentiili → −1…+1, kerroin 1 ± 0,15
srt = sorted(env[300:]); lo, hi = srt[len(srt) // 10], srt[9 * len(srt) // 10]
kerroin = {}
for r in range(1, int((alku + kesto) * FPS) + 1):
    t = r / FPS - alku
    if t < 0: continue
    i = min(int(t * 100), len(env) - 1); x = (env[i] - lo) / max(hi - lo, 1e-6) * 2 - 1
    kerroin[r] = round(1 + 0.15 * max(-1.0, min(1.0, x)), 4)
json.dump(kerroin, open(ulos, 'w')); print('SYKE', ulos, len(kerroin), 'ruutua', min(kerroin.values()), max(kerroin.values()))
