#!/usr/bin/env python3
# ELÄVÄ KAUPUNKI, AINEISTOPAKETTI (Linssiseppä 8.10.2026; suunnitelma docs/raportit/pallo-elava-kaupunki-20261008.md, B1 + B2).
# Karttasepän OSM-aineistosta (kohteet-<id>.json: lautat ja vesialueet, reitit-<id>.json: joet ja kanavat) ja omasta vesipinnasta
# (vesi/<id>-6m.json + .bytes: kärkien z ENU:ssa, maan kaarevuus mukana) yksi pieni json Resources/Elava/elava-<id>.json:
#   origo = vesipinnan origo (sama kuin KaupunkiVesi), reitit [{tyyppi, nimi, kiertava, p: [[x itä, z pohjoinen, y vesi], …]}]
#   tihennettynä VaIiM välein (y = lähimmän vesikärjen korkeus; EI Googlen laatoista, Map Tiles C4), parvet [{x, z, sade, …}].
# OSM-aineiston origo voi poiketa vesipinnan origosta: pisteet muunnetaan ECEF:n kautta.
# Krediitti: © OpenStreetMap contributors (ODbL); vesi lisäksi ESA WorldCover 2021 (CC BY 4.0).
# Ajo: python3 tyokalut/elava_kaupunki.py <kohde> <osm-kansio> <vesi-kansio> <ulos.json>
import json, math, struct, sys

VALI_M = 20.0          # reittipisteiden tihennys
SADE_M = 9000.0        # reitit tämän säteen sisältä (pysähdykset ja lennot)
MIN_PITUUS_M = 300.0   # lyhyemmät lauttapätkät (laiturien yhdysviivat) pois
KANAVA_SADE_M = 6000.0
A, F = 6378137.0, 1 / 298.257223563
E2 = F * (2 - F)


def ecef(lat, lon, h):
    la, lo = math.radians(lat), math.radians(lon)
    n = A / math.sqrt(1 - E2 * math.sin(la) ** 2)
    return ((n + h) * math.cos(la) * math.cos(lo), (n + h) * math.cos(la) * math.sin(lo), (n * (1 - E2) + h) * math.sin(la))


def enu_akselit(lat, lon):
    la, lo = math.radians(lat), math.radians(lon)
    e = (-math.sin(lo), math.cos(lo), 0.0)
    n = (-math.sin(la) * math.cos(lo), -math.sin(la) * math.sin(lo), math.cos(la))
    u = (math.cos(la) * math.cos(lo), math.cos(la) * math.sin(lo), math.sin(la))
    return e, n, u


def muunnin(o1, o2):
    """ENU origossa o1 (lat, lon, h = 0) → ENU origossa o2."""
    p1, p2 = ecef(o1[0], o1[1], 0), ecef(o2[0], o2[1], 0)
    a1, a2 = enu_akselit(*o1), enu_akselit(*o2)

    def m(x, y, z=0.0):
        w = [p1[i] + a1[0][i] * x + a1[1][i] * y + a1[2][i] * z - p2[i] for i in range(3)]
        return tuple(sum(w[i] * a2[k][i] for i in range(3)) for k in range(3))
    return m


def tyyppi(nimi, pituus):
    n = (nimi or "").lower()
    if "djurgårdsfärjan" in n: return "lautta"
    if "pendelbåt" in n: return "pendelbat"
    if "waxholm" in n: return "saaristolaiva"
    if "s/s" in n or "ångfartyg" in n: return "hoyrylaiva"
    if "hop-on" in n: return "kiertoajelu"
    if "ekerö" in n: return "autolautta"
    if not n and pituus <= 4000: return "pikkulautta"
    if n: return "pikkulautta"
    return None   # nimettömät pitkät (risteilyalukset) myöhemmin


def tihenna(p):
    ulos = [p[0]]
    for a, b in zip(p, p[1:]):
        d = math.dist(a, b)
        k = max(1, int(math.ceil(d / VALI_M)))
        for i in range(1, k + 1):
            t = i / k
            ulos.append((a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t))
    return ulos


def pituus(p):
    return sum(math.dist(a, b) for a, b in zip(p, p[1:]))


def leikkaa(p, r):
    """Polylinjan osat säteen r sisällä (pisteittäin, tihennetyltä viivalta)."""
    osat, nyt = [], []
    for q in p:
        if math.hypot(q[0], q[1]) <= r: nyt.append(q)
        elif nyt: osat.append(nyt); nyt = []
    if nyt: osat.append(nyt)
    return [o for o in osat if len(o) >= 2]


