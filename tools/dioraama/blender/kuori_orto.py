# Kuoren siivouksen täyttö maailmankoordinaatistossa (Linnanrakentaja 29.9.2026): alueen ylhäältä nähty ortokuva,
# kloonaus puhtaalta maanpinnalta ruuduittain + matalataajuinen sävynkorjaus reunoista, ja paluu UV-tekstuuriin vain
# kohdekolmioiden omiin pikseleihin (ei vuotoa viereisiin UV-saariin). Vain numpy. Käyttö: kuori_siivous.py.
import numpy as np
from kuori_tex import push_pull, laajenna, rasteri


def _bary(t, px, py):
    a, b, c = (t[:, j][:, None, None, :] for j in range(3))
    det = (b[..., 0] - a[..., 0]) * (c[..., 1] - a[..., 1]) - (c[..., 0] - a[..., 0]) * (b[..., 1] - a[..., 1])
    det = np.where(np.abs(det) < 1e-9, 1e-9, det)
    u = ((px - a[..., 0]) * (c[..., 1] - a[..., 1]) - (c[..., 0] - a[..., 0]) * (py - a[..., 1])) / det
    v = ((b[..., 0] - a[..., 0]) * (py - a[..., 1]) - (px - a[..., 0]) * (b[..., 1] - a[..., 1])) / det
    return np.stack([1 - u - v, u, v]).astype(np.float32)


