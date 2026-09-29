# Geometrian apufunktiot kuoren siivoukseen (Linnanrakentaja 29.9.2026): monikulmiot, maanpinnan korkeuskenttä.
import numpy as np


def sisalla(xy, poly):
    """Even-odd: pisteet (N,2) monikulmion (K,2) sisällä."""
    x, y = xy[:, 0], xy[:, 1]
    p = np.asarray(poly, float); s = np.zeros(len(xy), bool)
    for i in range(len(p)):
        x1, y1 = p[i]; x2, y2 = p[(i + 1) % len(p)]
        yl = (y1 > y) != (y2 > y)
        xr = (x2 - x1) * (y - y1) / (y2 - y1 + 1e-12) + x1
        s ^= yl & (x < xr)
    return s


def etaisyys(xy, poly):
    """Pienin etäisyys monikulmion reunaan (vain ulkopuolisille mielekäs)."""
    p = np.asarray(poly, float); d = np.full(len(xy), 1e9)
    for i in range(len(p)):
        a = p[i]; b = p[(i + 1) % len(p)]; ab = b - a
        t = np.clip(((xy - a) @ ab) / (ab @ ab + 1e-12), 0, 1)
        d = np.minimum(d, np.hypot(*(xy - (a + t[:, None] * ab)).T))
    return d


def maakentta(co, poly, sol=2.0, marg=6.0, pros=15):
    """Maanpinnan korkeus vertexeille co (N,3): palauttaa funktion g(xy). Lasketaan vain monikulmion ULKOPUOLISISTA
    vertexeistä (matala prosenttipiste ruutua kohti): kohteen omat kärjet vääristäisivät maanpintaa. Sisäpuolen ruudut
    täytetään naapureista, lopuksi tasoitus."""
    polyt = poly if np.ndim(poly[0]) == 2 else [poly]   # yksi monikulmio tai lista monikulmioita
    p = np.vstack([np.asarray(q, float) for q in polyt]); lo = p.min(0) - marg; hi = p.max(0) + marg
    nx, ny = int(np.ceil((hi[0] - lo[0]) / sol)), int(np.ceil((hi[1] - lo[1]) / sol))
    v = (co[:, 0] > lo[0]) & (co[:, 0] < hi[0]) & (co[:, 1] > lo[1]) & (co[:, 1] < hi[1])
    sis = np.zeros(int(v.sum()), bool)
    for q in polyt: sis |= sisalla(co[v, :2], q)
    v[np.flatnonzero(v)[sis]] = False
    ix = ((co[v, 0] - lo[0]) / sol).astype(int); iy = ((co[v, 1] - lo[1]) / sol).astype(int)
    tunn = iy * nx + ix; z = co[v, 2]; j = np.argsort(tunn); tunn, z = tunn[j], z[j]
    r = np.full(nx * ny, np.nan)
    rajat = np.flatnonzero(np.diff(tunn)) + 1
    for a, b in zip(np.r_[0, rajat], np.r_[rajat, len(tunn)]):
        if b - a >= 5: r[tunn[a]] = np.percentile(z[a:b], pros)
    r = r.reshape(ny, nx)
    for _ in range(40):
        if not np.isnan(r).any(): break
        q = np.pad(r, 1, constant_values=np.nan)
        nb = np.stack([q[dy:dy + ny, dx:dx + nx] for dy in range(3) for dx in range(3)])
        with np.errstate(all='ignore'):
            m = np.nanmean(nb, 0)
        r = np.where(np.isnan(r), m, r)
    r = np.where(np.isnan(r), np.nanmedian(r), r)
    for _ in range(2):
        q = np.pad(r, 1, mode='edge')
        r = np.mean([q[dy:dy + ny, dx:dx + nx] for dy in range(3) for dx in range(3)], 0)

    def g(xy):
        fx = np.clip((xy[:, 0] - lo[0]) / sol - 0.5, 0, nx - 1.001); fy = np.clip((xy[:, 1] - lo[1]) / sol - 0.5, 0, ny - 1.001)
        x0, y0 = fx.astype(int), fy.astype(int); tx, ty = fx - x0, fy - y0
        return (r[y0, x0] * (1 - tx) * (1 - ty) + r[y0, x0 + 1] * tx * (1 - ty)
                + r[y0 + 1, x0] * (1 - tx) * ty + r[y0 + 1, x0 + 1] * tx * ty)
    return g
