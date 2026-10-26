#!/usr/bin/env python3
# Olavinlinna: liekki:-tyhjien koko-extra liekkipankin tavoitekokoon (Linnanrakentaja 4.10.2026).
#   python3 tools/dioraama/liekkikoot-glb.py <tilat-kansio> [--kuiva]
# Kun JSON-liekit korvattiin glb:n liekki:-solmuilla (Siirtoseppä 29.9.), natiivi alkoi lukea liekin korkeuden
# extras.koko-kentästä (DioraamaLiekit.LisaaTyhja: korkeus = koko, leveys = 0,6 × korkeus). leivo_tila.py kirjoitti
# siihen omat pienemmät perusarvonsa (tulisija 0,45, soihtu 0,25, kynttilä 0,045), kun JSON-polku käytti
# liekkipankin js/dioraama/pankit/liekit.js koko_m-korkeutta (0,52 / 0,6 / 0,1). Soihdut kutistuivat noin 40 %:iin.
# Tämä työkalu skaalaa valmiiden (leivottujen) glb:iden koko-extran: uusi = vanha / vanha_perus × uusi_perus.
# Leivottu valo, geometria ja muut extrat säilyvät tavu tavulta; vain JSON-osa kirjoitetaan uudelleen.
import json, os, struct, sys

VANHA = {'tulisija': 0.45, 'soihtu': 0.25, 'kynttila': 0.045}   # leivo_tila.py LIEKKIKOOT ennen 4.10.
UUSI = {'tulisija': 0.52, 'soihtu': 0.6, 'kynttila': 0.1}       # liekit.js koko_m[1] (JSON-polun korkeus)


def lue(polku):
    b = open(polku, 'rb').read()
    taika, versio, _ = struct.unpack('<III', b[:12])
    assert taika == 0x46546C67 and versio == 2, polku
    jl, jt = struct.unpack('<II', b[12:20]); assert jt == 0x4E4F534A
    return json.loads(b[20:20 + jl]), b[20 + jl:]


def kirjoita(polku, j, loput):
    jb = json.dumps(j, separators=(',', ':'), ensure_ascii=False).encode('utf-8')
    jb += b' ' * ((4 - len(jb) % 4) % 4)
    otsake = struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(jb) + len(loput)) + struct.pack('<II', len(jb), 0x4E4F534A)
    open(polku, 'wb').write(otsake + jb + loput)


def main():
    kansio, kuiva = sys.argv[1], '--kuiva' in sys.argv
    for f in sorted(os.listdir(kansio)):
        if not f.endswith('.glb'): continue
        p = os.path.join(kansio, f); j, loput = lue(p); muut = []
        for n in j.get('nodes', []):
            nimi = n.get('name', '')
            if not nimi.startswith('liekki:'): continue
            laji = nimi.split('-', 1)[-1]; e = n.get('extras', {})
            if laji not in VANHA or 'koko' not in e or e.get('koko_pankki'): continue   # koko_pankki: jo korjattu (ajo on idempotentti)
            vanha = e['koko']; uusi = round(vanha / VANHA[laji] * UUSI[laji], 3)
            e['koko'] = uusi; e['koko_pankki'] = 1; muut.append(f'{nimi} {vanha}→{uusi}')
        print(f, len(muut), 'muutosta', '; '.join(muut[:4]) + (' …' if len(muut) > 4 else ''))
        if muut and not kuiva: kirjoita(p, j, loput)


if __name__ == '__main__':
    main()
