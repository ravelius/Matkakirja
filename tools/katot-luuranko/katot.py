# KS 9.11.2026 (PT 23.3x, kaupungit koodilla osa A, koe): luurankokatot talopaloihin.
# Kirjasto bpypolyskel (GPL-3, vain työkalussa, ei peliin) laskee rangan Blenderissä (luuranko_blender.py); tämä tiedosto:
#  1) laajenna(): naapurin puoleiset reunat (palomuurit) siirretään ulos, jolloin niille ei tule rinnettä (painotetun rangan korvike),
#  2) katto(): rangan kasvot leikataan alkuperäiseen pohjaan, korkeus profiilista (auma, harja, mansardi), päädyt palomuureille,
#  3) tasakatto reunuksella varakattona.
# Koordinaatit: (x itä, y pohjoinen) metreinä; ulkorengas CCW, reiät CW (kuten tee-palat.py:n r ja reiät).
import math
import numpy as np

TLIITOKSET = True
# KS 10.11. koe4 (rypyt): rangan syöte yksinkertaistetaan vapailla reunoilla ULOSPÄIN (kärki pois vain, jos uusi jänne kulkee sen
# ulkopuolelta ≤ YKSINK m). Katto leikataan silti alkuperäiseen pohjaan; räystään koholle jäävä osa saa seinäkaistan (päädyt
# myös vapaille reunoille). 0 = pois (koe3 ennallaan).
import os
YKSINK = float(os.environ.get('KATOT_YKSINK', '0'))
KAKSIP = os.environ.get('KATOT_KAKSIP', '0') == '1'   # koe5: jänne saa kulkea myös sisäpuolelta, väli = tasainen reunus (z 0)
# KS 10.11. koe6 (PT 03.0x, koe5:n raot): KATOT_KOSKETUS=1 → yksinkertaistus vain reunoilla, joilla ei ole MITÄÄN naapuria
# (myös eri korkuinen; tee-palat asettaa KOSKETUS = renkaittain [reunalla naapuri]). Koe5:ssä matalamman naapurin vieressä
# reuna oli vapaa → katto siirtyi ulospäin ja naapurin katon yläpuolelle jäi tumma seinäkaistakiila (pelissä rako).
KOSKETUS_PAALLA = os.environ.get('KATOT_KOSKETUS', '0') == '1'
KOSKETUS = None
TAYTE = []   # viimeisimmän laajenna_kaikki-kutsun reunuskaistaleet [(x, y), ...]
TAN = lambda a: math.tan(math.radians(a))
PROFIILI = dict(auma=35.0, harja=40.0, mansardi_ala=72.0, mansardi_yla=20.0)
JYRKKA = math.cos(math.radians(45.0))  # normaalin y alle tämän = rinne (laji 128), muuten tasainen (0)


def ala(r):
    return sum(r[i][0] * r[(i + 1) % len(r)][1] - r[(i + 1) % len(r)][0] * r[i][1] for i in range(len(r))) / 2


def _risti(o, a, b):
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])


def _leikkaavat(p1, p2, q1, q2):
    d1 = _risti(q1, q2, p1); d2 = _risti(q1, q2, p2); d3 = _risti(p1, p2, q1); d4 = _risti(p1, p2, q2)
    return ((d1 > 1e-9 and d2 < -1e-9) or (d1 < -1e-9 and d2 > 1e-9)) and ((d3 > 1e-9 and d4 < -1e-9) or (d3 < -1e-9 and d4 > 1e-9))


def itseleikkaa(renkaat):
    seg = []
    for k, r in enumerate(renkaat):
        n = len(r)
        for i in range(n): seg.append((k, i, n, r[i], r[(i + 1) % n]))
    for a in range(len(seg)):
        ka, ia, na, p1, p2 = seg[a]
        for b in range(a + 1, len(seg)):
            kb, ib, nb, q1, q2 = seg[b]
            if ka == kb and (abs(ia - ib) <= 1 or abs(ia - ib) == na - 1): continue
            if max(p1[0], p2[0]) < min(q1[0], q2[0]) or max(q1[0], q2[0]) < min(p1[0], p2[0]): continue
            if max(p1[1], p2[1]) < min(q1[1], q2[1]) or max(q1[1], q2[1]) < min(p1[1], p2[1]): continue
            if _leikkaavat(p1, p2, q1, q2): return True
    return False


