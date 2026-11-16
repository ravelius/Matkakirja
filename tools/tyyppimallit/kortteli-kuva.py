"""Korttelikuva (KK 16.11. RAJAT 1–4, koe; EI PELIIN): tyyppimallit merkeistä kuten peli + naapuritalot OSM-pohjista pursotettuina, Blender Workbench
(FLAT, kärkivärit, valo leivottu kuten Luonnos.dll: ympäristö 0,62 + suora 0,38 lounaasta ylhäältä), ortokamera.

  python3 -I kortteli-kuva.py <kortteli> <ulos-kansio>          kortteli: rooma-navona | wien-freyung | gesu
  (sisäisesti: Blender -b -P kortteli-kuva.py -- piirra <ulos>/kohtaus.json)

Mallit: merkit-<k>.json → vie.py _malli() → rakennus/Luonnos.dll malli … (VS_PALETTI = kaupungin palettirivi kattovari/seinavari kuten MK01:n rivi 0;
VS_VENYTYS = merkin sx, sz jaetuille tyypeille kuten vie.py). Paikka = merkin keski (ENU), kierto = vie.akseli() (mallin +x:n atsimuutti).
Naapurit: otteet-63/<k>/osm.json.gz building-tagilliset ~R m säteellä, ei merkkien omia OSM-id:itä (peli poistaa ne, poisOsm). Korkeus tyypitys.korkeus()
tai 18 m; seinä ja tasakatto katot.py PERHEET[k] painotetusta listasta (osm-id:n tiivisteellä, toistettava). Väriähde VS_KATOT_KANSIO (oletus KS 797a3bf17).
Merkin OSM-pohja piirretään maahan tummana viivana (vertailu: miten malli osuu pohjaan).
"""
import sys, os, json, math, gzip, hashlib, subprocess, struct

TY = os.path.dirname(os.path.abspath(__file__))
OTTEET = '/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tyokalu-1/otteet-63'
DN = '/Applications/Unity/Hub/Editor/6000.3.24f1/Unity.app/Contents/Resources/Scripting/NetCoreRuntime/dotnet'
BLENDER = '/Applications/Blender.app/Contents/MacOS/Blender'
OLETUS_KORKEUS = 18.0
# Valo kuten Luonnos.cs (Unity x itä, y ylös, z pohjoinen) → ENU (itä, pohjoinen, ylös).
_l = (-0.5, -0.45, 0.75); _n = math.sqrt(sum(c * c for c in _l)); VALO = tuple(c / _n for c in _l)

# Näkymä: (nimi, atsimuutti mistä kamera katsoo, korotus °, ortokoko m, keskipisteen siirto (itä, pohjoinen) m)
KORTTELIT = {
    'rooma-navona': dict(kaupunki='rooma', otsikko="ROOMA, Piazza Navona: Palazzo Braschi, Palazzo Madama (Sant'Agnese tavallisena massana, KK 17.11.)",
                         merkit=['relation/1709796', 'relation/76432'], sade=190,
                         nakymat=[('lounaasta', 225, 45, 300, (0, 0)), ('kaakosta (Piazza Navonan puoli)', 135, 45, 300, (0, 0))]),
    'wien-freyung': dict(kaupunki='wien', otsikko='WIEN, Freyung: Palais Kinsky, Palais Harrach',
                         merkit=['relation/2458835', 'relation/1527363'], sade=170,
                         nakymat=[('pohjoisesta (Freyungin puoli)', 15, 45, 210, (0, 0)), ('lounaasta', 225, 45, 210, (0, 0))]),
    'rooma-santandrea': dict(kaupunki='rooma', otsikko="ROOMA, Corso Vittorio Emanuele: Sant'Andrea della Valle (julkisivukirkko, julkisivu koneellisesti)",
                             merkit=['way/25625603'], sade=170,
                             nakymat=[('pohjoisesta (julkisivun puoli)', 345, 40, 200, (0, 0)), ('lounaasta', 225, 45, 200, (0, 0))]),
    'gesu': dict(kaupunki='rooma', otsikko='JULKISIVUKIRKKO (tyyppi 10) Rooman väreillä: Chiesa del Gesù (sx 1,63, sz 1,62)',
                 merkit=['way/25610962'], sade=0, yksin=True,
                 nakymat=[('edestä', 'julkisivu', 6, 150, (0, 0)), ('45°', 'julkisivu+45', 32, 150, (0, 0))]),
}


