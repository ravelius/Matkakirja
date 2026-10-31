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

from PIL import Image, ImageChops, ImageMath

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


def _sovella(im, a0, a1, b0, b1, gamma, kerroin, kroma_raja=0.35, reuna=(60, 200)):
    """Tasot ja gamma (sama käyrä kaikille kanaville), kylläisyys ja reunan suojaus.

    - Kylläisyys luminanssin ympäri (Rec. 709), mutta nosto vain vähäkylläisille pikseleille: pikselin oma kroma
      kroma_rajaa kohti → kerroin kohti 1 (KK 31.10.: kattojen kultaukset kirkastuivat keltaisiksi pisteiksi).
      Lasku (kerroin < 1) koskee kaikkia.
    - Reunan suojaus: puoliläpinäkyvä reuna ja usva (alfa < reuna[1]) saavat korjauksen vain osittain, alle
      reuna[0] ei lainkaan (KK 31.10.: Louvren ympärille tuli maitomainen huntu, kun gamma vaalensi usvan).
    """
    alfa = im.getchannel('A')
    alkup = im.convert('RGB')

    def kayra(i):
        # Gamma vain musta–valko-välillä; sen ulkopuolella LINEAARINEN jatke eikä katkaisu (KK 31.10. Louvre: täyden
        # koon ohuet ääriviivat ovat mustaa pistettä tummempia, ja katkaisu vaalensi ne maitomaiseksi hunnuksi).
        x = (i / 255 - a0) / (a1 - a0)
        if x < 0:
            y = b0 + (b1 - b0) * x * min(1.0, gamma)
        elif x > 1:
            y = b1 + (b1 - b0) * (x - 1)
        else:
            y = b0 + (b1 - b0) * x ** gamma
        return max(0, min(255, round(255 * y)))
    # Käyrä LUMINANSSILLE, muutos lisätään kaikkiin kanaviin (sävy ja kroma säilyvät; kanavittainen käyrä nosti tumman
    # pikselin vaaleita kanavia ja musta piste karkasi, KK 31.10. Louvre).
    L = alkup.convert('L', (0.2126, 0.7152, 0.0722, 0))
    L2 = L.point([kayra(i) for i in range(256)])
    rgb = Image.merge('RGB', [ImageMath.lambda_eval(lambda a: a['c'] + a['u'] - a['v'], c=c, u=L2, v=L).convert('L')
                              for c in alkup.split()])
    if abs(kerroin - 1) > 1e-3:
        L = rgb.convert('L', (0.2126, 0.7152, 0.0722, 0))
        harmaa = Image.merge('RGB', (L, L, L))
        kyll = Image.blend(harmaa, rgb, kerroin)
        if kerroin > 1:
            r, g, b = rgb.split()
            kroma = ImageChops.subtract(ImageChops.lighter(ImageChops.lighter(r, g), b),
                                        ImageChops.darker(ImageChops.darker(r, g), b))
            raja = 255 * kroma_raja
            paino = kroma.point([max(0, min(255, round(255 * (1 - c / raja)))) for c in range(256)])
            kyll = Image.composite(kyll, rgb, paino)
        rgb = kyll
    r0, r1 = reuna
    suoja = alfa.point([0 if a <= r0 else 255 if a >= r1 else round(255 * (a - r0) / (r1 - r0)) for a in range(256)])
    rgb = Image.composite(rgb, alkup, suoja)
    return Image.merge('RGBA', (*rgb.split(), alfa))


def tasaa(im, tavoite, kierroksia=12):
    """Sovittaa gamman, tasot ja kylläisyyden mittaamalla tulosta (koko kuva; mittaus 256 px:n kopiosta).

    Vaimennettu sovitus rajoissa (KK 31.10.: Louvren gamma karkasi alakattoon, kun musta piste ja gamma ajoivat
    toisiaan): gamma tavoitteen keskisävyyn, päätepisteet puolikkailla askelilla enintään ±0,12 tavoitteesta.
    Jos keski ei osu rajoissa, poikkeama jää näkyviin tuloksiin ja testi kertoo sen.
    """
    im = im.convert('RGBA')
    m = mitat(im)
    a0, a1 = m['musta'], max(m['musta'] + 1e-3, m['valko'])
    T0, T1, TK = tavoite['musta'], tavoite['valko'], tavoite['keski']
    b0, b1 = T0, T1
    k = min(0.999, max(0.001, (m['keski'] - a0) / (a1 - a0)))
    kt = min(0.999, max(0.001, (TK - b0) / (b1 - b0)))
    gamma = math.log(kt) / math.log(k)
    kerroin = tavoite['kroma'] / m['kroma'] if m['kroma'] > 1e-3 else 1.0
    gmin, gmax = tavoite.get('gamma_min', 0.55), tavoite.get('gamma_max', 2.0)
    kkatto, liik = tavoite.get('kylläisyys_katto', 2.0), tavoite.get('paatepiste_liikkuma', 0.12)
    for _ in range(kierroksia):
        gamma = min(gmax, max(gmin, gamma))
        kerroin = min(kkatto, max(0.3, kerroin))
        j = mitat(_sovella(im, a0, a1, b0, b1, gamma, kerroin))
        b0 = min(T0 + liik, max(T0 - liik, b0 + 0.5 * (T0 - j['musta'])))
        b1 = min(T1 + liik, max(T1 - liik, b1 + 0.5 * (T1 - j['valko'])))
        if 0 < j['keski'] < 1:
            gamma *= (math.log(TK) / math.log(j['keski'])) ** 0.7
        if j['kroma'] > 1e-3:
            kerroin *= (tavoite['kroma'] / j['kroma']) ** 0.7
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
