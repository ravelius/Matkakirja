#!/usr/bin/env python3
"""OMIEN MALLIEN TEKSTUURIT KTX2:KSI (Linssiseppä 2, 9.10.2026; Natiivisepän ehdotus junaan 174, PT 22.4x).

JPEG/PNG puretaan GPU:lle pakkaamattomana RGBA32:na (4 tavua/px + mipit). KTX2 (KHR_texture_basisu) pysyy pakattuna GPU:lle asti
(Cesium for Unity 1.25: cesium-native purkaa Basisin laitteen tukemaan muotoon): UASTC → ASTC 4×4 iOS:llä (1 tavu/px),
ETC1S → ETC1/ETC2 (0,5 tavua/px, alfan kanssa 1). Mipit generoidaan valmiiksi (Cesium ei generoi KTX2:lle).

Valinta tekstuureittain:
  - normaalikartat UASTC (ETC1S hajottaa normaalit),
  - muut ETC1S, myös isot valokuva-atlakset (oletus; --atlakset uastc pitää atlakset UASTC:nä: tiedosto ~1,6×, GPU 2×).
    Mitattu 9.10. KL v6j lod0: JPEG 16,2 Mt / GPU 168 Mt → ETC1S-atlas 18,1 / 23 Mt, UASTC-atlas 25,3 / 37 Mt; ero 2× suurennoksessa pieni.

Käyttö: omat_mallit_ktx2.py <omat-mallit/vX-kansio> <ulos-kansio> [--vain kohde1,kohde2] [--uastc-taso 2] [--etc1s-laatu 192]
       [--atlakset etc1s|uastc] [--normaali-max 1024]
Työkalut: gltf-transform (npm @gltf-transform/cli 4.5) ja toktx (KTX-Software 4.4); polut ympäristöstä GLTF_TRANSFORM ja KTX_BIN
(oletus T7:n linssiseppa2-tyokalut). Muut tiedostot (tileset.json, mallit.json, helma.glb jos ei tekstuureja) kopioidaan sellaisinaan.
Lopuksi taulukko: tiedostokoko ja GPU-arvio (tekstuurit, mipit mukana) ennen/jälkeen kohteittain, ja automaattinen tarkistus.
Pelkkä tarkistus: omat_mallit_ktx2.py --tarkista <lähde> <ulos> (paluuarvo 1, jos virheitä).
"""
import argparse, io, json, os, shutil, struct, subprocess, sys, tempfile

T7 = '/Volumes/T7 4TB/koodaus/linssiseppa2-tyokalut'
GT = os.environ.get('GLTF_TRANSFORM', os.path.join(T7, 'gltf-transform', 'node_modules', '.bin', 'gltf-transform'))
KTX_BIN = os.environ.get('KTX_BIN', os.path.join(T7, 'ktx', 'bin'))
ISO_SIVU = 2048
ATLAS_NIMET = ('atlas', 'maa', 'kuori')


def lue_glb(polku):
    d = open(polku, 'rb').read()
    n, _ = struct.unpack_from('<II', d, 12); j = json.loads(d[20:20 + n])
    o = 20 + n; bl = struct.unpack_from('<I', d, o)[0] if o < len(d) else 0
    return j, d[o + 8:o + 8 + bl]


def kuvan_koko(data, mime):
    """(leveys, korkeus, muoto) JPEG/PNG/KTX2-otsakkeesta ilman purkua."""
    if mime == 'image/png':
        return struct.unpack('>II', data[16:24]) + ('png',)
    if mime == 'image/ktx2':
        w, h = struct.unpack_from('<II', data, 20)
        scheme = struct.unpack_from('<I', data, 44)[0]   # supercompressionScheme: 1 = BasisLZ (ETC1S), 0/2 = UASTC (+ zstd)
        return w, h, ('etc1s' if scheme == 1 else 'uastc')
    i = 2
    while i < len(data):                                 # JPEG: SOFn-lohko
        if data[i] != 0xFF: i += 1; continue
        m = data[i + 1]; L = struct.unpack('>H', data[i + 2:i + 4])[0]
        if m in (0xC0, 0xC1, 0xC2):
            h, w = struct.unpack('>HH', data[i + 5:i + 9]); return w, h, 'jpeg'
        i += 2 + L
    return 0, 0, 'tuntematon'


