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
Vientiportti: omat_mallit_ktx2.py --portti <paketti> (teksturoitu mesh tai materiaali vain yhdessä solmussa/primitiivissä; testit omat_mallit_portti_testi.py).
Vain puusolmut yhdeksi (JPEG-paketit, vanhat apit): omat_mallit_ktx2.py --instanssit <lähde> <ulos>; KTX2-muunnos tekee sen aina ensin.
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


INSTANSSIT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'omat_mallit_instanssit.mjs')


def instanssit(sisaan, ulos):
    """Jaetut teksturoidut meshit yhdeksi (omat_mallit_instanssit.mjs); ei jaettuja → kopio. Palauttaa tulosterivin."""
    j, _ = lue_glb(sisaan); k = {}
    for x in j.get('nodes', []):
        if 'mesh' in x: k[x['mesh']] = k.get(x['mesh'], 0) + 1
    tekst = lambda mi: mi is not None and (any(t in j['materials'][mi].get('pbrMetallicRoughness', {}) for t in ('baseColorTexture', 'metallicRoughnessTexture'))
                                           or any(t in j['materials'][mi] for t in ('normalTexture', 'occlusionTexture', 'emissiveTexture')))
    if not portti_glb(j)[0]:
        shutil.copyfile(sisaan, ulos); return None   # portti läpi (ei instanssi- eikä materiaaliansaa) → tavu tavulta
    nm = os.path.join(os.path.dirname(os.path.dirname(GT)))
    r = subprocess.run(['node', INSTANSSIT, sisaan, ulos], env=dict(os.environ, GLTF_TRANSFORM_NM=nm), capture_output=True, text=True)
    if r.returncode: raise SystemExit(f'instanssit epäonnistui {sisaan}:\n{r.stdout}\n{r.stderr[-2000:]}')
    return r.stdout.strip()


def glob(nimet):
    """gltf-transformin --pattern on glob (micromatch): {a,b,c}; yksi nimi ilman aaltosulkeita."""
    return nimet[0] if len(nimet) == 1 else '{' + ','.join(nimet) + '}'


def muunna(sisaan, ulos, a):
    tx = tekstuurit(sisaan)
    if not tx: instanssit(sisaan, ulos); return
    atlas = lambda n, sivu: a.atlakset == 'uastc' and (any(k in n.lower() for k in ATLAS_NIMET) or sivu >= ISO_SIVU)
    uastc = [n for n, s, sivu in tx if 'normalTexture' in s or atlas(n, sivu)]
    with tempfile.TemporaryDirectory() as td:
        nyt = os.path.join(td, 'i.glb'); instanssit(sisaan, nyt)   # puusolmut yhdeksi ennen tekstuureja
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


PIDA_SOLMUT = {'spiira'}   # tarkoituksella erilliset solmut (Riddarholmenin spiira piilotettavissa)


def portti_glb(j, nimi='glb'):
    """VIENTIPORTTI (PT 10.10. 01.0x): Cesium for Unity luo tekstuurin primitiiviä (solmu × primitiivi × tekstuuripaikka) kohden.
    Hylkää: 1) teksturoitu mesh useassa solmussa (ND:n puut), 2) teksturoitu materiaali useassa primitiivissä (KL v6j:n atlas 7 ×).
    Tiedoksi: Cesiumin tekstuuriarvio vs. glb:n kuvat (eri materiaalit voivat jakaa kuvan aiheellisesti). Palauttaa (virheet, arvio, kuvat)."""
    virheet = []
    paikat = lambda mi: 0 if mi is None else sum(1 for k in ('baseColorTexture', 'metallicRoughnessTexture') if k in j['materials'][mi].get('pbrMetallicRoughness', {})) + sum(1 for k in ('normalTexture', 'occlusionTexture', 'emissiveTexture') if k in j['materials'][mi])
    kaytto, mat, arvio = {}, {}, 0
    for x in j.get('nodes', []):
        if 'mesh' not in x: continue
        kaytto[x['mesh']] = kaytto.get(x['mesh'], 0) + 1
        for p_ in j['meshes'][x['mesh']]['primitives']:
            arvio += paikat(p_.get('material'))
            if paikat(p_.get('material')) and x.get('name') not in PIDA_SOLMUT: mat[p_['material']] = mat.get(p_['material'], 0) + 1
    for mi_, k_ in kaytto.items():
        if k_ > 1 and any(paikat(p_.get('material')) for p_ in j['meshes'][mi_]['primitives']):
            virheet.append(f'{nimi}: teksturoitu mesh {j["meshes"][mi_].get("name")} {k_} solmussa')
    for mi_, k_ in mat.items():
        if k_ > 1 and not any(kaytto.get(m_, 0) > 1 for m_, mm in enumerate(j['meshes']) for p_ in mm['primitives'] if p_.get('material') == mi_):
            virheet.append(f'{nimi}: teksturoitu materiaali {j["materials"][mi_].get("name")} {k_} primitiivissä')
    return virheet, arvio, len(j.get('images', []))


