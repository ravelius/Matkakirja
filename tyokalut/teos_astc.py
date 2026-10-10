# TAIDEMUSEON TEOSKUVA → ÄMPÄRIPAKETTI (Natiiviseppä 10.10.2026; PT 09.5x, suunnitelma luvut 5 ja 6.4).
# Lähde (JPEG/PNG/TIFF, jopa 15 000 px) → <ulos>/<teos>/:
#   seina.astcm        seinätaso: pitkä sivu ≤ 2048 px, ASTC 6×6 + koko mip-ketju (.astcm, kuten astc6.py)
#   yks/<z>/<x>_<y>.astc  yksityiskohtaruudut 512 × 512 px ASTC 6×6 ilman mipejä; tasot ZSeina+1 … Zmax
#   teos.json          mitat ja tasot (sama laskenta kuin Linssit/Ydin/Museo/MuseoRuudut.cs: TeosPyramidi)
# Reunaruudut täytetään reunapikseleillä 512 px:iin (ei mustaa vuotoa suodatuksessa); oikea sisältö on teos.jsonin
# tasomitoissa. Rivit alhaalta ylös (Unityn LoadRawTextureData-järjestys). Kooderi: Xcoden TextureConverter (ARM, Highest).
# Käyttö: python3 -I teos_astc.py <lähde> <teos-id> <ulos-kansio> [rinnakkain=8]
import json, os, struct, subprocess, sys, tempfile
from concurrent.futures import ThreadPoolExecutor
from PIL import Image

TC = '/Applications/Xcode.app/Contents/Developer/usr/bin/TextureConverter'
RUUTU, SEINA_MAX, LOHKO = 512, 2048, 6
Image.MAX_IMAGE_PIXELS = None


def pyramidi(w, h):
    pitka = max(w, h); zmax = 0
    while (RUUTU << zmax) < pitka: zmax += 1
    jaa = lambda a, z: max(1, (a + (1 << z) - 1) >> z)
    koko = lambda z: (jaa(w, zmax - z), jaa(h, zmax - z))
    zs = zmax
    while zs > 0 and max(koko(zs)) > SEINA_MAX: zs -= 1
    return zmax, zs, koko


def otsake(w, h):
    return bytes([0x13, 0xab, 0xa1, 0x5c, LOHKO, LOHKO, 1]) + w.to_bytes(3, 'little') + h.to_bytes(3, 'little') + (1).to_bytes(3, 'little')


def pakkaa(kuva, mipit):
    """PIL-kuva → (lohkodata tasoittain yhdistettynä, tasoja). Rivit käännetään alhaalta ylös ennen pakkausta."""
    d = tempfile.mkdtemp(); k = os.path.join(d, 'k.png'); x = os.path.join(d, 'k.ktx')
    kuva.convert('RGB').transpose(Image.FLIP_TOP_BOTTOM).save(k)
    arg = [TC, f'--compression_format=ASTC{LOHKO}x{LOHKO}', '--compression_quality=Highest', '--srgb_format', '--output=' + x, k]
    if not mipit: arg.insert(1, '--max_mipmaps=1')
    subprocess.run(arg, check=True, capture_output=True)
    b = open(x, 'rb').read()
    w, h = struct.unpack('<II', b[36:44]); tasoja = struct.unpack('<I', b[56:60])[0]; kv = struct.unpack('<I', b[60:64])[0]
    o = 64 + kv; data = b''; ww, hh = w, h
    for t in range(max(1, tasoja)):
        n = struct.unpack('<I', b[o:o + 4])[0]; data += b[o + 4:o + 4 + n]; o += 4 + n + ((4 - n % 4) % 4)
        assert n == -(-ww // LOHKO) * -(-hh // LOHKO) * 16, (t, n, ww, hh)
        ww, hh = max(1, ww // 2), max(1, hh // 2)
        if not mipit: break
    for f in (k, x): os.remove(f)
    os.rmdir(d)
    return data, (tasoja if mipit else 1)


def taytetty(kuva, x0, y0):
    """512²-ruutu kohdasta (x0, y0); yli menevä osa täytetään reunapikseleillä."""
    w, h = kuva.size
    pala = kuva.crop((x0, y0, min(w, x0 + RUUTU), min(h, y0 + RUUTU)))
    pw, ph = pala.size
    if (pw, ph) == (RUUTU, RUUTU): return pala
    r = Image.new('RGB', (RUUTU, RUUTU)); r.paste(pala, (0, 0))
    if pw < RUUTU: r.paste(pala.crop((pw - 1, 0, pw, ph)).resize((RUUTU - pw, ph)), (pw, 0))
    if ph < RUUTU: r.paste(r.crop((0, ph - 1, RUUTU, ph)).resize((RUUTU, RUUTU - ph)), (0, ph))
    return r


def main():
    if len(sys.argv) < 4: sys.exit('käyttö: teos_astc.py <lähde> <teos-id> <ulos> [rinnakkain]')
    lahde, teos, ulos = sys.argv[1], sys.argv[2], sys.argv[3]
    rinn = int(sys.argv[4]) if len(sys.argv) > 4 else 8
    kuva = Image.open(lahde).convert('RGB')
    w, h = kuva.size
    zmax, zs, koko = pyramidi(w, h)
    juuri = os.path.join(ulos, teos); os.makedirs(juuri, exist_ok=True)
    sw, sh = koko(zs)
    data, tasoja = pakkaa(kuva.resize((sw, sh), Image.LANCZOS), True)
    open(os.path.join(juuri, 'seina.astcm'), 'wb').write(otsake(sw, sh) + data)
    tasot = []
    tehtavat = []
    for z in range(zs + 1, zmax + 1):
        lw, lh = koko(z)
        taso = kuva if (lw, lh) == (w, h) else kuva.resize((lw, lh), Image.LANCZOS)
        c, r = -(-lw // RUUTU), -(-lh // RUUTU)
        os.makedirs(os.path.join(juuri, 'yks', str(z)), exist_ok=True)
        tasot.append({'z': z, 'leveys': lw, 'korkeus': lh, 'sarakkeita': c, 'riveja': r})
        for y in range(r):
            for x in range(c):
                tehtavat.append((taytetty(taso, x * RUUTU, y * RUUTU), os.path.join(juuri, 'yks', str(z), f'{x}_{y}.astc')))

    def tee(t):
        d, _ = pakkaa(t[0], False)
        open(t[1], 'wb').write(otsake(RUUTU, RUUTU) + d)
        return len(d) + 16

    with ThreadPoolExecutor(rinn) as ex: ruututavut = sum(ex.map(tee, tehtavat))
    tieto = {'teos': teos, 'leveys': w, 'korkeus': h, 'ruutu': RUUTU, 'lohko': f'{LOHKO}x{LOHKO}', 'zmax': zmax, 'zseina': zs,
             'seina': {'leveys': sw, 'korkeus': sh, 'tasoja': tasoja, 'tavut': len(data) + 16}, 'tasot': tasot,
             'ruutuja': len(tehtavat), 'ruututavut': ruututavut}
    json.dump(tieto, open(os.path.join(juuri, 'teos.json'), 'w'), ensure_ascii=False, indent=1)
    print(f'{teos}: {w}×{h} → seinä {sw}×{sh} ({len(data) + 16} t, {tasoja} tasoa), {len(tehtavat)} ruutua tasoilla {zs + 1}–{zmax} ({ruututavut} t)')


if __name__ == '__main__':
    main()
