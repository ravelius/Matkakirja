# Tekstuurin siivous (Linnanrakentaja 29.9.2026): kolmioiden UV-alueet maskeiksi ja täyttö ympäröivällä kivetyksellä.
# Vain numpy (Blenderin oma python; PIL/cv2 eivät ole mukana). Käyttö: kuori_siivous.py.
import numpy as np


def rasteri(t, H, W, eps=0.03):
    """t: (N,3,2) UV-kolmiot pikselikoordinaateissa (x = u*W, y = v*H). Palauttaa bool-maskin (H,W)."""
    m = np.zeros((H, W), bool)
    if len(t) == 0:
        return m
    lo = np.floor(t.min(1)).astype(int); hi = np.ceil(t.max(1)).astype(int)
    lo = np.clip(lo, 0, [W - 1, H - 1]); hi = np.clip(hi, 0, [W - 1, H - 1])
    d = (hi - lo).max(1) + 1
    for k, ala, yla in ((4, 0, 4), (16, 4, 16)):
        sel = np.where((d > ala) & (d <= yla))[0]
        g = np.arange(k)
        for s in range(0, len(sel), 20000):
            i = sel[s:s + 20000]
            px = lo[i, 0][:, None, None] + g[None, None, :] + 0.5 + np.zeros((1, k, 1))
            py = lo[i, 1][:, None, None] + g[None, :, None] + 0.5 + np.zeros((1, 1, k))
            ok = _sisalla(t[i], px, py, eps)
            ii, jy, jx = np.nonzero(ok)
            xs = lo[i, 0][ii] + jx; ys = lo[i, 1][ii] + jy
            v = (xs < W) & (ys < H)
            m[ys[v], xs[v]] = True
    # Ohuet siliverikolmiot eivät osu pikselin keskipisteisiin: merkitään myös reunat ja kärjet (≤ 1 px:n välein).
    for e in range(3):
        p, q = t[:, e], t[:, (e + 1) % 3]
        cnt = np.ceil(np.hypot(*(q - p).T)).astype(int) + 1
        idx = np.repeat(np.arange(len(t)), cnt)
        k = np.arange(cnt.sum()) - np.repeat(np.cumsum(cnt) - cnt, cnt)
        pts = p[idx] + (k / np.maximum(cnt[idx] - 1, 1))[:, None] * (q - p)[idx]
        xs = np.clip(np.floor(pts[:, 0]).astype(int), 0, W - 1); ys = np.clip(np.floor(pts[:, 1]).astype(int), 0, H - 1)
        m[ys, xs] = True
    for i in np.where(d > 16)[0]:
        gx, gy = np.meshgrid(np.arange(lo[i, 0], hi[i, 0] + 1) + 0.5, np.arange(lo[i, 1], hi[i, 1] + 1) + 0.5)
        ok = _sisalla(t[i:i + 1], gx[None], gy[None], eps)[0]
        yy, xx = np.nonzero(ok)
        m[lo[i, 1] + yy, lo[i, 0] + xx] = True
    return m


def _sisalla(t, px, py, eps):
    a = t[:, 0, :][:, None, None, :]; b = t[:, 1, :][:, None, None, :]; c = t[:, 2, :][:, None, None, :]
    det = (b[..., 0] - a[..., 0]) * (c[..., 1] - a[..., 1]) - (c[..., 0] - a[..., 0]) * (b[..., 1] - a[..., 1])
    det = np.where(np.abs(det) < 1e-9, 1e-9, det)
    u = ((px - a[..., 0]) * (c[..., 1] - a[..., 1]) - (c[..., 0] - a[..., 0]) * (py - a[..., 1])) / det
    v = ((b[..., 0] - a[..., 0]) * (py - a[..., 1]) - (px - a[..., 0]) * (b[..., 1] - a[..., 1])) / det
    return (u >= -eps) & (v >= -eps) & (u + v <= 1 + eps)


def laajenna(m, n):
    m = m.copy()
    for _ in range(n):
        p = m.copy()
        p[1:] |= m[:-1]; p[:-1] |= m[1:]; p[:, 1:] |= m[:, :-1]; p[:, :-1] |= m[:, 1:]
        m = p
    return m


def _ala(a):
    return a.reshape(a.shape[0] // 2, 2, a.shape[1] // 2, 2, *a.shape[2:]).mean((1, 3))


def _yla(a):
    return a.repeat(2, 0).repeat(2, 1)


def push_pull(img, valid):
    """Täyttää pikselit, joissa valid=False, lähimmistä validien pikselien väreistä (pehmeä pyramiditäyttö)."""
    w = valid.astype(np.float32)
    s = img * w[..., None]
    tasot = [(s, w)]
    while min(tasot[-1][0].shape[:2]) > 1 and tasot[-1][0].shape[0] % 2 == 0 and tasot[-1][0].shape[1] % 2 == 0:
        s2, w2 = _ala(tasot[-1][0]), _ala(tasot[-1][1])
        tasot.append((s2, w2))
    r = None
    for s, w in reversed(tasot):
        kohde = s / np.maximum(w, 1e-6)[..., None]
        # karkeimman tason tyhjät ruudut: lähteiden keskiväri (muuten kaukana lähteistä jäisi musta)
        kohde = np.where(w[..., None] > 0, kohde, 0 if r is not None else s.reshape(-1, s.shape[-1]).sum(0) / max(float(w.sum()), 1e-6))
        r = kohde if r is None else w[..., None] * kohde + (1 - w[..., None]) * _yla(r)
    return r


def laatta_kohina(img, valid, kohde, rng, n=40):
    """Yksityiskohta (korkeataajuus) validilta kivetykseltä siirrettynä kohdepikseleille: täyttö ei jää sileäksi."""
    H, W = valid.shape
    w = valid.astype(np.float32)
    def laatikko(a, r):
        c = np.cumsum(np.pad(a, [(r + 1, r)] + [(0, 0)] * (a.ndim - 1)), 0)
        a = c[2 * r + 1:] - c[:-2 * r - 1]
        c = np.cumsum(np.pad(a, [(0, 0), (r + 1, r)] + [(0, 0)] * (a.ndim - 2)), 1)
        return c[:, 2 * r + 1:] - c[:, :-2 * r - 1]
    sm = laatikko(img * w[..., None], 6) / np.maximum(laatikko(w, 6), 1e-3)[..., None]
    det = (img - sm) * w[..., None]
    ty, tx = np.nonzero(kohde)
    if len(ty) == 0 or valid.sum() < 100:
        return np.zeros_like(img)
    paras, pd = None, -1
    for _ in range(n):
        dy, dx = int(rng.integers(-H // 2, H // 2)), int(rng.integers(-W // 2, W // 2))
        f = valid[(ty + dy) % H, (tx + dx) % W].mean()
        if f > pd: paras, pd = (dy, dx), f
    dy, dx = paras
    out = np.zeros_like(img)
    out[ty, tx] = det[(ty + dy) % H, (tx + dx) % W]
    return out