def gpu_arvio(polku):
    """Tekstuurien GPU-muisti tavuina (mipit 4/3): JPEG/PNG RGBA32 4 B/px, UASTC→ASTC 1, ETC1S→ETC 0,5 (alfa 1)."""
    j, B = lue_glb(polku); views = j.get('bufferViews', []); yht = 0
    for im in j.get('images', []):
        v = views[im['bufferView']]; data = B[v.get('byteOffset', 0):v.get('byteOffset', 0) + v['byteLength']]
        w, h, f = kuvan_koko(data, im.get('mimeType', ''))
        bpp = {'jpeg': 4, 'png': 4, 'uastc': 1, 'etc1s': 0.5}.get(f, 4)
        yht += w * h * bpp * 4 / 3
    return yht


def tekstuurit(polku):
    """[(nimi, slotit, sivu)] glTF-tekstuureista; nimi kuten gltf-transform --pattern sen näkee (image.name)."""
    j, B = lue_glb(polku); views = j.get('bufferViews', []); slot = {}
    for m in j.get('materials', []):
        p = m.get('pbrMetallicRoughness', {})
        for s, t in (('baseColorTexture', p.get('baseColorTexture')), ('metallicRoughnessTexture', p.get('metallicRoughnessTexture')),
                     ('normalTexture', m.get('normalTexture')), ('occlusionTexture', m.get('occlusionTexture')), ('emissiveTexture', m.get('emissiveTexture'))):
            if t: slot.setdefault(j['textures'][t['index']]['source'], set()).add(s)
    tulos = []
    for i, im in enumerate(j.get('images', [])):
        v = views[im['bufferView']]; data = B[v.get('byteOffset', 0):v.get('byteOffset', 0) + v['byteLength']]
        w, h, _ = kuvan_koko(data, im.get('mimeType', '')); tulos.append((im.get('name', f'kuva{i}'), slot.get(i, set()), max(w, h)))
    return tulos


def aja(args):
    env = dict(os.environ, PATH=KTX_BIN + os.pathsep + os.environ.get('PATH', ''))
    r = subprocess.run([GT] + args, env=env, capture_output=True, text=True)
    if r.returncode: raise SystemExit(f'gltf-transform {args[0]} epäonnistui:\n{r.stdout[-2000:]}\n{r.stderr[-2000:]}')


def glob(nimet):
    """gltf-transformin --pattern on glob (micromatch): {a,b,c}; yksi nimi ilman aaltosulkeita."""
    return nimet[0] if len(nimet) == 1 else '{' + ','.join(nimet) + '}'


def muunna(sisaan, ulos, a):
    tx = tekstuurit(sisaan)
    if not tx: shutil.copyfile(sisaan, ulos); return
    atlas = lambda n, sivu: a.atlakset == 'uastc' and (any(k in n.lower() for k in ATLAS_NIMET) or sivu >= ISO_SIVU)
    uastc = [n for n, s, sivu in tx if 'normalTexture' in s or atlas(n, sivu)]
    with tempfile.TemporaryDirectory() as td:
        nyt = sisaan
        nor = [n for n, s, sivu in tx if 'normalTexture' in s and a.normaali_max and sivu > a.normaali_max]
        if nor:
            seur = os.path.join(td, 'n.glb')
            aja(['resize', nyt, seur, '--pattern', glob(nor), '--width', str(a.normaali_max), '--height', str(a.normaali_max)]); nyt = seur
        if uastc:
            seur = os.path.join(td, 'a.glb')
            aja(['uastc', nyt, seur, '--pattern', glob(uastc),
                 '--level', str(a.uastc_taso), '--zstd', '18', '--jobs', '8'])   # huom. gltf-transform 4.5 ei välitä RDO-lippuja ktx createlle
            nyt = seur
        loput = [n for n, s, sivu in tx if n not in uastc]
        if loput:
            seur = os.path.join(td, 'b.glb')
            aja(['etc1s', nyt, seur, '--pattern', glob(loput),
                 '--quality', str(a.etc1s_laatu), '--jobs', '8'])
            nyt = seur
        if 'KHR_draco_mesh_compression' in (lue_glb(sisaan)[0].get('extensionsUsed') or []):   # gltf-transform purkaa Dracon → pakataan takaisin
            seur = os.path.join(td, 'd.glb')
            aja(['draco', nyt, seur, '--quantize-position', '14', '--quantize-normal', '10', '--quantize-texcoord', '12', '--quantize-color', '10']); nyt = seur
        shutil.copyfile(nyt, ulos)