def lataa(nimi, polku):
    import importlib.util
    spec = importlib.util.spec_from_file_location(nimi, polku); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m


def lin(c): s = c / 255.0; return s / 12.92 if s <= 0.04045 else ((s + 0.055) / 1.055) ** 2.4
def srgb(l): return l * 12.92 if l <= 0.0031308 else 1.055 * l ** (1 / 2.4) - 0.055
def varjaa(rgb, n):
    k = 0.62 + 0.38 * max(0.0, n[0] * VALO[0] + n[1] * VALO[1] + n[2] * VALO[2])
    return tuple(srgb(lin(c) * k) for c in rgb)


def valitse(lista, oid, suola):
    h = int(hashlib.md5((suola + oid).encode()).hexdigest()[:8], 16) / 2 ** 32 * sum(o for _, o in lista)
    for rgb, o in lista:
        h -= o
        if h <= 0: return rgb
    return lista[-1][0]


def kirjoita_obj(polku, palat):
    """palat: lista (monikulmio ENU-kärkinä [(x, y, z)], sRGB-väri). OBJ: x itä, y ylös, z = −pohjoinen (kuten Luonnos.dll)."""
    v, f = [], []
    for kulmat, (r, g, b) in palat:
        i0 = len(v) + 1
        for x, y, z in kulmat: v.append(f'v {x:.3f} {z:.3f} {-y:.3f} {r:.4f} {g:.4f} {b:.4f}')
        f.append('f ' + ' '.join(str(i0 + i) for i in range(len(kulmat))))
    open(polku, 'w').write('\n'.join(v + f) + '\n')


def pursota(q, h, seina, katto, oid):
    """Suljettu rengas q (ENU xy) → seinät (ulospäin) + tasakatto."""
    if q[0] == q[-1]: q = q[:-1]
    if len(q) < 3: return []
    A = 0.5 * sum(q[i][0] * q[(i + 1) % len(q)][1] - q[(i + 1) % len(q)][0] * q[i][1] for i in range(len(q)))
    if A < 0: q = q[::-1]   # vastapäivään ylhäältä
    palat = []
    for i in range(len(q)):
        (ax, ay), (bx, by) = q[i], q[(i + 1) % len(q)]
        l = math.hypot(bx - ax, by - ay)
        if l < 1e-3: continue
        n = ((by - ay) / l, -(bx - ax) / l, 0.0)
        palat.append(([(ax, ay, 0), (bx, by, 0), (bx, by, h), (ax, ay, h)], varjaa(seina, n)))
    palat.append(([(x, y, h) for x, y in q], varjaa(katto, (0, 0, 1))))
    return palat


def viiva(q, lev=0.8, z=0.08, vari=(0.42, 0.12, 0.10)):
    palat = []
    for i in range(len(q) - 1):
        (ax, ay), (bx, by) = q[i], q[i + 1]
        l = math.hypot(bx - ax, by - ay)
        if l < 1e-3: continue
        nx, ny = -(by - ay) / l * lev / 2, (bx - ax) / l * lev / 2
        palat.append(([(ax - nx, ay - ny, z), (bx - nx, by - ny, z), (bx + nx, by + ny, z), (ax + nx, ay + ny, z)], vari))
    return palat