def laajenna(r, naapuri, D):
    """Naapurireunat siirretään D metriä ulos (oikea normaali = poispäin talosta sekä ulkorenkaalla että reiällä)."""
    n = len(r); ot = []
    for i in range(n):
        a, b = r[i], r[(i + 1) % n]; l = math.dist(a, b) or 1e-9; t = ((b[0] - a[0]) / l, (b[1] - a[1]) / l); ot.append((t, (t[1], -t[0])))
    ulos = []
    for i in range(n):
        (t0, n0), (t1, n1) = ot[i - 1], ot[i]; d0 = D if naapuri[i - 1] else 0.0; d1 = D if naapuri[i] else 0.0; v = r[i]
        if d0 == 0.0 and d1 == 0.0: ulos.append(tuple(v)); continue
        c = t0[0] * t1[1] - t0[1] * t1[0]
        a_ = (v[0] + n0[0] * d0, v[1] + n0[1] * d0); b_ = (v[0] + n1[0] * d1, v[1] + n1[1] * d1)
        if abs(c) < 0.05:
            if abs(d0 - d1) < 1e-9: ulos.append(a_)
            else: ulos.append(a_); ulos.append(b_)  # suora jatkuu, toinen puoli naapuria: porras
            continue
        s = ((b_[0] - a_[0]) * t1[1] - (b_[1] - a_[1]) * t1[0]) / c; p = (a_[0] + t0[0] * s, a_[1] + t0[1] * s)
        if math.dist(p, v) > 3 * D: ulos.append(a_); ulos.append(b_)  # terävä kulma: viiste
        else: ulos.append(p)
    # poista peräkkäiset lähes samat kärjet
    siisti = []
    for p in ulos:
        if not siisti or math.dist(p, siisti[-1]) > 1e-3: siisti.append(p)
    if len(siisti) > 1 and math.dist(siisti[0], siisti[-1]) <= 1e-3: siisti.pop()
    return siisti


def laajenna_kaikki(renkaat, naapurit, D):
    """Palauttaa laajennetut renkaat tai None, jos tulos on rikki (itseleikkaus tai suunta kääntyi)."""
    TAYTE[:] = []
    # Kapea valokuilu tai lovi naapurireunojen välissä umpeutuu laajennuksessa: ensin pienempi siirto, sitten lyhyet naapurireunat rinteellisiksi.
    lyhyet = [[nb[i] and math.dist(r[i], r[(i + 1) % len(r)]) >= 3.0 for i in range(len(r))] for r, nb in zip(renkaat, naapurit)]
    for nbs, d in ((naapurit, D), (naapurit, D * 0.6), (naapurit, D * 0.35), (naapurit, 2.0), (naapurit, 1.2), (lyhyet, 2.0), (lyhyet, 1.2)):
        u = [laajenna(r, nb, d) for r, nb in zip(renkaat, nbs)]
        if any(len(q) < 3 for q in u): continue
        if ala(u[0]) <= 0 or any(ala(q) >= 0 for q in u[1:]): continue
        if itseleikkaa(u): continue
        if YKSINK > 0:
            tt = []; ks = KOSKETUS if (KOSKETUS_PAALLA and KOSKETUS is not None and len(KOSKETUS) == len(renkaat)) else [[False] * len(r) for r in renkaat]
            y = [yksinkertaista(q, r, [a_ or b_ for a_, b_ in zip(nb, kk)], YKSINK, tt) for q, r, nb, kk in zip(u, renkaat, nbs, ks)]
            if all(len(q) >= 3 for q in y) and ala(y[0]) > 0 and all(ala(q) < 0 for q in y[1:]) and not itseleikkaa(y): u = y; TAYTE[:] = tt
            else: TAYTE[:] = []
        return u, d, nbs
    return None, 0.0, naapurit


def yksinkertaista(u, r, nb, tol, tayte=None):
    """u: laajennettu rengas, r: alkuperäinen, nb: r:n naapuriliput. Poistaa u:sta kärjet, jotka ovat alkuperäisiä vapaita kärkiä
    (kumpikaan viereinen reuna ei naapuria), kun uusi jänne kulkee kaikkien poistettujen ulkopuolelta (ne jäävät vasemmalle =
    talon puolelle) enintään tol päässä. Ulkorengas CCW ja reiät CW: talo on molemmissa vasemmalla."""
    m = len(r); vap = {(round(r[i][0], 6), round(r[i][1], 6)) for i in range(m) if not nb[i - 1] and not nb[i]}
    n = len(u); pois = [(round(p[0], 6), round(p[1], 6)) in vap for p in u]; alk = {_rk(q, 6) for q in r}  # sisäjänne vain alkuperäisten kärkien välille
    if not any(pois): return list(u)
    if all(pois): pois[max(range(n), key=lambda i: (u[i][0], u[i][1]))] = False  # ankkuri: ääripiste (kupera, pysyy aina)
    s0 = pois.index(False); jarj = u[s0:] + u[:s0]; pj = pois[s0:] + pois[:s0]
    ulos = [jarj[0]]; a = 0
    while a < n:
        j = a + 1
        while j < n and pj[j]:
            b = jarj[(j + 1) % n]; A = jarj[a]; ok = True; L = math.dist(A, b) or 1e-9
            cs = [((b[0] - A[0]) * (jarj[k][1] - A[1]) - (b[1] - A[1]) * (jarj[k][0] - A[0])) / L for k in range(a + 1, j + 1)]
            if not (all(-1e-9 <= c <= tol for c in cs) or (KAKSIP and tayte is not None and _rk(A, 6) in alk and _rk(b, 6) in alk and all(-tol <= c <= 1e-9 for c in cs))): ok = False
            if not ok: break
            j += 1
        if j < n: ulos.append(jarj[j])
        if j > a + 1 and tayte is not None:
            ketju = jarj[a:j + 1] if j < n else jarj[a:] + [jarj[0]]
            A = ketju[0]; b = ketju[-1]; L = math.dist(A, b) or 1e-9
            if any(((b[0] - A[0]) * (v[1] - A[1]) - (b[1] - A[1]) * (v[0] - A[0])) / L < -1e-6 for v in ketju[1:-1]): tayte.append([tuple(v) for v in ketju])
        a = j
    return ulos


