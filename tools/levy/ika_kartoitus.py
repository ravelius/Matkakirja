"""Kartoittaa siirtoehdokkaat: koko ja uusimman tiedostomuutoksen ikä (h).
Ei muuta mitään. Tulos: ika_kartoitus.json + yhteenveto stdoutiin."""
import os, json, time

P = '/Users/Shared/Claude/proto-3d'
ROOLIT = {'julkaisija', 'linnanrakentaja', 'linssiseppa2', 'siirtoseppa', 'natiivi-ui', 'pelikoodari',
          'linssiseppa', 'natiiviseppa', 'karttaseppa', 'valoseppa', 'lavastaja', 'projektiseppa',
          'tyokaluseppa', 'laitetestaaja', 'aanittaja', 'sisaltokirjuri', 'fable', 'paatoimittaja'}
nyt = time.time()


def mittaa(polku):
    koko, uusin, n = 0, 0.0, 0
    if os.path.islink(polku):
        return 0, 0.0, 0
    if os.path.isfile(polku):
        st = os.lstat(polku)
        return st.st_size, st.st_mtime, 1
    for juuri, kansiot, tiedostot in os.walk(polku, followlinks=False):
        for t in tiedostot:
            try:
                st = os.lstat(os.path.join(juuri, t))
            except OSError:
                continue
            koko += st.st_blocks * 512
            n += 1
            if st.st_mtime > uusin:
                uusin = st.st_mtime
        try:
            m = os.lstat(juuri).st_mtime
            uusin = max(uusin, m)
        except OSError:
            pass
    return koko, uusin, n


def ehdokkaat():
    for x in sorted(os.listdir(P + '/lokit')):
        yield 'lokit', P + '/lokit/' + x
    for x in sorted(os.listdir(P + '/_tyo')):
        p = P + '/_tyo/' + x
        if x in ROOLIT and os.path.isdir(p) and not os.path.islink(p):
            for y in sorted(os.listdir(p)):
                yield 'tyo', p + '/' + y
        else:
            yield 'tyo', p
    for x in sorted(os.listdir(P + '/_valmiit')):
        yield 'valmiit', P + '/_valmiit/' + x
    for x in ('Matkakirja-mallinseppa', 'Matkakirja-kysymykset'):
        yield 'checkout', '/Users/Shared/Claude/' + x


tulos = []
for ryhma, p in ehdokkaat():
    if os.path.basename(p) in ('.DS_Store', 'SIIRRETTY.txt'):
        continue
    koko, uusin, n = mittaa(p)
    ika_h = (nyt - uusin) / 3600 if uusin else None
    tulos.append({'ryhma': ryhma, 'polku': p, 'gt': round(koko / 2**30, 3), 'ika_h': round(ika_h, 1) if ika_h else None,
                  'tiedostoja': n, 'linkki': os.path.islink(p)})

json.dump(tulos, open(os.path.join(os.makedirs('/Users/Shared/Claude/_levy', exist_ok=True) or '/Users/Shared/Claude/_levy', 'ika_kartoitus.json'), 'w'), ensure_ascii=False, indent=1)
for ryhma in ('lokit', 'tyo', 'valmiit', 'checkout'):
    r = [t for t in tulos if t['ryhma'] == ryhma]
    yht = sum(t['gt'] for t in r)
    for raja in (24, 48, 168):
        vanhat = [t for t in r if t['ika_h'] is not None and t['ika_h'] > raja]
        print(f"{ryhma}: yhteensä {yht:.1f} G ({len(r)} kpl); yli {raja} h: {sum(t['gt'] for t in vanhat):.1f} G ({len(vanhat)} kpl)")
print('valmis')