def valmistele(nimi, ulos):
    K = KORTTELIT[nimi]; k = K['kaupunki']
    os.environ.setdefault('VS_KATOT_KANSIO', os.path.join(TY, 'ks-797a3bf17'))
    V = lataa('vie', os.path.join(TY, 'vie.py')); T = lataa('tyypitys', os.path.join(TY, 'tyypitys.py'))
    katto, ks = V.kattovari(k); seina, ss = V.seinavari(k)
    V.KATTOVARI, V.SEINAVARI = (katto, ks), (seina, ss)
    lahde = open(os.path.join(V.KAUPUNKI_TYOKALU, 'katot.py'), encoding='utf-8').read()
    seinat, katot = V.perheen_seinat(lahde, k), V.perheen_katot(lahde, k)
    merkit = {m['osm']: m for m in json.load(open(os.path.join(TY, 'koe-rw', k, f'merkit-{k}.json')))['merkit']}
    valitut = [merkit[o] for o in K['merkit']]
    la0 = sum(m['keski'][0] for m in valitut) / len(valitut); lo0 = sum(m['keski'][1] for m in valitut) / len(valitut)
    P = T.projektori(la0, lo0)
    os.makedirs(os.path.join(ulos, 'obj'), exist_ok=True)
    env = dict(os.environ, VS_PALETTI=f'{katto:06X},{seina:06X}')
    kohteet, tiedot, pohjat, merkkipohjat, paalla = [], [], [], [], []
    INST = {('kirkko', 'pieni'), ('kirkko', 'keski'), ('kirkko', 'levea'), ('kirkko', 'basilika'), ('kirkko', 'suuri'), ('kirkko', 'julkisivu'), ('kupolikirkko', 'keski')}
    for m in valitut:
        r = V._malli(m); inst = (m['tyyppi'], m['koko']) in INST
        sx = m['sx'] if inst and m['sx'] else 1.0; sz = m['sz'] if inst and m['sz'] else 1.0
        if inst and m['sovitus'] == 'luonnollinen': sx = sz = m['mittakaava']
        e = dict(env, VS_VENYTYS=f'{sx},{sz}') if inst else dict(env)
        tunnus = m['osm'].replace('/', '-')
        arg = [str(r[0]), str(r[1]), str(r[2]), str(r[3]), repr(r[4]), repr(r[5]), repr(r[6])]
        if len(r) == 8 and isinstance(r[7], float) and r[7]: arg.append(str(struct.unpack('<I', struct.pack('<f', r[7]))[0]))   # palatsin räystäs (p3)
        tulos = subprocess.run([DN, os.path.join(TY, 'rakennus', 'Luonnos.dll'), os.path.join(ulos, 'obj'), tunnus, 'malli'] + arg,
                               env=e, capture_output=True, text=True, check=True).stdout.strip()
        x, y = P(*m['keski']); ak = V.akseli(m)
        kohteet.append(dict(obj=os.path.join(ulos, 'obj', tunnus + '.obj'), x=x, y=y, akseli=ak, nimi=m['nimi'], h=m.get('korkeus') or 20))
        pohja = [tuple(p) for p in m['pohja']]
        merkkipohjat.append((m['nimi'], [(x + px, y + py) for px, py in pohja]))
        pohjat += viiva([(x + px, y + py) for px, py in pohja + pohja[:1]])
        tiedot.append(dict(osm=m['osm'], nimi=m['nimi'], tyyppi=f"{m['tyyppi']}-{m['koko']}", rivi=list(r[:8]), sx=sx, sz=sz, akseli=round(ak, 1),
                           parametrit=m['parametrit'], luonnos=tulos))
    naapurit = 0
    if not K.get('yksin'):
        d = json.load(gzip.open(os.path.join(OTTEET, k, 'osm.json.gz')))
        palat = []
        for w in d['ways'] + d.get('rel', []):
            t = w.get('t', {})
            if not t.get('building') or w['osm'] in K['merkit']: continue
            renkaat = [w['p']] if 'p' in w else T.renkaat_rel(w)
            qs = [[P(la, lo) for la, lo in rr] for rr in renkaat]
            if not qs or min(math.hypot(px, py) for q in qs for px, py in q) > K['sade']: continue
            # Merkin pohjan sisällä (keskipiste) oleva muu OSM-talo (osa, siipi, päällekkäinen piirto): peli poistaa vain merkin oman id:n (poisOsm),
            # joten tällainen talo jäisi pelissä mallin päälle. Kuvasta pois, luettelo kohtaus.json 'paalla' (KK:lle tarkistettavaksi).
            q0 = max(qs, key=lambda q: abs(T.ala(q))); cx = sum(px for px, _ in q0) / len(q0); cy = sum(py for _, py in q0) / len(q0)
            osuu = next((n for n, mp in merkkipohjat if T.piste_ulkona((cx, cy), mp) == 0.0), None)
            if osuu:
                paalla.append(dict(osm=w['osm'], merkki=osuu, nimi=t.get('name', ''), building=t.get('building'), korkeus=T.korkeus(t)[0], ala=round(sum(abs(T.ala(q)) for q in qs))))
                continue
            h = T.korkeus(t)[0] or OLETUS_KORKEUS
            s = valitse(seinat, w['osm'], 's'); kt = valitse(katot, w['osm'], 'k')
            for q in qs: palat += pursota(q, h, s, kt, w['osm'])
            naapurit += 1
        kirjoita_obj(os.path.join(ulos, 'obj', 'naapurit.obj'), palat)
    kirjoita_obj(os.path.join(ulos, 'obj', 'pohjat.obj'), pohjat)
    nakymat = []
    for nn, az, el, koko, siirto in K['nakymat']:
        if isinstance(az, str):   # julkisivu = −x merkin akselista: atsimuutti akseli + 180
            az = (kohteet[0]['akseli'] + 180 + (45 if az.endswith('+45') else 0)) % 360
        nakymat.append(dict(nimi=nn, az=az, el=el, koko=koko, siirto=siirto))
    kohtaus = dict(kortteli=nimi, otsikko=K['otsikko'], kohteet=kohteet, naapurit=os.path.join(ulos, 'obj', 'naapurit.obj') if naapurit else None,
                   pohjat=os.path.join(ulos, 'obj', 'pohjat.obj'), nakymat=nakymat, ulos=ulos,
                   paletti=dict(katto=f'#{katto:06X}', katto_lahde=ks, seina=f'#{seina:06X}', seina_lahde=ss, katot_kansio=V.KAUPUNKI_TYOKALU),
                   naapureita=naapurit, paalla=paalla, merkit=tiedot)
    json.dump(kohtaus, open(os.path.join(ulos, 'kohtaus.json'), 'w'), ensure_ascii=False, indent=1)
    return kohtaus