# --- kolmiointi ja leikkaus ---
def korvamuoto(p):
    """Yksinkertaisen monikulmion korvaleikkaus; p CCW-suuntaan käännettynä. Palauttaa kolmiot pisteinä tai None."""
    p = list(p)
    if ala([(q[0], q[1]) for q in p]) < 0: p.reverse()
    idx = list(range(len(p))); tris = []; vahti = 0
    while len(idx) > 3 and vahti < 10000:
        vahti += 1; loyty = False; m = len(idx)
        for k in range(m):
            i0, i1, i2 = idx[k - 1], idx[k], idx[(k + 1) % m]; a, b, c = p[i0], p[i1], p[i2]
            cr = _risti(a, b, c)
            if cr <= 1e-12:
                if abs(cr) <= 1e-12 and m > 3:  # kollineaarinen kärki pois
                    idx.pop(k); loyty = True; break
                continue
            if any(j not in (i0, i1, i2) and _risti(a, b, p[j]) >= -1e-12 and _risti(b, c, p[j]) >= -1e-12 and _risti(c, a, p[j]) >= -1e-12 for j in idx): continue
            tris.append((a, b, c)); idx.pop(k); loyty = True; break
        if not loyty: return None
    if len(idx) == 3:
        a, b, c = (p[i] for i in idx)
        if _risti(a, b, c) > 1e-12: tris.append((a, b, c))
    return tris


def leikkaa_konveksiin(kohde, leikkaaja):
    """Sutherland–Hodgman: kohde (lista (x,y,...)) leikataan konveksiin CCW-monikulmioon (x,y)."""
    out = list(kohde)
    n = len(leikkaaja)
    for i in range(n):
        if not out: break
        a, b = leikkaaja[i], leikkaaja[(i + 1) % n]; inp = out; out = []
        for j in range(len(inp)):
            p, q = inp[j - 1], inp[j]; sp = _risti(a, b, p); sq = _risti(a, b, q)
            if sq >= -1e-9:
                if sp < -1e-9: out.append(_lerp(p, q, sp / (sp - sq)))
                out.append(q)
            elif sp >= -1e-9: out.append(_lerp(p, q, sp / (sp - sq)))
    return out


def _lerp(p, q, t):
    return tuple(p[k] + (q[k] - p[k]) * t for k in range(len(p)))


def leikkaa_arvo(poly, k, raja, yli):
    """Pidä osa, jossa poly[i][k] >= raja (yli) tai <= raja."""
    out = []; s = 1 if yli else -1
    for j in range(len(poly)):
        p, q = poly[j - 1], poly[j]; sp = s * (p[k] - raja); sq = s * (q[k] - raja)
        if sq >= 0:
            if sp < 0: out.append(_lerp(p, q, sp / (sp - sq)))
            out.append(q)
        elif sp >= 0: out.append(_lerp(p, q, sp / (sp - sq)))
    return out


def taso(pts):
    """d = a x + b y + c kasvon kärjistä (pienin neliösumma 3 parhaasta)."""
    n = len(pts); paras = None
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                a, b, c = pts[i], pts[j], pts[k]; det = (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])
                if paras is None or abs(det) > abs(paras[0]): paras = (det, a, b, c)
                if abs(det) > 1.0: break
            if paras and abs(paras[0]) > 1.0: break
        if paras and abs(paras[0]) > 1.0: break
    det, a, b, c = paras
    if abs(det) < 1e-9: return None
    A = ((b[2] - a[2]) * (c[1] - a[1]) - (c[2] - a[2]) * (b[1] - a[1])) / det
    B = ((b[0] - a[0]) * (c[2] - a[2]) - (c[0] - a[0]) * (b[2] - a[2])) / det
    return (A, B, a[2] - A * a[0] - B * a[1])


# --- profiilit: korkeus räystään yläpuolella etäisyyden d funktiona (paloittain lineaarinen) ---
def profiili(muoto, n):
    """Palauttaa taitekohdat [(d, z), ...]; viimeisen jälkeen z vakio."""
    if muoto == 'mansardi':
        z1 = min(n - 0.5, max(2.0, 0.7 * n)); d1 = z1 / TAN(PROFIILI['mansardi_ala']); d2 = d1 + (n - z1) / TAN(PROFIILI['mansardi_yla'])
        return [(0.0, 0.0), (d1, z1), (d2, n)]
    kulma = PROFIILI['harja'] if muoto == 'harja' else PROFIILI['auma']
    return [(0.0, 0.0), (n / TAN(kulma), n)]


def _z(prof, d):
    if d <= prof[0][0]: return prof[0][1]
    for (d0, z0), (d1, z1) in zip(prof, prof[1:]):
        if d <= d1: return z0 + (z1 - z0) * (d - d0) / ((d1 - d0) or 1e-9)
    return prof[-1][1]


