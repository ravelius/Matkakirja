"""Vanhat T7:n lokit NAS:lle (PT 7.11.2026). Oletus on kuiva-ajo: ei kirjoita mitään. Oikea siirto vain --aja:lla, ja se vaatii PT:n sanan.
Käyttö: python3 -I siirra_lokit_nas.py [--aja] [--raja-vrk 7] [--enintaan N] [--vain nimi ...]

Yhdelle kansiolle: kopio piilonimelle -> täsmäys (tiedostot, kansiot, linkit, koot, suurimman tiedoston sha256) -> nimi oikeaksi -> lokit-kansion linkki NAS:lle -> T7-kopion poisto.
Linkki vaihdetaan ennen poistoa, joten polku ei katkea missään vaiheessa. Tila luetaan levyltä: uusi ajo jatkaa siitä, mihin edellinen jäi, ja lukko estää kaksi yhtäaikaista ajoa.
Ei koske: alle rajan muokattuihin, auki oleviin, appikopioihin, kansioihin ilman täsmälleen T7:lle osoittavaa linkkiä. NAS lisää tiedostoille ._-kylkitiedostot; ne eivät kuulu täsmäykseen."""
import argparse, fcntl, hashlib, os, shutil, subprocess, sys, time

APP_MERKIT = ('-app', 'app-', 'juna-', '-mac-tf-', '.app')
KESKEN, POISTOON = '.kesken-', '.poistettava-'
NAS_VARA = 500 * 2**30
LSOF_VALI = 300


def uusin(p):
    m = os.lstat(p).st_mtime
    for d, ks, ts in os.walk(p):
        for n in ks + ts:
            if not n.startswith('._'): m = max(m, os.lstat(os.path.join(d, n)).st_mtime)
    return m


def koko(p):
    z = 0
    for d, _, ts in os.walk(p):
        for n in ts: z += os.lstat(os.path.join(d, n)).st_size
    return z


def sormenjalki(p):
    """Tiedostot, kansiot, linkit, tavut ja suurin tiedosto ilman ._-kylkitiedostoja."""
    t = k = l = z = 0; suurin = (-1, '')
    for d, ks, ts in os.walk(p):
        for n in ks:
            if n.startswith('._'): continue
            if os.path.islink(os.path.join(d, n)): l += 1
            else: k += 1
        for n in ts:
            if n.startswith('._'): continue
            q = os.path.join(d, n); st = os.lstat(q)
            if os.path.islink(q): l += 1; continue
            t += 1; z += st.st_size
            if (st.st_size, os.path.relpath(q, p)) > suurin: suurin = (st.st_size, os.path.relpath(q, p))
    return dict(tiedostot=t, kansiot=k, linkit=l, tavut=z, suurin=suurin[1])


def sha(p):
    h = hashlib.sha256()
    with open(p, 'rb') as f:
        for lohko in iter(lambda: f.read(2**20), b''): h.update(lohko)
    return h.hexdigest()


def tasmaa(a, b):
    x, y = sormenjalki(a), sormenjalki(b)
    if x != y: return f'{x} != {y}'
    if x['suurin'] and sha(os.path.join(a, x['suurin'])) != sha(os.path.join(b, x['suurin'])): return f"sha256 eroaa: {x['suurin']}"
    return None


def auki_olevat(juuri):
    """Polut juuren alla, joita jokin prosessi pitää auki tai työkansionaan. None, jos selvitys ei onnistu."""
    try: p = subprocess.run(['/usr/sbin/lsof', '-n', '-w', '-Fn'], capture_output=True, text=True, errors='replace', timeout=180)
    except (OSError, subprocess.SubprocessError): return None
    if not p.stdout: return None
    pit = len(juuri) + 1
    return {r[1 + pit:].split('/')[0] for r in p.stdout.splitlines() if r.startswith('n' + juuri + '/')}


def linkki_vaihto(polku, kohde):
    uusi = f'{polku}.siirto-{os.getpid()}'
    os.symlink(kohde, uusi); os.replace(uusi, polku)


def poista_t7(a, juuri):
    """Vain oikea kansio arkiston suoraan alla; ei koskaan linkin läpi."""
    if os.path.dirname(a) != juuri or os.path.islink(a) or not os.path.isdir(a): raise RuntimeError(f'poisto estetty: {a}')
    shutil.rmtree(a)


def syy_ohittaa(n, a, lk, t7, raja, auki):
    if n.startswith(('.', '_')) or '/' in n: return 'piilo tai polku'
    if os.path.islink(a): return 'linkki'
    if not os.path.isdir(a): return 'ei kansio'
    if any(m in n for m in APP_MERKIT): return 'appikopio'
    if not os.path.islink(lk): return 'ei linkkiä lokit-kansiossa' if not os.path.lexists(lk) else 'lokit-kansiossa oikea kansio'
    if os.readlink(lk) != a: return 'linkki osoittaa muualle'
    if auki is None: return 'auki-tieto puuttuu'
    if n in auki: return 'auki'
    if uusin(a) >= raja: return 'muokattu rajan sisällä'
    return None