def piirra(polku):
    import bpy
    from mathutils import Vector
    from bpy_extras.object_utils import world_to_camera_view
    S = json.load(open(polku)); sc = bpy.context.scene
    sc.render.engine = 'BLENDER_WORKBENCH'; sh = sc.display.shading
    sh.light = 'FLAT'; sh.color_type = 'VERTEX'; sh.show_cavity = False; sh.show_object_outline = True; sh.object_outline_color = (0.25, 0.22, 0.2)
    sh.show_shadows = False; sh.background_type = 'VIEWPORT'; sh.background_color = (0.93, 0.91, 0.86)
    sc.render.resolution_x, sc.render.resolution_y = 1200, 860; sc.view_settings.view_transform = 'Standard'
    for o in list(bpy.data.objects): bpy.data.objects.remove(o, do_unlink=True)
    def tuo(p):
        bpy.ops.wm.obj_import(filepath=p, forward_axis='NEGATIVE_Z', up_axis='Y'); return bpy.context.selected_objects[0]
    for k in S['kohteet']:
        o = tuo(k['obj']); o.location = (k['x'], k['y'], 0); o.rotation_euler[2] = math.radians(90 - k['akseli'])   # tuonti asettaa X 90° (akselimuunnos)
    if S['naapurit']: tuo(S['naapurit'])
    tuo(S['pohjat'])
    bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, -0.05)); p = bpy.context.active_object; p.scale = (3000, 3000, 1)
    ca = p.data.color_attributes.new('Col', 'FLOAT_COLOR', 'POINT')
    for d in ca.data: d.color = (0.60, 0.58, 0.52, 1)
    cam_d = bpy.data.cameras.new('k'); cam_d.type = 'ORTHO'; cam_d.clip_end = 8000
    cam = bpy.data.objects.new('k', cam_d); sc.collection.objects.link(cam); sc.camera = cam
    nimet = {}
    for i, n in enumerate(S['nakymat']):
        cam_d.ortho_scale = n['koko']
        ra, re = math.radians(90 - n['az']), math.radians(n['el'])   # atsimuutti pohjoisesta myötäpäivään → Blenderin kulma idästä vastapäivään
        s = Vector((math.cos(ra) * math.cos(re), math.sin(ra) * math.cos(re), math.sin(re)))
        kohde = Vector((n['siirto'][0], n['siirto'][1], 26 if len(S['kohteet']) == 1 else 0))
        cam.rotation_euler = (-s).to_track_quat('-Z', 'Y').to_euler(); cam.location = kohde + s * 3000
        bpy.context.view_layer.update()
        sc.render.filepath = os.path.join(S['ulos'], f'nakyma-{i}.png'); bpy.ops.render.render(write_still=True)
        nimet[i] = [(k['nimi'], *world_to_camera_view(sc, cam, Vector((k['x'], k['y'], k['h'] + 4)))[:2]) for k in S['kohteet']]
    json.dump(nimet, open(os.path.join(S['ulos'], 'nimet.json'), 'w'), ensure_ascii=False)