def sisalla_pohja(renkaat, p, tol=1e-3):
    """Piste pohjassa (ulkorengas, ei reiässä); reunalla oleva lasketaan sisään."""
    p = (p[0], p[1])
    for r in renkaat:
        m = len(r)
        for i in range(m):
            a, b = r[i], r[(i + 1) % m]; l2 = (b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2 or 1e-18
            u = max(0.0, min(1.0, ((p[0] - a[0]) * (b[0] - a[0]) + (p[1] - a[1]) * (b[1] - a[1])) / l2))
            if math.dist(p, (a[0] + u * (b[0] - a[0]), a[1] + u * (b[1] - a[1]))) <= tol: return True
    def pip(r):
        c = False; m = len(r)
        for i in range(m):
            a, b = r[i], r[i - 1]
            if (a[1] > p[1]) != (b[1] > p[1]) and p[0] < (b[0] - a[0]) * (p[1] - a[1]) / (b[1] - a[1]) + a[0]: c = not c
        return c
    return pip(renkaat[0]) and not any(pip(h) for h in renkaat[1:])


def katto(alkup, naapurit, kasvot, muoto, n, pohja_tris, tayte=None):
    """alkup: alkuperäiset renkaat; naapurit: reunaliput (True = päätyseinä, ei rinnettä); kasvot: rangan kasvot
    [{reuna, p:[[x,y,d]...]}] laajennetuista renkaista; pohja_tris: alkuperäisen pohjan kolmiot [(a,b,c)] (x,y).
    Palauttaa (kolmiot, paadyt, peitto): kolmiot [(p0,p1,p2) (x,y,z yli räystään), laji, uv3]; paadyt [(p,q,zp,zq)]."""
    prof = profiili(muoto, n); rajat = [d for d, _ in prof[1:]]
    kasvo_id = []
    st = []  # rangan kolmiot: (kolmio 2D, taso, reunan alku, reunan suunta, laatikko, leikattava)
    for f in kasvot:
        pts = f['p']
        if len(pts) < 3: continue
        tz = taso(pts)
        if tz is None: continue
        a = pts[0]; b = pts[1]; l = math.dist(a[:2], b[:2]) or 1e-9; t = ((b[0] - a[0]) / l, (b[1] - a[1]) / l)
        tr = korvamuoto([(q[0], q[1]) for q in pts])
        if tr is None: return None
        # Vain naapurireunan laajennukseen ulottuva kasvo leikataan pohjaan; muut sellaisenaan (vähemmän kolmioita).
        leik = any(not sisalla_pohja(alkup, q) for q in pts) or any(not sisalla_pohja(alkup, ((pts[i][0] + pts[i - 1][0]) / 2, (pts[i][1] + pts[i - 1][1]) / 2)) for i in range(len(pts)))
        for tri in tr:
            xs = [q[0] for q in tri]; ys = [q[1] for q in tri]
            st.append((tri, tz, (a[0], a[1]), t, (min(xs), max(xs), min(ys), max(ys)), leik, len(kasvo_id)))
        kasvo_id.append(1)
    pt = []
    pohjat = None
    if len(alkup) == 1:
        tk = korvamuoto(alkup[0])
        if tk is not None and abs(sum(abs(_risti(*q)) for q in tk) / 2 - abs(ala(alkup[0]))) <= 1e-6 * max(1.0, abs(ala(alkup[0]))): pohjat = konveksit(tk)
    if pohjat is None: pohjat = konveksit(pohja_tris)
    for ptri in pohjat:
        pt.append((ptri, (min(q[0] for q in ptri), max(q[0] for q in ptri), min(q[1] for q in ptri), max(q[1] for q in ptri))))
    kolmiot = []; pinta = 0.0
    def kasittele(osa, A, B, C, a0, t, fi):
        nonlocal pinta
        osa = [(p[0], p[1], max(0.0, A * p[0] + B * p[1] + C)) for p in osa]
        viipaleet = []; jaljella = osa
        for si, r_ in enumerate(rajat):
            ala_osa = leikkaa_arvo(jaljella, 2, r_, False)
            if len(ala_osa) >= 3: viipaleet.append((si, ala_osa))
            jaljella = leikkaa_arvo(jaljella, 2, r_, True)
            if len(jaljella) < 3: break
        if len(jaljella) >= 3: viipaleet.append((len(rajat), jaljella))
        for si, v in viipaleet:
            ar = ala([(p[0], p[1]) for p in v])
            if abs(ar) < 1e-5: continue
            pinta += abs(ar)
            p3 = [(p[0], p[1], _z(prof, p[2])) for p in v]
            # Newell: normaali maailman akseleissa (x, korkeus, pohjoinen) = (q0, q2, q1)
            wx = wy = wz = 0.0
            for k in range(len(p3)):
                c0 = p3[k]; c1 = p3[(k + 1) % len(p3)]; X0, Y0, Z0 = c0[0], c0[2], c0[1]; X1, Y1, Z1 = c1[0], c1[2], c1[1]
                wx += (Y0 - Y1) * (Z0 + Z1); wy += (Z0 - Z1) * (X0 + X1); wz += (X0 - X1) * (Y0 + Y1)
            l = math.sqrt(wx * wx + wy * wy + wz * wz)
            if l < 1e-9: continue
            wx, wy, wz = wx / l, wy / l, wz / l
            if wy < 0: wx, wy, wz = -wx, -wy, -wz
            laji = 128 if wy < JYRKKA else 0
            uv = []
            for q in p3:
                if laji == 128:
                    u = (q[0] - a0[0]) * t[0] + (q[1] - a0[1]) * t[1]; dd = abs((q[0] - a0[0]) * t[1] - (q[1] - a0[1]) * t[0])
                    uv.append((u, math.hypot(dd, q[2])))
                else: uv.append((0.0, 0.0))
            # ylin viipale (z vakio) on kaikille kasvoille sama vaakataso: yksi ryhmä, jotta kasvojen rajat eivät pilko sitä
            kolmiot.append((p3, (wx, wy, wz), laji, uv, (-1, si) if si == len(rajat) and laji == 0 else (fi, si)))
    for tri, (A, B, C), a0, t, sb, leik, fi in st:
        if not leik: kasittele(list(tri), A, B, C, a0, t, fi); continue
        for ptri, bx in pt:
            if sb[1] < bx[0] - 1e-6 or sb[0] > bx[1] + 1e-6 or sb[3] < bx[2] - 1e-6 or sb[2] > bx[3] + 1e-6: continue
            osa = leikkaa_konveksiin(tri, ptri)
            if len(osa) >= 3: kasittele(osa, A, B, C, a0, t, fi)
    # koe5: sisäpuolisten jänteiden ja seinän väliin tasainen reunus räystään tasolla (oma ryhmä per kaistale)
    for k_, kp in enumerate(tayte or []):
        tr = korvamuoto(kp)
        if tr is None: continue
        for tri in tr:
            pinta += abs(ala(tri)); kolmiot.append(([(q[0], q[1], 0.0) for q in tri], (0.0, 1.0, 0.0), 0, [(0.0, 0.0)] * 3, (-10 - k_, 0)))
    # päädyt: tuloksen reunat, jotka ovat alkuperäisellä naapurireunalla
    paadyt = []
    segs = []
    for r, nb in zip(alkup, naapurit):
        m = len(r)
        for i in range(m):
            if nb[i] or YKSINK > 0: segs.append((r[i], r[(i + 1) % m]))
    if segs:
        for p3, _, _, _, _ in kolmiot:
            for k_ in range(len(p3)):
                p, q = p3[k_], p3[(k_ + 1) % len(p3)]
                if max(p[2], q[2]) < 0.02: continue
                for a, b in segs:
                    l = math.dist(a, b) or 1e-9; t = ((b[0] - a[0]) / l, (b[1] - a[1]) / l)
                    dp = abs((p[0] - a[0]) * t[1] - (p[1] - a[1]) * t[0]); dq = abs((q[0] - a[0]) * t[1] - (q[1] - a[1]) * t[0])
                    if dp > 2e-3 or dq > 2e-3: continue
                    sp = (p[0] - a[0]) * t[0] + (p[1] - a[1]) * t[1]; sq = (q[0] - a[0]) * t[0] + (q[1] - a[1]) * t[1]
                    if min(sp, sq) < -2e-3 or max(sp, sq) > l + 2e-3: continue
                    paadyt.append((p, q, (t[1], -t[0]))); break
    return kolmiot, paadyt, pinta


# --- KS 9.11. palakoko (luovutus -2301 kohta b) ---
def _rk(p, d=5):
    return (round(p[0], d), round(p[1], d))


def _konveksi(poly):
    m = len(poly)
    return all(_risti(poly[i - 1], poly[i], poly[(i + 1) % m]) >= -1e-9 for i in range(m))


def konveksit(tris):
    """Hertel–Mehlhorn: kolmiot yhdistetään konvekseiksi monikulmioiksi poistamalla lävistäjiä (CCW)."""
    polys = []
    for t in tris:
        t = [tuple(q[:2]) for q in t]
        c = _risti(*t)
        if abs(c) < 1e-12: continue
        polys.append(t if c > 0 else [t[0], t[2], t[1]])
    reunat = {}
    def rekisteroi(k):
        p = polys[k]
        for i in range(len(p)): reunat[(_rk(p[i]), _rk(p[(i + 1) % len(p)]))] = k
    for k in range(len(polys)): rekisteroi(k)
    for k in range(len(polys)):
        i = 0
        while polys[k] is not None and i < len(polys[k]):
            p = polys[k]; m = len(p); a, b = p[i], p[(i + 1) % m]
            o = reunat.get((_rk(b), _rk(a)))
            if o is None or o == k or polys[o] is None: i += 1; continue
            q = polys[o]; n = len(q); j = next((jj for jj in range(n) if _rk(q[jj]) == _rk(b) and _rk(q[(jj + 1) % n]) == _rk(a)), None)
            if j is None: i += 1; continue
            uusi = [p[(i + 1 + s_) % m] for s_ in range(m)] + [q[(j + 2 + s_) % n] for s_ in range(n - 2)]
            if not _konveksi(uusi): i += 1; continue
            polys[o] = None; polys[k] = uusi; rekisteroi(k); i = 0
    return [p for p in polys if p]


def _kierto(K, i0, i1, i2):
    """Päätykolmio samaan kiertoon kuin katto (I-järjestyksen ristitulo samaan suuntaan kuin ilmoitettu normaali, kuten katossa)."""
    P = [(K[i][0], K[i][2], K[i][1]) for i in (i0, i1, i2)]; u = [P[1][j] - P[0][j] for j in range(3)]; v = [P[2][j] - P[0][j] for j in range(3)]
    c = (u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]); nw = K[i0][3]
    return (i0, i2, i1) if c[0] * nw[0] + c[1] * nw[1] + c[2] * nw[2] < 0 else (i0, i1, i2)


