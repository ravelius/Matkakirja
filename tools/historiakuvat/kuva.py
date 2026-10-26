#!/usr/bin/env python3
"""Historiakuvien työkalut (Sisältökirjuri 15.10.2026).
  kuva.py haku "<kysely>"            Commons-haku: otsikko | lisenssi | tekijä | koko
  kuva.py esikatsele "File:X.jpg"    lataa 800 px esikatselu -> esikatselu/<nimi>.jpg (katso Read-työkalulla)
  kuva.py rakenna <kaupunki>         lukee <kaupunki>/ehdotus.json, validoi, lataa, rajaa, kirjoittaa
                                     <kaupunki>/<kaupunki>-historia-yksityiskohdat.json ja <kaupunki>/kuvat/<hash>.jpg
Vain PD / CC0 / CC BY / CC BY-SA (omistaja 19.10.2026, Raamattu 11.1: BY-SA tekijän nimellä kuten CC BY, muokattu kuva samalla lisenssillä; ei NC, ei ND). Käytä aina `python3 -I`."""
import sys, os, re, json, time, hashlib, io, urllib.request, urllib.parse
from PIL import Image
W = os.path.dirname(os.path.abspath(__file__))
UA = 'MatkakirjaSisaltokirjuri/1.0 (sami@valokuvaamoklik.fi)'
API = 'https://commons.wikimedia.org/w/api.php'

def get(url, binary=False):
    for i in range(6):
        try:
            r = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': UA}), timeout=60)
            b = r.read(); time.sleep(1.0)
            return b if binary else json.loads(b)
        except Exception as e:
            if i == 5: raise
            time.sleep(4 * (i + 1))

def api(**p):
    p.update(format='json', formatversion='2')
    return get(API + '?' + urllib.parse.urlencode(p))

def strip(s): return re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', s or '')).strip()

def lisenssi(ext):
    l = strip(ext.get('LicenseShortName', {}).get('value', ''))
    ll = l.lower()
    if re.search(r'\b(nc|nd)\b', ll) or 'gfdl' in ll or 'fair' in ll: return None, l
    if ll.startswith('cc0') or 'cc zero' in ll or 'public domain dedication' in ll: return 'CC0', l
    if ll.startswith('public domain') or ll.startswith('pd') or 'no restrictions' in ll: return 'PD', l
    m = re.match(r'cc[ -]by[ -]sa[ -](\d\.\d)', ll)
    if m: return 'CC BY-SA ' + m.group(1), l
    m = re.match(r'cc[ -]by[ -](\d\.\d)', ll)
    if m: return 'CC BY ' + m.group(1), l
    return None, l

def info(title, width=None):
    p = dict(action='query', titles=title, prop='imageinfo', iiprop='url|size|mime|extmetadata')
    if width: p['iiurlwidth'] = width
    pg = api(**p)['query']['pages'][0]
    if 'imageinfo' not in pg: raise SystemExit('Ei löydy: ' + title)
    return pg['imageinfo'][0]

def haku(q):
    r = api(action='query', generator='search', gsrnamespace=6, gsrsearch=q, gsrlimit=25,
            prop='imageinfo', iiprop='size|mime|extmetadata')
    for pg in sorted(r.get('query', {}).get('pages', []), key=lambda x: x.get('index', 0)):
        ii = (pg.get('imageinfo') or [{}])[0]
        if not ii.get('mime', '').startswith('image/') or 'svg' in ii.get('mime', '') or 'tiff' in ii.get('mime', ''): continue
        ext = ii.get('extmetadata', {})
        lic, raw = lisenssi(ext)
        print(('OK  ' if lic else 'EI  ') + pg['title'] + ' | ' + (lic or raw) + ' | ' + strip(ext.get('Artist', {}).get('value', ''))[:40] + ' | %dx%d' % (ii.get('width', 0), ii.get('height', 0)))

def esikatsele(title):
    ii = info(title, 800)
    b = get(ii.get('thumburl') or ii['url'], True)
    out = os.path.join(W, 'esikatselu', re.sub(r'[^A-Za-z0-9]+', '_', title[5:])[:70] + '.jpg')
    Image.open(io.BytesIO(b)).convert('RGB').save(out, quality=85)
    print(out)

