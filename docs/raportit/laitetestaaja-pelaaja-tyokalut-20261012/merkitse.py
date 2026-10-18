"""Kuvateksti omalle raidalleen kuvan ylä- tai alapuolelle (omistaja 12.14, EI kuvan päälle).

Käyttö:
  merkitse.py ulos.png "Selite" kuva.png [ylä|ala]            -> yksi kuva + selite
  merkitse.py ulos.png "Selite" kuva1.png kuva2.png [ylä|ala] -> kuvapari rinnakkain natiivikorkeudella
Kuva säilyy täysikokoisena; raita lisätään kuvan ulkopuolelle ja sen korkeus mitoitetaan tekstin mukaan.
"""
import sys
from PIL import Image, ImageDraw, ImageFont

FONTS = ['/System/Library/Fonts/Supplemental/Arial.ttf', '/System/Library/Fonts/Helvetica.ttc']


def fontti(koko):
    for p in FONTS:
        try:
            return ImageFont.truetype(p, koko)
        except Exception:
            pass
    return ImageFont.load_default()


def rivita(d, teksti, f, leveys):
    rivit = []
    for kappale in teksti.split('\n'):
        rivi = ''
        for sana in kappale.split(' '):
            koe = (rivi + ' ' + sana).strip()
            if d.textlength(koe, font=f) > leveys and rivi:
                rivit.append(rivi)
                rivi = sana
            else:
                rivi = koe
        rivit.append(rivi)
    return rivit


def merkitse(ulos, teksti, kuvat, paikka='ala'):
    ims = [Image.open(k).convert('RGB') for k in kuvat]
    h = max(i.height for i in ims)
    kuva = Image.new('RGB', (sum(i.width for i in ims), h), (0, 0, 0))
    x = 0
    for i in ims:
        kuva.paste(i, (x, 0))
        x += i.width
    W = kuva.width
    f = fontti(max(18, W // 45))
    mitta = ImageDraw.Draw(Image.new('RGB', (1, 1)))
    rivit = rivita(mitta, teksti, f, W * 0.96)
    rk = int(f.size * 1.35)
    raita_h = rk * len(rivit) + rk // 2
    ulko = Image.new('RGB', (W, h + raita_h), (24, 20, 16))
    y0 = 0 if paikka == 'ylä' else h
    ulko.paste(kuva, (0, raita_h if paikka == 'ylä' else 0))
    d = ImageDraw.Draw(ulko)
    ty = (0 if paikka == 'ylä' else h) + rk // 4
    for r in rivit:
        d.text((int(W * 0.02), ty), r, font=f, fill=(255, 235, 150))
        ty += rk
    ulko.save(ulos, optimize=True)


if __name__ == '__main__':
    a = sys.argv[1:]
    paikka = 'ala'
    if a and a[-1] in ('ylä', 'ala'):
        paikka = a.pop()
    merkitse(a[0], a[1], a[2:], paikka)