def _yhdista(K, tt):
    """Saman kasvon ja viipaleen kolmiot (I-järjestys) yhdeksi monikulmioksi ja uudelleen kolmioiksi: sisäkärjet pois.
    None, jos reuna ei ole yksi silmukka tai pinta-ala muuttuu (silloin vanhat kolmiot)."""
    if len(tt) < 2: return None
    reunat = {}
    for a, b, c in tt:
        for p, q in ((a, b), (b, c), (c, a)): reunat[(p, q)] = reunat.get((p, q), 0) + 1
    raja = [(p, q) for (p, q) in reunat if (q, p) not in reunat]
    if any(reunat[e] > 1 for e in raja): return None
    seur = {}
    for p, q in raja:
        if p in seur: return None
        seur[p] = q
    alku = raja[0][0]; silm = [alku]; p = seur[alku]
    while p != alku:
        if len(silm) > len(raja): return None
        silm.append(p); p = seur.get(p)
        if p is None: return None
    if len(silm) != len(raja) or len(silm) < 3: return None
    pts = [(K[i][0], K[i][1]) for i in silm]
    ala_v = sum(abs(_risti((K[a][0], K[a][1]), (K[b][0], K[b][1]), (K[c][0], K[c][1]))) for a, b, c in tt) / 2
    tk = korvamuoto(pts)
    if not tk: return None
    if abs(sum(abs(_risti(*t)) for t in tk) / 2 - ala_v) > 1e-6 * max(1.0, ala_v): return None
    paikka = {(round(x, 9), round(y, 9)): i for (x, y), i in zip(pts, silm)}
    try: uusi = [tuple(paikka[(round(c[0], 9), round(c[1], 9))] for c in t) for t in tk]
    except KeyError: return None
    # korvamuoto antaa CCW (x, y); I-järjestys on vanhoissa sama kuin (a, c, b) CCW:stä -> peilataan, jos vanha kierto oli toisin
    a, b, c = tt[0]; vanha = _risti((K[a][0], K[a][1]), (K[b][0], K[b][1]), (K[c][0], K[c][1]))
    return [(t[0], t[2], t[1]) if vanha < 0 else t for t in uusi]