def portti(kansio):
    """Koko paketti (kansion kaikki glb:t). Paluuarvo: virherivit; tulostaa myös tekstuuriarvion kohteittain."""
    virheet = []
    for juuri, _, tiedostot in sorted(os.walk(kansio)):
        for n in sorted(tiedostot):
            if not n.endswith('.glb'): continue
            nimi = os.path.relpath(os.path.join(juuri, n), kansio); j, _ = lue_glb(os.path.join(juuri, n))
            v, arvio, kuvat = portti_glb(j, nimi); virheet += v
            if arvio > kuvat: print(f'  tiedoksi {nimi}: Cesiumin tekstuuriarvio {arvio} > {kuvat} kuvaa (eri materiaalit jakavat kuvia)')
    print(f'PORTTI {kansio}: {len(virheet)} virhettä'); [print('  ' + v) for v in virheet[:40]]
    return virheet


def tarkista(lahde, ulos, ktx2=True):
    """Automaattinen todennus (ei simua): jokainen kuva KTX2 + KHR_texture_basisu pakollisena, täysi mip-ketju, sivut 4:llä jaollisia,
    geometria sama kuin lähteessä (kolmiot ja POSITION-rajat), glTF-validaattori 0 virhettä. Palauttaa virherivit."""
    virheet = []; tiedoksi = []; n_glb = n_kuva = 0
    for juuri, _, tiedostot in sorted(os.walk(ulos)):
        for n in sorted(tiedostot):
            if not n.endswith('.glb'): continue
            u = os.path.join(juuri, n); s = os.path.join(lahde, os.path.relpath(u, ulos)); nimi = os.path.relpath(u, ulos); n_glb += 1
            j, B = lue_glb(u); js, _ = lue_glb(s)
            virheet += portti_glb(j, nimi)[0]   # instanssi- ja materiaaliansa (vientiportti)
            if not ktx2: pass
            elif j.get('images') and 'KHR_texture_basisu' not in (j.get('extensionsRequired') or []): virheet.append(f'{nimi}: KHR_texture_basisu ei pakollinen')
            for t in (j.get('textures', []) if ktx2 else []):
                if 'source' in t or 'KHR_texture_basisu' not in t.get('extensions', {}): virheet.append(f'{nimi}: tekstuuri ilman basisu-lähdettä')
            for im in (j.get('images', []) if ktx2 else []):
                n_kuva += 1; v = j['bufferViews'][im['bufferView']]; d = B[v.get('byteOffset', 0):v.get('byteOffset', 0) + v['byteLength']]
                if im.get('mimeType') != 'image/ktx2' or d[:12] != b'\xabKTX 20\xbb\r\n\x1a\n': virheet.append(f'{nimi}/{im.get("name")}: ei KTX2'); continue
                w, h = struct.unpack_from('<II', d, 20); tasot = struct.unpack_from('<I', d, 40)[0]
                if w % 4 or h % 4: virheet.append(f'{nimi}/{im.get("name")}: {w}x{h} ei 4:llä jaollinen')
                if tasot != max(w, h).bit_length(): virheet.append(f'{nimi}/{im.get("name")}: mip-tasoja {tasot}, pitäisi {max(w, h).bit_length()}')
            kolmiot = lambda g: sum(g['accessors'][p_['indices']]['count'] // 3 for x in g.get('nodes', []) if 'mesh' in x for p_ in g['meshes'][x['mesh']]['primitives'] if 'indices' in p_)   # piirrettävät (solmuittain)
            jaettu_lahde = len([x for x in js.get('nodes', []) if 'mesh' in x]) != len({x['mesh'] for x in js.get('nodes', []) if 'mesh' in x})
            rajat = lambda g: [[round(f(x[k][i] for x in g['accessors'] if x.get('type') == 'VEC3' and 'min' in x and k == ('min' if f is min else 'max')), 2) for i in range(3)] for f, k in ((min, 'min'), (max, 'max'))]
            draco = 'KHR_draco_mesh_compression' in (js.get('extensionsUsed') or [])
            if kolmiot(j) > kolmiot(js) or (kolmiot(j) < kolmiot(js) and not draco): virheet.append(f'{nimi}: kolmiot {kolmiot(js)} → {kolmiot(j)}')
            elif kolmiot(j) < kolmiot(js): tiedoksi.append(f'{nimi}: Draco poisti {kolmiot(js) - kolmiot(j)} surkastunutta kolmiota')   # Sfinksi 9.10.: 6204 nollapinta-alaista (Blender)
            # jaetut lähteet: maailmarajat tarkistaa omat_mallit_instanssit.mjs (accessorien rajat muuttuvat leivonnassa)
            if not jaettu_lahde and any(abs(a_ - b_) > 0.05 for ra, rb in zip(rajat(j), rajat(js)) for a_, b_ in zip(ra, rb)): virheet.append(f'{nimi}: rajat {rajat(js)} → {rajat(j)}')
            env = dict(os.environ, PATH=KTX_BIN + os.pathsep + os.environ.get('PATH', ''))
            n_kuva += 0 if ktx2 else len(j.get('images', []))
            r = subprocess.run([GT, 'validate', u, '--format', 'csv'], env=env, capture_output=True, text=True)
            import csv   # vakavuus 0 = virhe (1 varoitus: validaattori ei tunne KHR_texture_basisua → image/ktx2 varoituksena)
            err = [r_['code'] + ' ' + r_['pointer'] for r_ in csv.DictReader(io.StringIO(r.stdout)) if r_.get('severity') == '0']
            if r.returncode or err: virheet.append(f'{nimi}: validaattori {len(err)} virhettä {err[:2]} {r.stderr[-200:]}')
    print(f'TARKISTUS {n_glb} glb, {n_kuva} kuvaa: {len(virheet)} virhettä, {len(tiedoksi)} tiedoksi'); [print('  ' + v) for v in virheet[:40] + tiedoksi[:40]]
    return virheet


def main():
    if len(sys.argv) == 3 and sys.argv[1] == '--portti': sys.exit(1 if portti(sys.argv[2]) else 0)   # vie-paketti.sh: omat-mallit-paketit
    if len(sys.argv) == 4 and sys.argv[1] == '--tarkista': sys.exit(1 if tarkista(sys.argv[2], sys.argv[3]) else 0)
    if len(sys.argv) == 4 and sys.argv[1] == '--instanssit':   # vain puusolmujen yhdistys (formaatti ennallaan, käy vanhoille apeille)
        lahde, ulos = sys.argv[2], sys.argv[3]
        if os.path.exists(ulos): raise SystemExit('ulos-kansio on uusi kansio')
        shutil.copytree(lahde, ulos)
        for juuri, _, tiedostot in sorted(os.walk(ulos)):
            for n in sorted(tiedostot):
                if n.endswith('.glb'):
                    u = os.path.join(juuri, n); rivi = instanssit(os.path.join(lahde, os.path.relpath(u, ulos)), u)
                    if rivi: print(rivi, flush=True)
        ktx = any(lue_glb(os.path.join(r_, f))[0].get('extensionsUsed') and 'KHR_texture_basisu' in lue_glb(os.path.join(r_, f))[0]['extensionsUsed']
                  for r_, _, fs in os.walk(ulos) for f in fs if f.endswith('.glb'))
        sys.exit(1 if tarkista(lahde, ulos, ktx2=ktx) else 0)
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
