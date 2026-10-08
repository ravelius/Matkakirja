#!/usr/bin/env python3
# YÖVALOJEN VESIMASKI (Linssiseppä 9.10.2026; yövalot kehityskaupunkeihin, PT): Karttasepän vesimaskista (vesi-<id>-maski.png, 8 m,
# 0 = maa, 30 km) keskustan SIVU_M-ruutu kaupungin origon ympäriltä RGB-PNG:ksi (255 = vesi) Resources/Elava/vesi-<id>-maski.bytes
# (TextAsset, Texture2D.LoadImage). KaupunkiYovalot piirtää vedelle rantavalojen ja valaistujen maamerkkien heijastukset.
# Ajo: python3 tyokalut/yovalot_vesi.py <maski.json> <maski.png> <ulos.bytes>
import json, struct, sys, zlib

SIVU_M = 12288.0


def lue_png8(polku, w, h):
    b = open(polku, "rb").read(); i = 8; idat = b""
    while i < len(b):
        n = struct.unpack(">I", b[i:i + 4])[0]; t = b[i + 4:i + 8]
        if t == b"IDAT": idat += b[i + 8:i + 8 + n]
        i += 12 + n
    raaka = zlib.decompress(idat); ed = bytearray(w); rivit = []
    for y in range(h):
        o = y * (w + 1); f = raaka[o]; rv = bytearray(raaka[o + 1:o + 1 + w])
        if f == 1:
            for x in range(1, w): rv[x] = (rv[x] + rv[x - 1]) & 255
        elif f == 2:
            for x in range(w): rv[x] = (rv[x] + ed[x]) & 255
        elif f == 3:
            for x in range(w): rv[x] = (rv[x] + ((rv[x - 1] if x else 0) + ed[x]) // 2) & 255
        elif f == 4:
            for x in range(w):
                a = rv[x - 1] if x else 0; c = ed[x - 1] if x else 0; u = ed[x]; p = a + u - c
                pa, pb, pc = abs(p - a), abs(p - u), abs(p - c)
                rv[x] = (rv[x] + (a if pa <= pb and pa <= pc else u if pb <= pc else c)) & 255
        rivit.append(rv); ed = rv
    return rivit


def kirjoita_png(polku, w, h, rivi):
    raaka = bytearray()
    for y in range(h):
        raaka.append(0)
        for v in rivi(y): raaka += bytes((v, v, v))
    def pala(t, d): return struct.pack(">I", len(d)) + t + d + struct.pack(">I", zlib.crc32(t + d) & 0xffffffff)
    png = b"\x89PNG\r\n\x1a\n" + pala(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0)) + pala(b"IDAT", zlib.compress(bytes(raaka), 9)) + pala(b"IEND", b"")
    open(polku, "wb").write(png)


def main():
    j = json.load(open(sys.argv[1]))
    r, w, h = j["ruutu_m"], j["leveys"], j["korkeus"]
    rivit = lue_png8(sys.argv[2], w, h)
    n = int(SIVU_M / r)
    # Origo (ENU 0, 0) pikselissä: i = (0 − x0) / r, rivi = H − 1 − (0 − y0) / r.
    i0 = int(round(-j["kulma_enu"]["x"] / r)) - n // 2
    r0 = int(round(h - (-j["kulma_enu"]["y"] / r))) - n // 2
    vetta = 0
    def rivi(y):
        nonlocal vetta
        rv = rivit[r0 + y]; ulos = [255 if rv[i0 + x] > 0 else 0 for x in range(n)]
        vetta += sum(1 for v in ulos if v)
        return ulos
    kirjoita_png(sys.argv[3], n, n, rivi)
    print(f"{sys.argv[3]}: {n}×{n} ({r} m/px, {SIVU_M / 1000:.1f} km), vettä {100 * vetta / (n * n):.1f} %")


if __name__ == "__main__":
    main()