KIERRE_OHITA = os.environ.get('KATOT_KIERRE_OHITA', '0') == '1'   # koe7: kierteessä vain toistuva kolmio pois, ei koko talon palautusta
KATKOT = 0   # talot, joissa jako palautettiin alkuperäiseksi (kierre tai katto)
LYHIN = 0.01   # alle 1 cm:n reunoja ei jaeta
PAASTA = 0.005   # jakopiste vähintään 5 mm reunan päistä (lähes yhtenevät kärjet kiersivät)
ALA2 = (2 * 1e-8) ** 2   # (2 × ala)² rajana: 0,01 mm²

def ala2_p(p, q, s):
    x = np.cross(q - p, s - p); return float(x @ x)

def _tliitokset(K, T, tol=2e-3):
    """T-liitokset kiinni (KS 10.11., profiloitu: koealueen 1416 taloa 7,9 s): toisen pinnan kärki kolmion reunalla (≤ 2 mm) jakaa kolmion,
    kärjestä kolmion pinnan oma kopio (uv reunalta lineaarisesti). Reunahaku numpylla koko talon kärjistä, tulos välimuistiin reunaparin mukaan.
    Kierre tai liikaa jakoja -> talo ennalleen (KATKOT)."""
    n0 = len(K)
    if n0 == 0 or not T: return list(K), list(T)
    P = np.array([k[:3] for k in K], dtype=np.float64)
    K = list(K); kopiot = {}; out = []; jono = list(T); vahti = 0; muisti = {}
    t2 = tol * tol

    def haku(a, b):
        avain = (a, b) if a < b else (b, a)
        r = muisti.get(avain)
        if r is None:
            pa = np.array(K[avain[0]][:3]); pb = np.array(K[avain[1]][:3]); d = pb - pa; l2 = float(d @ d)
            if l2 < LYHIN * LYHIN: r = []
            else:
                w = P - pa; u = (w @ d) / l2
                q = pa + np.outer(u, d) - P
                ok = (u > 1e-4) & (u < 1 - 1e-4) & (np.einsum('ij,ij->i', q, q) <= t2)
                if ok.any():
                    ok &= (np.linalg.norm(P - pa, axis=1) >= PAASTA) & (np.linalg.norm(P - pb, axis=1) >= PAASTA)
                if ok.any():
                    ix = np.nonzero(ok)[0]; jarj = np.argsort(np.abs(u[ix] - 0.5), kind='stable'); r = [(int(ix[j]), float(u[ix[j]])) for j in jarj]
                else: r = []
            muisti[avain] = r
        return r if a < b else [(v, 1.0 - u) for v, u in r]

    def P_(i): return P[i] if i < n0 else np.array(K[i][:3])

    K0, T0 = list(K), list(T); nahty = set(); katto = 20 * len(T) + 1000
    while jono:
        vahti += 1
        t = jono.pop(); jaettu = False
        tk = tuple(sorted(t))
        if tk in nahty and KIERRE_OHITA and vahti <= katto:
            # koe7 (KS 10.11. 04.4x): toistuva kolmio (samat kärjet) on jo käsitelty kerran -> vain toisto pois, muu talo korjataan.
            # koe3–6 palauttivat koko talon, jolloin sen T-liitokset jäivät auki (Pariisin koealueella 71–72 taloa; way/54661742 = koe6:n saumat).
            continue
        if vahti > katto or tk in nahty:
            # kierre tai liikaa jakoja: talo jää ennalleen (ei huonompi kuin ilman korjausta)
            global KATKOT; KATKOT += 1
            if os.environ.get('KATOT_KATKOLOKI'):
                with open(os.environ['KATOT_KATKOLOKI'], 'a') as f_: f_.write(f"KATKO syy={'kierre' if tk in nahty else 'katto'} T={len(T0)} vahti={vahti} K={len(K0)} p0={tuple(round(x_, 2) for x_ in K0[0][:3])}\n")
            return K0, T0
        nahty.add(tk)
        for e in range(3):
            a, b, c = t[e], t[(e + 1) % 3], t[(e + 2) % 3]
            h = None; pa, pb = K[a], K[b]
            for v, u in haku(a, b):
                # jako vain, jos kummallekin puolikkaalle jää pinta-alaa (yli 0,01 mm²) todellisella kopiokärjellä: kolmion oma kärki,
                # suikaleen kärki tai 0,1 mm:n avaimella jo olemassa oleva kopio tuotti nolla-alaisia tai samoja kolmioita, jotka jakoivat
                # toisiaan loputtomiin (Pariisin koe3 10.11.: vahti 200 000 täyttyi, sadattuhannet kolmiot talossa)
                pv = K[v]; avain = (pa[3], pa[4], pa[7], round(pv[0], 4), round(pv[1], 4), round(pv[2], 4))
                m = kopiot.get(avain); pm = np.array(K[m][:3]) if m is not None else P[v]
                if m is not None and m in t: continue
                if ala2_p(P_(a), pm, P_(c)) > ALA2 and ala2_p(pm, P_(b), P_(c)) > ALA2: h = (v, u, avain, m); break
            if h is None: continue
            v, u, avain, m = h; pv = K[v]
            if m is None:
                m = kopiot[avain] = len(K)
                K.append((pv[0], pv[1], pv[2], pa[3], pa[4], pa[5] + (pb[5] - pa[5]) * u, pa[6] + (pb[6] - pa[6]) * u, pa[7]))
            jono.append((a, m, c)); jono.append((m, b, c))
            jaettu = True; break
        if not jaettu: out.append(t)
    return K, out


