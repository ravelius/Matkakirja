# TAIDEMUSEON SALI → ÄMPÄRIPAKETTI (Linssiseppä 10.10.2026, PT 11.2x). Linnanrakentajan valmis sali (_valmiit/taidemuseo-<maa>-v1)
# → <ulos>/sali-<versio>/, jonka MuseoRakennus.LataaSali lukee polusta <maan juuri>MuseoRakennus.SaliKansio (nyt sali-v2 = LR:n v2f):
#   sali-lod{0,1}.glb                 sellaisenaan (TEXCOORD_0 toisto, TEXCOORD_1 valoatlas; upotetut kuvat vain simulaattorin varana)
#   valot/sali-lod{0,1}-4x4.astcm     LR:n valoatlas sellaisenaan (E / 1200 lx, sRGB)
#   valot/sali-lod{0,1}.jpg           sama JPEG:nä iOS-simulaattorille (ei ASTC:tä; tekstuurit silloin glb:n upotetuista JPEG:istä)
#   tekstuurit/<materiaali>.astcm     LR:n tekstuurit/<nimi>.jpg → ASTC 6×6 + mipit (teos_astc.pakkaa, rivit alhaalta ylös, sRGB)
#   LAHTEET.md                        LR:n lähdeluettelo + tämän paketin rivit
# Tekstuuri tehdään jokaiselle glb-materiaalille, jolla on baseColorTexture ja samanniminen tekstuurit/<nimi>.jpg.
# Käyttö: python3 -I museo_sali_paketti.py <LR:n kansio> <ulos> [versio, oletus v2]
import json, os, shutil, struct, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from PIL import Image
import teos_astc


def materiaalit(glb):
    b = open(glb, 'rb').read()
    n = struct.unpack('<I', b[12:16])[0]
    j = json.loads(b[20:20 + n])
    return [m['name'] for m in j['materials'] if 'baseColorTexture' in m.get('pbrMetallicRoughness', {})]


def main():
    if len(sys.argv) < 3: sys.exit('käyttö: museo_sali_paketti.py <LR:n kansio> <ulos> [versio, oletus v2]')
    versio = sys.argv[3] if len(sys.argv) > 3 else 'v2'
    lr, ulos = sys.argv[1], os.path.join(sys.argv[2], 'sali-' + versio)
    for k in ('', 'valot', 'tekstuurit'): os.makedirs(os.path.join(ulos, k), exist_ok=True)
    nimet = set()
    for lod in (0, 1):
        g = os.path.join(lr, 'glb', f'sali-lod{lod}.glb')
        shutil.copyfile(g, os.path.join(ulos, f'sali-lod{lod}.glb'))
        for v in (f'sali-lod{lod}-4x4.astcm', f'sali-lod{lod}.jpg'):
            shutil.copyfile(os.path.join(lr, 'valot', v), os.path.join(ulos, 'valot', v))
        nimet.update(materiaalit(g))
    puuttuu = []
    for nimi in sorted(nimet):
        lahde = os.path.join(lr, 'tekstuurit', nimi + '.jpg')
        if not os.path.exists(lahde): puuttuu.append(nimi); continue
        kuva = Image.open(lahde).convert('RGB')
        data, _ = teos_astc.pakkaa(kuva, True)
        open(os.path.join(ulos, 'tekstuurit', nimi + '.astcm'), 'wb').write(teos_astc.otsake(*kuva.size) + data)
        print(f'{nimi}: {kuva.size[0]}×{kuva.size[1]} → {len(data) / 1e6:.2f} Mt', flush=True)
    with open(os.path.join(ulos, 'LAHTEET.md'), 'w', encoding='utf-8') as f:
        f.write(open(os.path.join(lr, 'LAHTEET.md'), encoding='utf-8').read().rstrip() + '\n\n')
        f.write(f'## Ämpäripaketti sali-{versio} (Linssiseppä, tyokalut/museo_sali_paketti.py)\n\n'
                '- sali-lod{0,1}.glb ja valot/*.astcm: Linnanrakentajan tiedostot sellaisenaan (oma työ).\n'
                '- tekstuurit/*.astcm: LR:n tekstuurit/*.jpg ASTC 6×6 -pakattuina (oma työ / Poly Haven CC0, ks. LR:n tekstuurit/LAHTEET.md).\n')
    koko = sum(os.path.getsize(os.path.join(d, x)) for d, _, xs in os.walk(ulos) for x in xs)
    print(f'sali-{versio}: {len(nimet) - len(puuttuu)} tekstuuria, puuttuu {puuttuu or "-"}, yhteensä {koko / 1e6:.1f} Mt → {ulos}')


if __name__ == '__main__':
    main()