def main():
    o = argparse.ArgumentParser()
    o.add_argument('--aja', action='store_true'); o.add_argument('--raja-vrk', type=float, default=7.0); o.add_argument('--enintaan', type=int); o.add_argument('--vain', nargs='*')
    o.add_argument('--t7', default='/Volumes/T7 4TB/koodaus/proto-lokit-arkisto'); o.add_argument('--nas', default='/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/lokit')
    o.add_argument('--lokit', default='/Users/Shared/Claude/proto-3d/lokit'); o.add_argument('--lukko', default='/Users/Shared/Claude/_levy/siirra_lokit_nas.lukko')
    a = o.parse_args()
    for p in (a.t7, a.nas, a.lokit):
        if not os.path.isdir(p): sys.exit(f'puuttuu: {p}')
    if a.aja:
        lf = open(a.lukko, 'w')
        try: fcntl.flock(lf, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except OSError: sys.exit('toinen ajo käynnissä')
        vapaa = shutil.disk_usage(a.nas).free
        if vapaa < NAS_VARA and a.nas.startswith('/Volumes/'): sys.exit(f'NAS:lla vapaana vain {vapaa / 2**30:.0f} Gi')
    raja = time.time() - a.raja_vrk * 86400
    # Kesken jäänyt poisto: linkki on jo NAS:lla, joten loppuun.
    for n in sorted(os.listdir(a.t7)):
        if not n.startswith(POISTOON): continue
        nimi = n[len(POISTOON):]; b = os.path.join(a.nas, nimi); lk = os.path.join(a.lokit, nimi)
        if not (os.path.isdir(b) and os.path.islink(lk) and os.readlink(lk) == b): print('JUMI', n, 'NAS-kopio tai linkki puuttuu; ei poisteta'); continue
        print(('JATKAN POISTOA ' if a.aja else 'JATKAISI POISTOA ') + nimi, flush=True)
        if a.aja: poista_t7(os.path.join(a.t7, n), a.t7)
    aika = time.time(); auki = auki_olevat(a.t7)
    tehty = virheita = 0; tavut = 0; ohi = {}; t0 = time.time()
    for n in sorted(a.vain if a.vain else os.listdir(a.t7)):
        s = os.path.join(a.t7, n); lk = os.path.join(a.lokit, n); b = os.path.join(a.nas, n); k = os.path.join(a.nas, KESKEN + n)
        if a.enintaan is not None and tehty >= a.enintaan: break
        if not os.path.lexists(s): ohi['ei T7:lla'] = ohi.get('ei T7:lla', 0) + 1; continue
        if a.aja and time.time() - aika > LSOF_VALI: aika = time.time(); auki = auki_olevat(a.t7)
        syy = syy_ohittaa(n, s, lk, a.t7, raja, auki)
        if syy: ohi[syy] = ohi.get(syy, 0) + 1; continue
        z = koko(s)
        if not a.aja:
            print('SIIRTYISI', n, f'{z / 2**30:.2f} Gi' + (', NAS-kopio jo olemassa' if os.path.lexists(b) else '')); tehty += 1; tavut += z; continue
        try:
            if not os.path.isdir(b):
                os.makedirs(k, exist_ok=True)
                p = subprocess.run(['/usr/bin/rsync', '-rlt', s + '/', k + '/'], capture_output=True, text=True)
                if p.returncode: raise RuntimeError(f'rsync {p.returncode}: {p.stderr[:300]}')
                ero = tasmaa(s, k)
                if ero: raise RuntimeError('täsmäys: ' + ero)
                os.rename(k, b)
            else:
                ero = tasmaa(s, b)
                if ero: raise RuntimeError('NAS-kopio ei täsmää: ' + ero)
            linkki_vaihto(lk, b)
            t = os.path.join(a.t7, POISTOON + n); os.rename(s, t); poista_t7(t, a.t7)
            tehty += 1; tavut += z
            print('SIIRRETTY', n, f'{z / 2**30:.2f} Gi', flush=True)
        except (OSError, RuntimeError) as e:
            virheita += 1; print('VIRHE', n, e, flush=True)
            if virheita >= 3: print('kolme virhettä: lopetan'); break
    print(f"{'siirretty' if a.aja else 'siirtyisi'} {tehty} kansiota, {tavut / 2**30:.1f} Gi, {time.time() - t0:.0f} s; ohitettu {ohi}; virheitä {virheita}")
    if virheita: sys.exit(1)


main()