def verkko(tulos, piilossa=None):
    """Katon ja päätyjen verkko jaetuin kärjin. Palauttaa (karjet, kolmiot): karki = (x, y, z yli räystään, normaali (x, korkeus, y), laji, u, v, seina);
    kolmio = (i0, i1, i2) myötäpäivään kuten tee-palat.py:n I. piilossa(p, q) -> True pudottaa päätypalan (naapurin katto yhtä korkea)."""
    K = []; T = []
    ryh = {}; rt = {}
    for p3, nw, lj, uv, g in tulos[0]:
        vm = ryh.setdefault(g, {}); ix = []; tt = rt.setdefault(g, [])
        for q, (u, v) in zip(p3, uv):
            a = _rk(q, 4)
            if a not in vm: vm[a] = len(K); K.append((q[0], q[1], q[2], nw, lj, u, v, False))
            if not ix or ix[-1] != vm[a]: ix.append(vm[a])
        if len(ix) > 1 and ix[0] == ix[-1]: ix.pop()
        for i in range(1, len(ix) - 1):
            if len({ix[0], ix[i], ix[i + 1]}) == 3: tt.append((ix[0], ix[i + 1], ix[i]))
    kaytossa = set()
    for g, tt in rt.items():
        uusi = _yhdista(K, tt)
        T.extend(uusi if uusi is not None else tt)
        for t in (uusi if uusi is not None else tt): kaytossa.update(t)
    # yhdistämisestä jääneet sisäkärjet pois
    if len(kaytossa) < len(K):
        uusi_i = {}; K2 = []
        for i, k_ in enumerate(K):
            if i in kaytossa: uusi_i[i] = len(K2); K2.append(k_)
        K = K2; T = [(uusi_i[a_], uusi_i[b_], uusi_i[c_]) for a_, b_, c_ in T]
    # päädyt: suunta normaalista, ketjut seinän suuntaan, ketju yhtenä monikulmiona (s, z)
    palat = {}
    for p, q, no in tulos[1]:
        if piilossa and piilossa(p, q): continue
        t = (-no[1], no[0])
        if (q[0] - p[0]) * t[0] + (q[1] - p[1]) * t[1] < 0: p, q = q, p
        palat.setdefault(_rk(no, 3), []).append((p, q))
    for no, pp in palat.items():
        alku = {}
        for p, q in pp: alku.setdefault(_rk(p, 3), []).append((p, q))
        loppuja = {_rk(q, 3) for p, q in pp}
        kaytetty = set()
        ketjut = []
        for p, q in sorted(pp, key=lambda e: (_rk(e[0], 3) in loppuja, e[0][0], e[0][1])):
            if id(q) in kaytetty: continue
            ketju = [p]; nyk = (p, q)
            while nyk is not None and id(nyk[1]) not in kaytetty:
                kaytetty.add(id(nyk[1])); ketju.append(nyk[1])
                seur = [e for e in alku.get(_rk(nyk[1], 3), []) if id(e[1]) not in kaytetty]
                nyk = seur[0] if seur else None
            ketjut.append(ketju)
        nw = (no[0], 0.0, no[1])
        for ketju in ketjut:
            a0 = ketju[0]; t = (-no[1], no[0])
            s2 = [((c[0] - a0[0]) * t[0] + (c[1] - a0[1]) * t[1], c[2]) for c in ketju]
            mon = [(s2[0][0], 0.0), (s2[-1][0], 0.0)] + [s2[k] for k in range(len(s2) - 1, -1, -1)]
            xy = [(a0[0], a0[1]), (ketju[-1][0], ketju[-1][1])] + [(ketju[k][0], ketju[k][1]) for k in range(len(ketju) - 1, -1, -1)]
            # pois kärjet, jotka osuvat pohjaan (z = 0 päissä)
            puh = []
            for m_, x_ in zip(mon, xy):
                if puh and abs(m_[0] - puh[-1][0][0]) < 1e-4 and abs(m_[1] - puh[-1][0][1]) < 1e-4: continue
                puh.append((m_, x_))
            if len(puh) > 1 and abs(puh[0][0][0] - puh[-1][0][0]) < 1e-4 and abs(puh[0][0][1] - puh[-1][0][1]) < 1e-4: puh.pop()
            tk = korvamuoto([m_ for m_, _ in puh]) if len(puh) >= 3 else None
            if tk:
                vm = {}
                for tri in tk:
                    ix = []
                    for c in tri:
                        kk = (round(c[0], 4), round(c[1], 4))
                        if kk not in vm:
                            x_ = next(x__ for m__, x__ in puh if abs(m__[0] - c[0]) < 1e-9 and abs(m__[1] - c[1]) < 1e-9)
                            vm[kk] = len(K); K.append((x_[0], x_[1], c[1], nw, 255, 0.0, 3.4, True))
                        ix.append(vm[kk])
                    T.append(_kierto(K, ix[0], ix[1], ix[2]))
            else:
                for c0, c1 in zip(ketju, ketju[1:]):
                    s0 = len(K)
                    for c, z in ((c0, 0.0), (c0, c0[2]), (c1, c1[2]), (c1, 0.0)): K.append((c[0], c[1], z, nw, 255, 0.0, 3.4, True))
                    T.append(_kierto(K, s0, s0 + 1, s0 + 2)); T.append(_kierto(K, s0, s0 + 2, s0 + 3))
    # T-liitosten korjaus (_tliitokset), koe3 = koe2 + tämä. 10.11. 00.1x jumi oli kierre (nolla-alaiset jaot), ei hitaus; korjattu 00.5x.
    return (_tliitokset(K, T) if TLIITOKSET else (K, T))