def kokoa(S, ulos_jpg, kuvateksti):
    from PIL import Image, ImageDraw, ImageFont
    nimet = json.load(open(os.path.join(S['ulos'], 'nimet.json')))
    kuvat = [Image.open(os.path.join(S['ulos'], f'nakyma-{i}.png')).convert('RGB') for i in range(len(S['nakymat']))]
    w, h = kuvat[0].size; yla = 70; ala_ = 26 * len(kuvateksti) + 20
    A = Image.new('RGB', (w * len(kuvat), h + yla + ala_), (247, 245, 240)); D = ImageDraw.Draw(A)
    f = lambda s: ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', s)
    D.text((16, 10), S['otsikko'], fill=(30, 30, 30), font=f(26))
    D.text((16, 42), 'KOE, ei peliin (KK 16.11. RAJAT 1–4). Värit katot.py PERHEET KS 797a3bf17; tumma viiva maassa = merkin OSM-pohja.', fill=(90, 80, 70), font=f(17))
    for i, im in enumerate(kuvat):
        A.paste(im, (i * w, yla)); D.text((i * w + 14, yla + 10), S['nakymat'][i]['nimi'], fill=(40, 40, 40), font=f(22))
        if len(S['kohteet']) > 1:
            for nimi, u, v in nimet[str(i)]:
                px, py = i * w + u * w, yla + (1 - v) * h
                tw = D.textlength(nimi, font=f(17))
                D.rectangle([px - tw / 2 - 4, py - 24, px + tw / 2 + 4, py - 2], fill=(255, 255, 255)); D.text((px - tw / 2, py - 23), nimi, fill=(120, 20, 10), font=f(17))
    for j, r in enumerate(kuvateksti): D.text((16, h + yla + 10 + 26 * j), r, fill=(30, 30, 30), font=f(18))
    A.save(ulos_jpg, quality=90)


if __name__ == '__main__':
    a = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else sys.argv[1:]
    if a[0] == 'piirra': piirra(a[1]); sys.exit(0)
    nimi, ulos = a[0], os.path.abspath(a[1]); os.makedirs(ulos, exist_ok=True)
    S = valmistele(nimi, ulos)
    subprocess.run([BLENDER, '-b', '-P', os.path.abspath(__file__), '--', 'piirra', os.path.join(ulos, 'kohtaus.json')], check=True, capture_output=True)
    print(json.dumps(dict(paletti=S['paletti'], naapureita=S['naapureita'], paalla=S['paalla'],
                          merkit=[{k: v for k, v in m.items() if k != 'parametrit'} for m in S['merkit']]), ensure_ascii=False, indent=1))
