# Ikkunaluettelon ehdokkaat (Linnanrakentaja 30.9.2026, v18). Ketju: julkisivut.py tekee kustakin ikkuna-alueesta
# neljä ortokuvaa (ja <alue>.json:n mittakaavasta), tämä etsii niistä ikkunankokoiset tummat suorakaiteet
# (0,35–1,7 × 0,5–2,4 m) ja kirjoittaa ikkunat-ehdokkaat.json:n + t-<alue>-<suunta>.png-tarkistuskuvat. Rapatuilla
# julkisivuilla automaattinen tulos kelpaa sellaisenaan; kivijulkisivuilla ehdokkaat valitaan käsin numeroittain.
# Lopullinen luettelo: ../olavinlinna-ikkunat.json (kuori_ikkunat.py --luettelo). Ajo Blenderissä kansiossa, jossa
# ortokuvat ovat: Blender -b --python-expr "import os; os.chdir('<kansio>'); exec(open('tunnista.py').read())"
import json, os, numpy as np, bpy
D = os.path.dirname(os.path.abspath(__file__)) if '__file__' in dir() else os.getcwd()
KERROIN = float(os.environ.get('KERROIN', 0.78))
KATSE = {'pohjoiseen': 180, 'itaan': 270, 'etelaan': 0, 'lanteen': 90}
def lue(p):
    im = bpy.data.images.load(p); w, h = im.size; a = np.empty(w * h * 4, np.float32); im.pixels.foreach_get(a)
    return a.reshape(h, w, 4)[::-1, :, :3].copy()
def tallenna(a, p):
    h, w = a.shape[:2]; im = bpy.data.images.new('x', w, h); b = np.ones((h, w, 4), np.float32); b[..., :3] = a[::-1]
    im.pixels.foreach_set(b.ravel()); im.filepath_raw = p; im.file_format = 'PNG'; im.save()
def boxmean(x, r):
    I = np.pad(x.cumsum(0).cumsum(1), ((1, 0), (1, 0))); H, W = x.shape
    y0 = np.clip(np.arange(H) - r, 0, H); y1 = np.clip(np.arange(H) + r + 1, 0, H); x0 = np.clip(np.arange(W) - r, 0, W); x1 = np.clip(np.arange(W) + r + 1, 0, W)
    s = I[y1][:, x1] - I[y0][:, x1] - I[y1][:, x0] + I[y0][:, x0]; n = (y1 - y0)[:, None] * (x1 - x0)[None]; return s / n
def morf(m, it, avaa):
    for _ in range(it):
        q = np.pad(m, 1); nb = [q[1 + dy:1 + dy + m.shape[0], 1 + dx:1 + dx + m.shape[1]] for dy in (-1, 0, 1) for dx in (-1, 0, 1)]
        m = np.logical_and.reduce(nb) if avaa else np.logical_or.reduce(nb)
    return m
def label(m):
    lab = np.zeros(m.shape, np.int32); k = 0; H, W = m.shape
    for y, x in zip(*np.nonzero(m)):
        if lab[y, x]: continue
        k += 1; st = [(y, x)]; lab[y, x] = k
        while st:
            cy, cx = st.pop()
            for ny, nx in ((cy + 1, cx), (cy - 1, cx), (cy, cx + 1), (cy, cx - 1)):
                if 0 <= ny < H and 0 <= nx < W and m[ny, nx] and not lab[ny, nx]: lab[ny, nx] = k; st.append((ny, nx))
    return lab, k
out = []
for n in ['itasiipi', 'kappelikerros', 'keittio', 'keskushalli']:
    T = json.load(open(os.path.join(D, f'{n}.json')))
    for s, t in T.items():
        a = lue(os.path.join(D, f'{n}-{s}.png')); L = a @ np.array([0.299, 0.587, 0.114], np.float32); P = t['px_m']
        geo = L > 0.02; bg = boxmean(np.where(geo, L, 0), P) / np.maximum(boxmean(geo.astype(np.float32), P), 1e-3)
        tumma = geo & (L < KERROIN * bg) & (bg > 0.2)
        tumma = morf(morf(tumma, 3, False), 3, True); tumma = morf(morf(tumma, 2, True), 2, False)
        lab, k = label(tumma)
        for i in range(1, k + 1):
            ys, xs = np.nonzero(lab == i)
            if len(ys) < 20: continue
            y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
            h = (y1 - y0) / P; w = (x1 - x0) / P; tay = len(ys) / ((y1 - y0) * (x1 - x0))
            ok = 0.35 <= w <= 1.7 and 0.5 <= h <= 2.4 and tay > 0.45 and h >= 0.7 * w
            reuna = y0 < 2 or x0 < 2 or y1 > a.shape[0] - 2 or x1 > a.shape[1] - 2
            tyhja = (~geo[max(y0 - 3, 0):y1 + 3, max(x0 - 3, 0):x1 + 3]).mean() > 0.05
            if ok and not reuna and not tyhja:
                ax, u0, sg = t['u']; ua = u0 + sg * x0 / P; ub = u0 + sg * x1 / P
                zz1 = t['z0'] + t['kork'] - y0 / P; zz0 = t['z0'] + t['kork'] - y1 / P
                out.append({'alue': n, 'katse': s, 'akseli': ax, 'u': [round(float(min(ua, ub)), 2), round(float(max(ua, ub)), 2)],
                            'z': [round(float(zz0), 2), round(float(zz1), 2)], 'suunta': KATSE[s], 'px': [int(x0), int(y0), int(x1), int(y1)]})
                a[y0:y1, [x0, x1 - 1]] = (0, 1, 0); a[[y0, y1 - 1], x0:x1] = (0, 1, 0)
        tallenna(a, os.path.join(D, f't-{n}-{s}.png'))
json.dump(out, open(os.path.join(D, 'ikkunat-ehdokkaat.json'), 'w'), indent=0); print('EHDOKKAITA', len(out))
