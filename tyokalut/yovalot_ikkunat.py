#!/usr/bin/env python3
# YÖVALOJEN IKKUNAT (Linssiseppä 10.10.2026; PT: yövalot 174/175, muistibudjetissa): Karttasepän yovalot-ikkunat-<id>.png (OSM-rakennukset,
# 1536², 8 m, 12 288 m, origo keskellä, rivi 0 = pohjoinen; R = valaistujen ikkunoiden osuus klo 21–24, G = värilämpö 2000–6500 K,
# 1 px dilaatio) → yksi tavu per solu (ylänelikko = osuus 0–15, alanelikko = värilämpö 0–15), rivit ETELÄSTÄ (Texture2D.LoadRawTextureData,
# R8, rivi 0 = v 0), gzip → Resources/Elava/ikkunat-<id>.bytes. Ajossa 2,36 Mt GPU:ssa (R8, ei mippejä), ei RGBA-välivaihetta.
# Ajo: python3 tyokalut/yovalot_ikkunat.py <yovalot-ikkunat-<id>.png> <ulos.bytes>
import gzip, struct, sys, zlib


def lue_png(polku):
    b = open(polku, "rb").read(); w, h = struct.unpack(">II", b[16:24])
    assert b[24] == 8 and b[25] in (2, 6), "8-bittinen RGB tai RGBA"
    bp = 3 if b[25] == 2 else 4
    i = 8; idat = b""
    while i < len(b):
        n = struct.unpack(">I", b[i:i + 4])[0]
        if b[i + 4:i + 8] == b"IDAT": idat += b[i + 8:i + 8 + n]
        i += 12 + n
    raaka = zlib.decompress(idat); s = w * bp; ed = bytearray(s); rivit = []
    for y in range(h):
        o = y * (s + 1); f = raaka[o]; rv = bytearray(raaka[o + 1:o + 1 + s])
        if f == 1:
            for x in range(bp, s): rv[x] = (rv[x] + rv[x - bp]) & 255
        elif f == 2:
            for x in range(s): rv[x] = (rv[x] + ed[x]) & 255
        elif f == 3:
            for x in range(s): rv[x] = (rv[x] + ((rv[x - bp] if x >= bp else 0) + ed[x]) // 2) & 255
        elif f == 4:
            for x in range(s):
                a = rv[x - bp] if x >= bp else 0; c = ed[x - bp] if x >= bp else 0; u = ed[x]; p = a + u - c
                pa, pb, pc = abs(p - a), abs(p - u), abs(p - c)
                rv[x] = (rv[x] + (a if pa <= pb and pa <= pc else u if pb <= pc else c)) & 255
        rivit.append(rv); ed = rv
    return w, h, bp, rivit


def main():
    w, h, bp, rivit = lue_png(sys.argv[1])
    ulos = bytearray(w * h); rakennuksia = 0
    for y in range(h):
        rv = rivit[h - 1 - y]   # rivi 0 = etelä (v = 0)
        for x in range(w):
            r, g = rv[x * bp], rv[x * bp + 1]
            if r == 0: continue
            rakennuksia += 1
            ulos[y * w + x] = (max(1, round(r / 255 * 15)) << 4) | round(g / 255 * 15)
    with gzip.open(sys.argv[2], "wb", compresslevel=9) as f: f.write(bytes(ulos))
    print(f"{sys.argv[2]}: {w}×{h} R8, rakennussoluja {100 * rakennuksia / (w * h):.1f} %")


if __name__ == "__main__":
    main()