def tarkista(lahde, ulos):
    """Automaattinen todennus (ei simua): jokainen kuva KTX2 + KHR_texture_basisu pakollisena, täysi mip-ketju, sivut 4:llä jaollisia,
    geometria sama kuin lähteessä (kolmiot ja POSITION-rajat), glTF-validaattori 0 virhettä. Palauttaa virherivit."""
    virheet = []; tiedoksi = []; n_glb = n_kuva = 0
    for juuri, _, tiedostot in sorted(os.walk(ulos)):
        for n in sorted(tiedostot):
            if not n.endswith('.glb'): continue
            u = os.path.join(juuri, n); s = os.path.join(lahde, os.path.relpath(u, ulos)); nimi = os.path.relpath(u, ulos); n_glb += 1
            j, B = lue_glb(u); js, _ = lue_glb(s)
            if j.get('images') and 'KHR_texture_basisu' not in (j.get('extensionsRequired') or []): virheet.append(f'{nimi}: KHR_texture_basisu ei pakollinen')
            for t in j.get('textures', []):
                if 'source' in t or 'KHR_texture_basisu' not in t.get('extensions', {}): virheet.append(f'{nimi}: tekstuuri ilman basisu-lähdettä')
            for im in j.get('images', []):
                n_kuva += 1; v = j['bufferViews'][im['bufferView']]; d = B[v.get('byteOffset', 0):v.get('byteOffset', 0) + v['byteLength']]
                if im.get('mimeType') != 'image/ktx2' or d[:12] != b'\xabKTX 20\xbb\r\n\x1a\n': virheet.append(f'{nimi}/{im.get("name")}: ei KTX2'); continue
                w, h = struct.unpack_from('<II', d, 20); tasot = struct.unpack_from('<I', d, 40)[0]
                if w % 4 or h % 4: virheet.append(f'{nimi}/{im.get("name")}: {w}x{h} ei 4:llä jaollinen')
                if tasot != max(w, h).bit_length(): virheet.append(f'{nimi}/{im.get("name")}: mip-tasoja {tasot}, pitäisi {max(w, h).bit_length()}')
            kolmiot = lambda g: sum(g['accessors'][p_['indices']]['count'] // 3 for m in g['meshes'] for p_ in m['primitives'] if 'indices' in p_)
            rajat = lambda g: [[round(f(x[k][i] for x in g['accessors'] if x.get('type') == 'VEC3' and 'min' in x and k == ('min' if f is min else 'max')), 2) for i in range(3)] for f, k in ((min, 'min'), (max, 'max'))]
            draco = 'KHR_draco_mesh_compression' in (js.get('extensionsUsed') or [])
            if kolmiot(j) > kolmiot(js) or (kolmiot(j) < kolmiot(js) and not draco): virheet.append(f'{nimi}: kolmiot {kolmiot(js)} → {kolmiot(j)}')
            elif kolmiot(j) < kolmiot(js): tiedoksi.append(f'{nimi}: Draco poisti {kolmiot(js) - kolmiot(j)} surkastunutta kolmiota')   # Sfinksi 9.10.: 6204 nollapinta-alaista (Blender)
            if any(abs(a_ - b_) > 0.05 for ra, rb in zip(rajat(j), rajat(js)) for a_, b_ in zip(ra, rb)): virheet.append(f'{nimi}: rajat {rajat(js)} → {rajat(j)}')
            env = dict(os.environ, PATH=KTX_BIN + os.pathsep + os.environ.get('PATH', ''))
            r = subprocess.run([GT, 'validate', u, '--format', 'csv'], env=env, capture_output=True, text=True)
            import csv   # vakavuus 0 = virhe (1 varoitus: validaattori ei tunne KHR_texture_basisua → image/ktx2 varoituksena)
            err = [r_['code'] + ' ' + r_['pointer'] for r_ in csv.DictReader(io.StringIO(r.stdout)) if r_.get('severity') == '0']
            if r.returncode or err: virheet.append(f'{nimi}: validaattori {len(err)} virhettä {err[:2]} {r.stderr[-200:]}')
    print(f'TARKISTUS {n_glb} glb, {n_kuva} kuvaa: {len(virheet)} virhettä, {len(tiedoksi)} tiedoksi'); [print('  ' + v) for v in virheet[:40] + tiedoksi[:40]]
    return virheet


def main():
    if len(sys.argv) == 4 and sys.argv[1] == '--tarkista': sys.exit(1 if tarkista(sys.argv[2], sys.argv[3]) else 0)
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument('lahde'); p.add_argument('ulos'); p.add_argument('--vain', default='')
    p.add_argument('--uastc-taso', type=int, default=2); p.add_argument('--etc1s-laatu', type=int, default=192)
    p.add_argument('--normaali-max', type=int, default=0, help='normaalikarttojen suurin sivu (0 = ennallaan; 1024 puolittaa 2048-karttojen tiedoston)')
    p.add_argument('--atlakset', choices=('uastc', 'etc1s'), default='etc1s', help='isojen valokuva-atlasten muoto')
    a = p.parse_args()
    if not os.path.exists(GT): raise SystemExit(f'gltf-transform puuttuu: {GT}')
    if os.path.abspath(a.lahde) == os.path.abspath(a.ulos) or os.path.exists(a.ulos): raise SystemExit('ulos-kansio on uusi kansio')
    vain = set(filter(None, a.vain.split(',')))
    shutil.copytree(a.lahde, a.ulos)
    rivit = []
    for juuri, _, tiedostot in sorted(os.walk(a.ulos)):
        kohde = os.path.basename(juuri)
        if vain and kohde not in vain: continue
        for n in sorted(tiedostot):
            if not n.endswith('.glb'): continue
            u = os.path.join(juuri, n); s = os.path.join(a.lahde, os.path.relpath(u, a.ulos))
            muunna(s, u, a)
            rivit.append((f'{kohde}/{n}', os.path.getsize(s), os.path.getsize(u), gpu_arvio(s), gpu_arvio(u)))
            print(f'{kohde}/{n}: {rivit[-1][1] / 1e6:.1f} → {rivit[-1][2] / 1e6:.1f} Mt tiedosto, GPU {rivit[-1][3] / 1e6:.1f} → {rivit[-1][4] / 1e6:.1f} Mt', flush=True)
    yht = [sum(r[i] for r in rivit) for i in (1, 2, 3, 4)]
    print(f'YHTEENSÄ {len(rivit)} glb: tiedostot {yht[0] / 1e6:.1f} → {yht[1] / 1e6:.1f} Mt, GPU {yht[2] / 1e6:.1f} → {yht[3] / 1e6:.1f} Mt')
    json.dump({'glb': [dict(zip(('tiedosto', 'koko_ennen', 'koko_jalkeen', 'gpu_ennen', 'gpu_jalkeen'), r)) for r in rivit]},
              open(os.path.normpath(a.ulos) + '-ktx2-raportti.json', 'w'), indent=1)   # kansion viereen (ei ämpäriin)
    if tarkista(a.lahde, a.ulos): sys.exit(1)


if __name__ == '__main__':
    main()