def bary_rasteri(t, H, W):
    """t: (N,3,2) kolmiot pikseleinä (x, y). Palauttaa (ti, ys, xs, b): kolmion indeksi, pikseli ja painot (M,3)
    jokaiselle pikselikeskipisteelle kolmion sisällä."""
    lo = np.clip(np.floor(t.min(1)).astype(int), 0, [W - 1, H - 1]); hi = np.clip(np.ceil(t.max(1)).astype(int), 0, [W - 1, H - 1])
    d = (hi - lo).max(1) + 1
    osat, ala = [], 0
    for k in (2, 4, 8, 16, 32, 64, 128, 256, 512):
        sel = np.flatnonzero((d > ala) & (d <= k)); ala = k
        n = max(1, 3_000_000 // (k * k)); g = np.arange(k) + 0.5
        for s in range(0, len(sel), n):
            i = sel[s:s + n]
            b = _bary(t[i], lo[i, 0][:, None, None] + g[None, None, :], lo[i, 1][:, None, None] + g[None, :, None])
            ii, jy, jx = np.nonzero((b >= -1e-4).all(0))
            xs = lo[i, 0][ii] + jx; ys = lo[i, 1][ii] + jy; v = (xs < W) & (ys < H)
            osat.append((i[ii[v]], ys[v], xs[v], b[:, ii[v], jy[v], jx[v]].T))
    if not osat: z = np.zeros(0, int); return z, z, z, np.zeros((0, 3), np.float32)
    return tuple(np.concatenate(x) for x in zip(*osat))


def nayte(img, x, y):
    """Bilineaarinen näyte kuvasta (H,W,C) pikselikoordinaateissa (pikselin keskipiste = i + 0.5)."""
    H, W = img.shape[:2]
    fx = np.clip(x - 0.5, 0, W - 1.001); fy = np.clip(y - 0.5, 0, H - 1.001)
    x0, y0 = fx.astype(int), fy.astype(int); tx, ty = (fx - x0)[:, None], (fy - y0)[:, None]
    return (img[y0, x0] * (1 - tx) * (1 - ty) + img[y0, x0 + 1] * tx * (1 - ty)
            + img[y0 + 1, x0] * (1 - tx) * ty + img[y0 + 1, x0 + 1] * tx * ty)


def ortokuva(co, tv, uvp, rgb, ehd, maa_t, lo, res, Hg, Wg):
    """Ylhäältä (z-puskuri) nähty kuva kolmioista ehd ruudukkoon (rivi = y). Palauttaa (kuva, maa): maa = päällimmäinen
    kolmio on maanpintaa (maa_t)."""
    ti, ys, xs, b = bary_rasteri((co[tv[ehd], :2] - lo) / res, Hg, Wg)
    z = (b * co[tv[ehd[ti]], 2]).sum(1)
    o = np.argsort(z); vo = np.full((Hg, Wg), -1); vo[ys[o], xs[o]] = o
    f = vo[vo >= 0]; tri = ehd[ti[f]]
    uv = (b[f][:, :, None] * uvp[tri]).sum(1)
    img = np.zeros((Hg, Wg, 3), np.float32); img[vo >= 0] = nayte(rgb, uv[:, 0], uv[:, 1])
    maa = np.zeros((Hg, Wg), bool); maa[vo >= 0] = maa_t[tri]
    return img, maa


def _integraali(a):
    return np.pad(a.cumsum(0).cumsum(1), ((1, 0), (1, 0)))


def _summa(I, y0, x0, y1, x1):
    return I[y1, x1] - I[y0, x1] - I[y1, x0] + I[y0, x0]


def sumea(img, w, r):
    """Painotettu laatikkosumennus säteellä r pikseliä (normalisoitu: vain w > 0 -pikselit vaikuttavat)."""
    def lk(a):
        c = np.cumsum(np.pad(a, [(r + 1, r)] + [(0, 0)] * (a.ndim - 1)), 0); a = c[2 * r + 1:] - c[:-2 * r - 1]
        c = np.cumsum(np.pad(a, [(0, 0), (r + 1, r)] + [(0, 0)] * (a.ndim - 2)), 1); return c[:, 2 * r + 1:] - c[:, :-2 * r - 1]
    w = w.astype(np.float32)
    return lk(img * w[..., None]) / np.maximum(lk(w), 1e-4)[..., None]


def kloonaa(img, puhdas, P, res, rengas, askel_m=3.0):
    """Täyttää P:n: yksityiskohta kloonataan puhtaalta maalta ruuduittain (väriltään lähimmät siirrot, jatkuvuus
    naapuriruudusta), matala taajuus reunarenkaan tavallisimmista väreistä (push-pull; varjot ja muurin päällys pois).
    Palauttaa uuden kuvan."""
    H, W = P.shape; r = max(2, int(0.4 / res)); s = int(askel_m / res)
    Ls = sumea(img, puhdas, r); D = np.where(puhdas[..., None], img - Ls, 0)  # tyhjä/likainen ei tuo yksityiskohtaa
    rc = img[rengas]; med = np.median(rc, 0); dd = np.abs(rc - med).sum(1)
    tav_ok = np.zeros_like(rengas); tav_ok[rengas] = dd <= np.percentile(dd, 60)
    Lt = sumea(push_pull(img, tav_ok), np.ones((H, W)), r)
    Ic = _integraali(puhdas.astype(np.float64)); Iv = [_integraali(img[..., c] * puhdas) for c in range(3)]
    acc = np.zeros_like(img); wsum = np.zeros((H, W), np.float32)
    py, px = np.nonzero(P)
    edellinen = None
    for cy in range(py.min() - s, py.max() + s + 1, s):
        for cx in range(px.min() - s, px.max() + s + 1, s):
            y0, y1, x0, x1 = max(cy - s, 0), min(cy + s, H), max(cx - s, 0), min(cx + s, W)
            if y1 <= y0 or x1 <= x0 or not P[y0:y1, x0:x1].any(): continue
            h, w = y1 - y0, x1 - x0
            oy, ox = np.meshgrid(np.arange(-y0, H - y1 + 1, max(1, s // 4)), np.arange(-x0, W - x1 + 1, max(1, s // 4)), indexing='ij')
            oy, ox = oy.ravel(), ox.ravel()
            nc = _summa(Ic, y0 + oy, x0 + ox, y1 + oy, x1 + ox); kat = nc / (h * w)
            tav = Lt[y0:y1, x0:x1].reshape(-1, 3).mean(0)
            ero = sum(np.abs(_summa(Iv[c], y0 + oy, x0 + ox, y1 + oy, x1 + ox) / np.maximum(nc, 1) - tav[c]) for c in range(3))
            pist = ero + 0.02 * np.hypot(oy, ox) * res / 10 + (kat < 0.995) * (2 + (1 - kat))
            j = int(np.argmin(pist))
            if edellinen is not None:
                e = np.flatnonzero((oy == edellinen[0]) & (ox == edellinen[1]))
                if len(e) and pist[e[0]] < pist[j] + 0.02: j = e[0]
            edellinen = (oy[j], ox[j])
            ty = np.clip(1 - np.abs(np.arange(y0, y1) + 0.5 - cy) / s, 1e-3, 1)
            tx = np.clip(1 - np.abs(np.arange(x0, x1) + 0.5 - cx) / s, 1e-3, 1)
            tw = ((ty[:, None] * tx[None, :]) ** 6).astype(np.float32)  # lähes kova rajaus: sekoitus sumentaisi kivet
            acc[y0:y1, x0:x1] += tw[..., None] * D[y0 + oy[j]:y1 + oy[j], x0 + ox[j]:x1 + ox[j]]
            wsum[y0:y1, x0:x1] += tw
    out = img.copy()
    out[P] = np.clip(Lt[P] + acc[P] / np.maximum(wsum[P], 1e-6)[:, None], 0, 1)
    return out


def paluu(rgb, co, tv, uvp, K, orto, lo, res):
    """Maalaa kohdekolmioiden K tekseleihin ortokuvan värit tekselin maailmanpaikasta. Palauttaa maalatut pikselit."""
    H, W = rgb.shape[:2]
    ti, ys, xs, b = bary_rasteri(uvp[K], H, W)
    xy = (b[:, :, None] * co[tv[K[ti]], :2]).sum(1)
    g = (xy - lo) / res
    rgb[ys, xs] = nayte(orto, g[:, 0], g[:, 1])
    M = np.zeros((H, W), bool); M[ys, xs] = True
    return M


def reunat(rgb, uvp, M, K, n):
    """Saumavara: maalattujen pikselien ympäriltä n pikseliä, mutta ei muiden kolmioiden omistamiin pikseleihin."""
    H, W = M.shape
    iso = laajenna(M, n)
    c = np.clip(np.floor(uvp).astype(int), 0, [W - 1, H - 1])
    muut = iso[c[..., 1], c[..., 0]].any(1); muut[K] = False
    G = iso & ~M & ~rasteri(uvp[muut], H, W)
    rgb[G] = push_pull(rgb, M)[G]
    return int(G.sum())