def sana_ala(teksti, ankkuri):
    i = teksti.find(ankkuri)
    return i, teksti[:i].count(' ') if i >= 0 else -1

def rakenna(k):
    d = os.path.join(W, k)
    ehd = json.load(open(os.path.join(d, 'ehdotus.json'), encoding='utf-8'))
    hist = json.load(open(os.path.join(W, 'ref', k + '-historia.json'), encoding='utf-8'))
    tekstit = {o['tunnus']: o['teksti'] for o in hist['osiot']}
    os.makedirs(os.path.join(d, 'kuvat'), exist_ok=True)
    jarj = {t: i for i, t in enumerate(tekstit)}
    ehd.sort(key=lambda e: (jarj.get(e['kohde_id'], 99), sana_ala(tekstit.get(e['kohde_id'], ''), e['ankkuri'])[1]))
    ulos, virheet, kaytetty, per = [], [], set(), {}
    for e in ehd:
        kid = e['kohde_id']; t = tekstit.get(kid)
        if t is None: virheet.append('tuntematon kohde_id ' + kid); continue
        if e['ankkuri'] not in t: virheet.append(kid + ': ankkuri ei ole tekstissä: ' + e['ankkuri']); continue
        if t.count(e['ankkuri']) != 1: virheet.append(kid + ': ankkuri ei ole yksiselitteinen: ' + e['ankkuri'])
        per.setdefault(kid, []).append(e)
        if e['commons_tiedosto'] in kaytetty: virheet.append('sama kuva kahdesti: ' + e['commons_tiedosto'])
        kaytetty.add(e['commons_tiedosto'])
    for kid, es in per.items():
        if len(es) > 2: virheet.append(kid + ': yli 2 kuvaa')
        if len(es) == 2:
            a, b = (sana_ala(tekstit[kid], x['ankkuri'])[1] for x in es)
            if abs(a - b) < 15: virheet.append('%s: ankkurien väli %d sanaa (< 15)' % (kid, abs(a - b)))
    if virheet: print('\n'.join('VIRHE ' + v for v in virheet)); sys.exit(1)
    for e in ehd:
        ii0 = info(e['commons_tiedosto'])
        lic, raw = lisenssi(ii0.get('extmetadata', {}))
        if not lic: print('VIRHE lisenssi ei kelpaa: %s (%s)' % (e['commons_tiedosto'], raw)); sys.exit(1)
        ow, oh = ii0['width'], ii0['height']
        r = e.get('rajaus') or [0, 0, 1, 1]
        tarve = min(ow, int(1280 / max(r[2] - r[0], 0.05)) + 1)
        ii = info(e['commons_tiedosto'], tarve) if tarve < ow else ii0
        b = get(ii.get('thumburl') or ii['url'], True)
        im = Image.open(io.BytesIO(b)).convert('RGB'); w, h = im.size
        im = im.crop((round(r[0] * w), round(r[1] * h), round(r[2] * w), round(r[3] * h)))
        if im.size[0] > 1280: im = im.resize((1280, round(im.size[1] * 1280 / im.size[0])), Image.LANCZOS)
        buf = io.BytesIO(); im.save(buf, 'JPEG', quality=86, optimize=True); data = buf.getvalue()
        hh = hashlib.sha256(data).hexdigest()[:16]
        open(os.path.join(d, 'kuvat', hh + '.jpg'), 'wb').write(data)
        tekija = strip(ii0['extmetadata'].get('Artist', {}).get('value', '')) or 'Tuntematon'
        tid = e['kohde_id']
        ulos.append({'kohde_id': tid, 'tekstilaji': 'teksti', 'ankkuri': e['ankkuri'], 'kuvateksti': e['kuvateksti'],
            'commons_tiedosto': e['commons_tiedosto'],
            'url': 'https://commons.wikimedia.org/wiki/' + urllib.parse.quote(e['commons_tiedosto'].replace(' ', '_'), safe=':/(),!\'~*'),
            'lisenssi': lic, 'tekija': tekija[:120], 'tarkistettu': False, 'perustelu': e.get('perustelu', ''),
            'tarkistaja': None, 'tarkistus': None, **({'rajaus': r} if e.get('rajaus') else {}),
            'media_tiedosto': 'esittely/%s-historia-v1/kuvat/%s.jpg' % (k, hh),
            'media_url': 'https://media.matkakirja.app/esittely/%s-historia-v1/kuvat/%s.jpg' % (k, hh),
            'paketti_leveys': im.size[0], 'paketti_korkeus': im.size[1], 'alkuperainen_leveys': ow, 'alkuperainen_korkeus': oh})
        print('ok', tid, e['ankkuri'][:30], lic, im.size)
    json.dump(ulos, open(os.path.join(d, k + '-historia-yksityiskohdat.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('kirjoitettu', len(ulos), 'kuvaa')


def taivas(k):
    """Skannerikorttien kuvat: <k>/ehdotus.json = [{kohde, commons_tiedosto, kuvateksti, rajaus?, perustelu}]; ei ankkureita."""
    d = os.path.join(W, k)
    ehd = json.load(open(os.path.join(d, 'ehdotus.json'), encoding='utf-8'))
    os.makedirs(os.path.join(d, 'kuvat'), exist_ok=True)
    ulos = []; seen = set()
    for e in ehd:
        if e['commons_tiedosto'] in seen: print('VIRHE sama kuva kahdesti: ' + e['commons_tiedosto']); sys.exit(1)
        seen.add(e['commons_tiedosto'])
        ii0 = info(e['commons_tiedosto'])
        lic, raw = lisenssi(ii0.get('extmetadata', {}))
        if not lic: print('VIRHE lisenssi ei kelpaa: %s (%s)' % (e['commons_tiedosto'], raw)); sys.exit(1)
        ow, oh = ii0['width'], ii0['height']
        r = e.get('rajaus') or [0, 0, 1, 1]
        tarve = min(ow, int(1280 / max(r[2] - r[0], 0.05)) + 1)
        ii = info(e['commons_tiedosto'], tarve) if tarve < ow else ii0
        b = get(ii.get('thumburl') or ii['url'], True)
        im = Image.open(io.BytesIO(b)).convert('RGB'); w, h = im.size
        im = im.crop((round(r[0] * w), round(r[1] * h), round(r[2] * w), round(r[3] * h)))
        if im.size[0] > 1280: im = im.resize((1280, round(im.size[1] * 1280 / im.size[0])), Image.LANCZOS)
        buf = io.BytesIO(); im.save(buf, 'JPEG', quality=86, optimize=True); data = buf.getvalue()
        hh = hashlib.sha256(data).hexdigest()[:16]
        open(os.path.join(d, 'kuvat', hh + '.jpg'), 'wb').write(data)
        tekija = strip(ii0['extmetadata'].get('Artist', {}).get('value', '')) or 'Tuntematon'
        ulos.append({'kohde': e['kohde'], 'kuvateksti': e['kuvateksti'], 'commons_tiedosto': e['commons_tiedosto'],
            'url': 'https://commons.wikimedia.org/wiki/' + urllib.parse.quote(e['commons_tiedosto'].replace(' ', '_'), safe=':/(),!\'~*'),
            'lisenssi': lic, 'tekija': tekija[:120], 'perustelu': e.get('perustelu', ''),
            **({'rajaus': r} if e.get('rajaus') else {}),
            'media_tiedosto': 'taivas/kuvat/%s.jpg' % hh,
            'paketti_leveys': im.size[0], 'paketti_korkeus': im.size[1], 'alkuperainen_leveys': ow, 'alkuperainen_korkeus': oh})
        print('ok', e['kohde'], lic, im.size)
    json.dump(ulos, open(os.path.join(d, k + '-kuvat.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('kirjoitettu', len(ulos), 'kuvaa')

if __name__ == '__main__':
    c = sys.argv[1] if len(sys.argv) > 1 else ''
    if c == 'haku': haku(sys.argv[2])
    elif c == 'esikatsele': esikatsele(sys.argv[2])
    elif c == 'rakenna': rakenna(sys.argv[2])
    elif c == 'taivas': taivas(sys.argv[2])
    else: print(__doc__)
