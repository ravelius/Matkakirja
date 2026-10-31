#!/usr/bin/env python3
"""KOHDEKARTAN PIIRROSTEN TASAUS (Karttaseppä 31.10.2026; omistaja 09.31 "Kaikki pitää olla samalla kontrastilla",
09.33 "Määrittele kaikille sama musta piste ja valkopiste ja Säädä Keski kontrasti yhteneväksi ja pudota saturaatiota
tarvittaessa", 09.34 "Mieti tapa joka on helppo monistaa kaikkiin kaupunkeihin"; PT/KK: yksi työkalu + yksi asetus).

Jokainen piirros tasataan OMANA kuvanaan samaan tavoitteeseen (tools/piirrostasaus.json):
  1) musta ja valkopiste: musteen (alfa > 200) luminanssin 2. ja 98. persentiili → tavoitteen musta/valko (tasot),
  2) keskisävyt: gamma niin, että musteen mediaani osuu tavoitteeseen,
  3) kylläisyys: musteen keskikroma (max − min) tavoitteeseen (alas aina tarvittaessa, ylös enintään katon verran).
Alfa ennallaan (leikkaus, varjot ja reunat eivät muutu). Alkuperäinen kuva jää striimikartalle (omistaja 09.17).

Käyttö (tools/tasaa-kohdekartan-piirrokset.mjs kutsuu):
  python3 -I tools/piirrostasaus.py mittaa <kuva> […]                 → JSON {kuva: mitat}
  python3 -I tools/piirrostasaus.py tasaa <asetus.json> <sisään> <ulos> […pareittain]  → JSON {ulos: mitat}
"""
import json
import math
import sys

from PIL import Image

RUUTU = 256


def _muste(im):
    pieni = im.convert('RGBA').resize((RUUTU, RUUTU), Image.BILINEAR)
    return [(r, g, b) for r, g, b, a in pieni.get_flattened_data() if a > 200]


def _lum(r, g, b):
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255


def _persentiili(arvot, p):
    s = sorted(arvot)
    return s[min(len(s) - 1, max(0, round(p * (len(s) - 1))))]


def mitat(im):
    """Musteen musta/valkopiste (lum p2/p98), mediaani ja keskikroma (0–1)."""
    px = _muste(im)
    if not px:
        return {'musta': 0.0, 'valko': 1.0, 'keski': 0.5, 'kroma': 0.0}
    lum = [_lum(*p) for p in px]
    return {
        'musta': round(_persentiili(lum, 0.02), 3),
        'valko': round(_persentiili(lum, 0.98), 3),
        'keski': round(_persentiili(lum, 0.50), 3),
        'kroma': round(sum(max(p) - min(p) for p in px) / (255 * len(px)), 3),
    }


def _sovella(im, a0, a1, b0, b1, gamma, kerroin):
    alfa = im.getchannel('A')
    rgb = im.convert('RGB')

    def kayra(i):
        x = (i / 255 - a0) / (a1 - a0)
        x = min(1.0, max(0.0, x)) ** gamma
        return max(0, min(255, round(255 * (b0 + (b1 - b0) * x))))
    rgb = rgb.point([kayra(i) for i in range(256)] * 3)
    if abs(kerroin - 1) > 1e-3:
        # Kylläisyys luminanssin ympäri (Rec. 709 -painot); harmaa (L) = sama kaikille kanaville.
        L = rgb.convert('L', (0.2126, 0.7152, 0.0722, 0))
        harmaa = Image.merge('RGB', (L, L, L))
        rgb = Image.blend(harmaa, rgb, kerroin)
    return Image.merge('RGBA', (*rgb.split(), alfa))


def tasaa(im, tavoite, kierroksia=8):
    """Sovittaa tasot, gamman ja kylläisyyden mittaamalla tulosta (koko kuva; mittaus 256 px:n kopiosta)."""
    im = im.convert('RGBA')
    m = mitat(im)
    a0, a1 = m['musta'], max(m['musta'] + 1e-3, m['valko'])
    b0, b1 = tavoite['musta'], tavoite['valko']
    k = min(0.999, max(0.001, (m['keski'] - a0) / (a1 - a0)))
    kt = min(0.999, max(0.001, (tavoite['keski'] - b0) / (b1 - b0)))
    gamma = math.log(kt) / math.log(k)
    kerroin = tavoite['kroma'] / m['kroma'] if m['kroma'] > 1e-3 else 1.0
    gmin, gmax, kkatto = tavoite.get('gamma_min', 0.45), tavoite.get('gamma_max', 2.2), tavoite.get('kylläisyys_katto', 1.6)
    for _ in range(kierroksia):
        gamma = min(gmax, max(gmin, gamma))
        kerroin = min(kkatto, max(0.3, kerroin))
        j = mitat(_sovella(im, a0, a1, b0, b1, gamma, kerroin))
        # Korjaukset: päätepisteet suoraan erotuksella, keski gamman kautta, kroma suhteella.
        b0 += tavoite['musta'] - j['musta']
        b1 += tavoite['valko'] - j['valko']
        if 0 < j['keski'] < 1 and 0 < tavoite['keski'] < 1:
            gamma *= math.log(tavoite['keski']) / math.log(j['keski'])
        if j['kroma'] > 1e-3:
            kerroin *= tavoite['kroma'] / j['kroma']
    gamma = min(gmax, max(gmin, gamma))
    kerroin = min(kkatto, max(0.3, kerroin))
    tulos = _sovella(im, a0, a1, b0, b1, gamma, kerroin)
    return tulos, m, mitat(tulos), {'tasot': [round(a0, 3), round(a1, 3), round(b0, 3), round(b1, 3)],
                                     'gamma': round(gamma, 3), 'kylläisyys': round(kerroin, 3)}


def main():
    komento, argit = sys.argv[1], sys.argv[2:]
    if komento == 'mittaa':
        print(json.dumps({p: mitat(Image.open(p)) for p in argit}))
    elif komento == 'tasaa':
        tavoite = json.load(open(argit[0], encoding='utf-8'))['tavoite']
        tulos = {}
        for sisaan, ulos in zip(argit[1::2], argit[2::2]):
            kuva, ennen, jalkeen, kertoimet = tasaa(Image.open(sisaan), tavoite)
            kuva.save(ulos, 'WEBP', quality=92, method=6, exact=True)
            tulos[ulos] = {'ennen': ennen, 'jälkeen': jalkeen, 'kertoimet': kertoimet}
        print(json.dumps(tulos, ensure_ascii=False))


if __name__ == '__main__':
    main()