class Paatyhaku:
    """Päätyseinät absoluuttisina (x, y, katon yläreuna). Pääty jätetään pois, kun samalla viivalla (≤ 5 cm) on vastakkain naapurin pääty,
    jonka yläreuna on koko matkalta vähintään yhtä korkealla: seinä jää naapurin sisään. Raollisten naapurien (sijaintinaapuri, väli > 5 cm) päädyt jäävät."""
    R = 2.0

    def __init__(self): self.ruudut = {}

    def lisaa(self, k, p, q):
        l = math.dist(p[:2], q[:2])
        if l < 1e-6: return
        e = (k, p, q)
        n = int(l / 1.0) + 1
        nahty = set()
        for i in range(n + 1):
            f = i / n; x = p[0] + (q[0] - p[0]) * f; y = p[1] + (q[1] - p[1]) * f; r = (int(x // self.R), int(y // self.R))
            if r not in nahty: nahty.add(r); self.ruudut.setdefault(r, []).append(e)

    def korkeus(self, k, x, y, t):
        """Muiden kuin k:n päätyjen yläreuna pisteessä (x, y) suunnalla t vastakkain; None jos ei päätyä."""
        r0 = (int(x // self.R), int(y // self.R)); paras = None
        for dx in (-1, 0, 1):
            for dy in (-1, 0, 1):
                for j, p, q in self.ruudut.get((r0[0] + dx, r0[1] + dy), ()):
                    if j == k: continue
                    l = math.dist(p[:2], q[:2]); u = ((q[0] - p[0]) / l, (q[1] - p[1]) / l)
                    if abs(u[0] * t[0] + u[1] * t[1]) < 0.995: continue
                    s = (x - p[0]) * u[0] + (y - p[1]) * u[1]; d = abs((x - p[0]) * u[1] - (y - p[1]) * u[0])
                    if d > 0.05 or s < -0.02 or s > l + 0.02: continue
                    f = max(0.0, min(1.0, s / l)); z = p[2] + (q[2] - p[2]) * f
                    if paras is None or z > paras: paras = z
        return paras

    def piilossa(self, k, p, q):
        l = math.dist(p[:2], q[:2])
        if l < 1e-6: return True
        t = ((q[0] - p[0]) / l, (q[1] - p[1]) / l)
        for i in range(5):
            f = i / 4; x = p[0] + (q[0] - p[0]) * f; y = p[1] + (q[1] - p[1]) * f; z = p[2] + (q[2] - p[2]) * f
            h = self.korkeus(k, x, y, t)
            if h is None or h < z - 0.05: return False
        return True