class Vesi:
    def __init__(self, jsonp, bytesp):
        j = json.load(open(jsonp))
        self.origo = (j["origo"]["lat"], j["origo"]["lon"])
        self.krediitti = j.get("krediitti")
        b = open(bytesp, "rb").read()
        k = j["karkia"]
        self.ruutu = 30.0
        self.hila = {}
        for i, (x, y, z, d) in enumerate(struct.iter_unpack("<4f", b[:k * 16])):
            self.hila.setdefault((int(x // self.ruutu), int(y // self.ruutu)), []).append((x, y, z, d))

    def korkeus(self, x, y):
        """Lähimmän vesikärjen z ja etäisyys siihen (m); None, jos ~200 m:n sisällä ei ole kärkeä (verkko on avovedellä harva)."""
        cx, cy = int(x // self.ruutu), int(y // self.ruutu)
        paras = None
        for r in range(0, 7):
            for i in range(cx - r, cx + r + 1):
                for j in range(cy - r, cy + r + 1):
                    if max(abs(i - cx), abs(j - cy)) != r: continue
                    for (vx, vy, vz, vd) in self.hila.get((i, j), ()):
                        e = (vx - x) ** 2 + (vy - y) ** 2
                        if paras is None or e < paras[0]: paras = (e, vz, vd)
            if paras is not None and r >= 1: break
        return None if paras is None else (paras[1], math.sqrt(paras[0]), paras[2])


def main():
    kohde, osm, vesik, ulos = sys.argv[1:5]
    vesi = Vesi(f"{vesik}/{kohde}-6m.json", f"{vesik}/{kohde}-6m.bytes")
    kohteet = json.load(open(f"{osm}/kohteet-{kohde}.json"))
    reitit = json.load(open(f"{osm}/reitit-{kohde}.json"))
    o_osm = (kohteet["origo"]["lat"], kohteet["origo"]["lon"])
    m = muunnin(o_osm, vesi.origo)
    tulos, ohi = [], {"maalla": 0}

    def lisaa(t, nimi, p, kiertava=False):
        p = [m(x, y)[:2] for x, y in p]
        for osa in leikkaa(tihenna(p), SADE_M):
            if pituus(osa) < MIN_PITUUS_M: continue
            pisteet = []
            for x, y in osa:
                k = vesi.korkeus(x, y)
                pisteet.append([round(x, 1), round(y, 1), None if k is None else round(k[0], 2)])
            tunnetut = [q[2] for q in pisteet if q[2] is not None]
            if len(tunnetut) < len(pisteet) * 0.6: ohi["maalla"] += 1; continue
            # Laiturin päät ja kapeat kohdat: puuttuva korkeus lähimmästä tunnetusta.
            ed = None
            for q in pisteet:
                if q[2] is None: q[2] = ed
                else: ed = q[2]
            ed = None
            for q in reversed(pisteet):
                if q[2] is None: q[2] = ed
                else: ed = q[2]
            tulos.append({"tyyppi": t, "nimi": nimi, "kiertava": kiertava, "p": pisteet})

    for l in kohteet["kerrokset"].get("lautat", []):
        t = tyyppi(l.get("n"), pituus(l["p"]))
        if t: lisaa(t, l.get("n"), l["p"])
    for w in reitit["kerrokset"].get("vesivaylat", []):
        if min(math.hypot(*q) for q in w["p"]) > KANAVA_SADE_M: continue
        lisaa("vene", w.get("n"), w["p"])

    # Lokkiparvet: nimetyt vesialueet keskustan lähellä (rengas: keskipiste) ja reittien varret satamissa.
    parvet = []
    for a in kohteet["kerrokset"].get("vesialueet", []):
        piste = a.get("piste")
        pts = a.get("rengas") or ([piste] if piste else None)
        if not pts: continue
        cx = sum(q[0] for q in pts) / len(pts); cy = sum(q[1] for q in pts) / len(pts)
        x, y, _ = m(cx, cy)
        if math.hypot(x, y) > 6000: continue
        k = vesi.korkeus(x, y)
        if k is None or k[1] > 200: continue
        if any(math.hypot(x - q["x"], y - q["z"]) < 500 for q in parvet): continue   # sama vesi kahdesti
        koko = max(math.dist(q, (cx, cy)) for q in pts) if len(pts) > 2 else 350   # nimetty piste: selkä tai lahti
        if koko < 120: continue   # lammet ja suihkualtaat pois
        parvet.append({"nimi": a.get("n"), "x": round(x, 1), "z": round(y, 1), "vesi": round(k[0], 2),
                       "alue": round(min(400, koko * 0.8)), "maara": 10 if koko > 300 else 6})
    json.dump({"kohde": kohde, "origo": {"lat": vesi.origo[0], "lon": vesi.origo[1], "ellipsoidikorkeus_m": 0},
               "koordinaatit": "ENU metreinä origossa [x itä, z pohjoinen, y vesipinnan korkeus]; y omasta vesipinnasta, ei Googlen laatoista",
               "krediitti": "© OpenStreetMap contributors (ODbL); vesi: ESA WorldCover 2021 (CC BY 4.0)",
               "reitit": tulos, "parvet": parvet}, open(ulos, "w"), ensure_ascii=False, separators=(",", ":"))
    from collections import Counter
    print(f"{kohde}: {len(tulos)} reittiä {dict(Counter(r['tyyppi'] for r in tulos))}, {len(parvet)} parvea, ohi {ohi}")


if __name__ == "__main__":
    main()
