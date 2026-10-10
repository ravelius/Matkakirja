#!/usr/bin/env python3
# YÖVALOJEN OSM-LAMPUT (Linssiseppä 10.10.2026; PT: yövalot junaan 174/175, ei lisämuistia pienellä muistilla): Karttasepän
# yovalot-<id>.json (OSM: katuvalot, valaistut tiet, sillat, rantavalot, kentät ja kohteet; sama ENU-origo kuin kehityskaupungilla)
# vesimaskin (vesi-<id>-maski.bytes, RGB, 8 m, 12 288 m) vapaisiin kanaviin. Sama RGBA32-tekstuuri kuin ennen → 0 Mt lisää.
#   R = vesi (ennallaan), G = 255 lamppu tässä solussa, B = lampun paikka solussa (x ylänelikko, y alanelikko, 0–15 → (v + 0,5) / 16;
#   y etelästä), A = valaistu alue (kenttä 255, valaistu kohde 150; 0 = ei).
# Lamput: katuvalot → rantavalot → valaistujen siltojen pisteet 20 m välein → valaistujen teiden pisteet 28 m välein; piste ohitetaan,
# jos lamppu on jo ±2 solun (16 m) päässä. Sarake = itä, rivi 0 = pohjoisreuna (PNG ylhäältä alas; LoadImage → v = 1 ylhäällä).
# Ajo: python3 tyokalut/yovalot_lamput.py <vesi-<id>-maski.bytes> <yovalot-<id>.json> <ulos.bytes>
import json, math, struct, sys, zlib

SIVU_M = 12288.0
TIE_VALI_M, SILTA_VALI_M, ESTO_SOLUT = 28.0, 20.0, 2
KENTTA, KOHDE = 255, 150


def lue_png_vesi(polku):
    b = open(polku, "rb").read(); w, h = struct.unpack(">II", b[16:24])
    assert b[24] == 8 and b[25] in (2, 6), "odotettiin 8-bittistä RGB- tai RGBA-PNG:tä (uusinta: R = vesi)"
    bp = 3 if b[25] == 2 else 4
    i = 8; idat = b""
    while i < len(b):
        n = struct.unpack(">I", b[i:i + 4])[0]
        if b[i + 4:i + 8] == b"IDAT": idat += b[i + 8:i + 8 + n]
        i += 12 + n
    raaka = zlib.decompress(idat); s = w * bp
    assert all(raaka[y * (s + 1)] == 0 for y in range(h)), "vain suodatin 0 (yovalot_vesi.py)"
    return w, h, bytearray(raaka[y * (s + 1) + 1 + x * bp] for y in range(h) for x in range(w))


def kirjoita_png_rgba(polku, w, h, r, g, b, a):
    raaka = bytearray()
    for y in range(h):
        raaka.append(0); o = y * w
        for x in range(w): raaka += bytes((r[o + x], g[o + x], b[o + x], a[o + x]))
    def pala(t, d): return struct.pack(">I", len(d)) + t + d + struct.pack(">I", zlib.crc32(t + d) & 0xffffffff)
    open(polku, "wb").write(b"\x89PNG\r\n\x1a\n" + pala(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 6, 0, 0, 0))
                            + pala(b"IDAT", zlib.compress(bytes(raaka), 9)) + pala(b"IEND", b""))


def main():
    w, h, vesi = lue_png_vesi(sys.argv[1])
    assert w == h
    n, solu = w, SIVU_M / w
    j = json.load(open(sys.argv[2])); k = j["kerrokset"]
    g, b, a = bytearray(n * n), bytearray(n * n), bytearray(n * n)

    def solusta(e, p):   # ENU (m) → (sarake, rivi, osa x, osa y etelästä) tai None
        fx, fy = e / solu + n / 2, p / solu + n / 2
        x, ys = int(math.floor(fx)), int(math.floor(fy))
        if not (0 <= x < n and 0 <= ys < n): return None
        return x, n - 1 - ys, fx - x, fy - ys

    def lahella(x, r):
        for dy in range(-ESTO_SOLUT, ESTO_SOLUT + 1):
            for dx in range(-ESTO_SOLUT, ESTO_SOLUT + 1):
                xx, rr = x + dx, r + dy
                if 0 <= xx < n and 0 <= rr < n and g[rr * n + xx]: return True
        return False

    def lamppu(e, p, esto):
        s = solusta(e, p)
        if s is None: return 0
        x, r, ox, oy = s
        if g[r * n + x] or (esto and lahella(x, r)): return 0
        g[r * n + x] = 255; b[r * n + x] = (min(15, int(ox * 16)) << 4) | min(15, int(oy * 16))
        return 1

    def viivalle(p, vali):
        m = 0
        for (e0, n0), (e1, n1) in zip(p, p[1:]):
            pit = math.hypot(e1 - e0, n1 - n0); kpl = max(1, int(pit // vali))
            for i in range(kpl): t = (i + 0.5) / kpl; m += lamppu(e0 + (e1 - e0) * t, n0 + (n1 - n0) * t, True)
        return m

    def tayta(rengas, arvo):
        xs = [q[0] for q in rengas]; ys = [q[1] for q in rengas]
        for rv in range(max(0, int((min(ys) / solu) + n / 2)), min(n, int((max(ys) / solu) + n / 2) + 1)):
            yk = (rv + 0.5 - n / 2) * solu; leik = []
            for (e0, n0), (e1, n1) in zip(rengas, rengas[1:] + rengas[:1]):
                if (n0 <= yk) != (n1 <= yk): leik.append(e0 + (yk - n0) * (e1 - e0) / (n1 - n0))
            leik.sort(); r = n - 1 - rv
            for i in range(0, len(leik) - 1, 2):
                for x in range(max(0, int(math.ceil(leik[i] / solu + n / 2 - 0.5))), min(n, int(leik[i + 1] / solu + n / 2 + 0.5))):
                    a[r * n + x] = max(a[r * n + x], arvo)

    maara = {"katuvalot": sum(lamppu(*q["piste"], False) for q in k.get("katuvalot", []))}
    maara["rantavalot"] = sum(lamppu(*q["piste"], True) for q in k.get("rantavalot", []))
    maara["sillat"] = sum(viivalle(q["p"], SILTA_VALI_M) for q in k.get("sillat_valaistu", []) if len(q.get("p", [])) > 1)
    maara["tiet"] = sum(viivalle(q["p"], TIE_VALI_M) for q in k.get("valaistut_tiet", []) if len(q.get("p", [])) > 1)
    for q in k.get("valaistut_kentat", []):
        if len(q.get("rengas", [])) > 2: tayta(q["rengas"], KENTTA)
    for q in k.get("valaistut_kohteet", []):
        if len(q.get("rengas", [])) > 2: tayta(q["rengas"], KOHDE)
    kirjoita_png_rgba(sys.argv[3], n, n, vesi, g, b, a)
    alue = sum(1 for v in a if v)
    print(f"{sys.argv[3]}: {n}×{n} ({solu:g} m/px), lamppuja {sum(maara.values())} {maara}, valaistua aluetta {alue * solu * solu / 1e6:.2f} km²")


if __name__ == "__main__":
    main()
