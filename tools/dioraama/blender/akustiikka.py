# AKUSTIIKKAVERKOT (Linnanrakentaja 5.10.2026; Siirtosepän linnan Unity-suunnitelman kohta 6, Päätoimittajan erä):
# yksinkertaistetut suljetut verkot Steam Audion kaiun leivontaan, erillisinä glb:inä näkyvien rinnalle (näkyviin ei muutoksia).
#   huone (keittio, kappeli): suljettu laatikkokuori tilan rajoista (myös dioraaman poistettu leikkausseinä takaisin) +
#        isot rekvisiitat (irtonaiset osat, tilavuus ≥ RAJA) laatikkoina + ikkunat (ikkuna:-tyhjät) lasilevyinä
#   piha: ulkokuori pelkistettynä (~2000 kolmiota) + vesitaso (vedenpinta y −7)
# Koordinaatisto: linnan maailma kuten tilat/<tila>.glb ja ulkokuori (glTF Y ylös). Materiaalit "akustiikka:<tunniste>",
# tunnisteet kivi | puu | lasi | vesi; sama extras.akustiikka-kentässä (materiaali ja solmu).
#   Blender -b --factory-startup -P akustiikka.py -- <blender-paketti> <rakennus.json> <ulos-kansio> <dist-paketti>
#       [--tilat keittio,kappeli] [--kavely osa1,osa2] [--ei-pihaa]
#   8.10.2026: M-osan huoneet (palatsin tilat linnantupa, voudin-sali; kävelyosat kirkkotorni-portaat, kappeli-kavely,
#   muurikaytava, palatsi, tyrma-E101). Kävelyosat <blender-paketti>/kavely/<osa>.glb:stä (paksunnettu, sitten suljettu);
#   ampuma-aukot ('aukko') ja kallio jätetään pois. Tulos lisätään olemassa olevaan akustiikka.json:iin.
# Huoneiden muoto ja pintojen nimet rakennuskoneen tilaverkosta (<dist-paketti>/tilat/<tila>.glb, sama geometria ja
# maailma kuin leivotussa; leivotussa glb:ssä ei ole materiaaleja).
import bpy, bmesh, json, math, os, sys
from mathutils import Vector
A = sys.argv[sys.argv.index('--') + 1:]
PAKETTI, RAK, ULOS, DIST = A[0], A[1], A[2], A[3]; os.makedirs(ULOS, exist_ok=True)
def _valinta(lippu, oletus):
    return A[A.index(lippu) + 1].split(',') if lippu in A else oletus
VALITUT_TILAT = _valinta('--tilat', ['keittio', 'kappeli']); KAVELY_OSAT = _valinta('--kavely', []); PIHA = '--ei-pihaa' not in A
rak = json.load(open(RAK)); TILAT = {t['id']: t for t in rak['tilat']}
bl = lambda p: Vector((p[0], -p[2], p[1]))          # glTF → Blender


def tyhjenna():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def materiaali(tunniste):
    n = f'akustiikka:{tunniste}'
    m = bpy.data.materials.get(n) or bpy.data.materials.new(n)
    m['akustiikka'] = tunniste
    m.diffuse_color = {'kivi': (0.6, 0.6, 0.6, 1), 'puu': (0.6, 0.4, 0.2, 1), 'lasi': (0.5, 0.8, 1.0, 1), 'vesi': (0.1, 0.3, 0.6, 1)}[tunniste]
    return m


def laatikko(bm, a, b):
    """Laatikko kulmista a, b (Blender) bmeshiin; palauttaa luodut pinnat."""
    v = [bm.verts.new((x, y, z)) for x in (a.x, b.x) for y in (a.y, b.y) for z in (a.z, b.z)]
    ii = [(0, 1, 3, 2), (4, 6, 7, 5), (0, 4, 5, 1), (2, 3, 7, 6), (0, 2, 6, 4), (1, 5, 7, 3)]
    return [bm.faces.new([v[i] for i in q]) for q in ii]


def kohde(nimi, tunniste, bm):
    me = bpy.data.meshes.new(nimi); bmesh.ops.triangulate(bm, faces=bm.faces[:]); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(nimi, me); bpy.context.scene.collection.objects.link(o)
    o.data.materials.append(materiaali(tunniste)); o['akustiikka'] = tunniste
    return o


# 8.10.: isoissa tiloissa Quadriflow peruu (monta erillistä osaa) ja varapolku jättää aukkoja → pelkkä vokseliremesh
# karkeammalla vokselilla (aina suljettu). Arvot: vokselikoko (m) kivelle / puulle.
VOKSEL_ISO = {'linnantupa': (0.3, 0.45), 'voudin-sali': (0.3, 0.45)}
PUU = ('lankku', 'puu', 'olki', 'kangas', 'nahka', 'esiliina', 'leipa', 'vihannes', 'kala', 'vaha', 'tervattu')   # puu ja pehmeät


def tunniste_nimesta(n):
    n = n.lower().split('.')[0]
    if any(k in n for k in ('lasi', 'ikkuna')): return 'lasi'
    if any(k in n for k in PUU): return 'puu'
    return 'kivi'   # kivi, kivilattia, rappaus, savi, punamulta, leikkaus, metallit


def vie(nimi):
    p = os.path.join(ULOS, f'{nimi}.glb')
    bpy.ops.object.select_all(action='DESELECT')
    for o in bpy.context.scene.objects:
        if o.get('akustiikka'): o.select_set(True)
    bpy.ops.export_scene.gltf(filepath=p, export_format='GLB', use_selection=True, export_yup=True, export_extras=True,
                              export_materials='EXPORT', export_normals=False, export_texcoords=False)
    kolmioita = {o['akustiikka']: len(o.data.polygons) for o in bpy.context.scene.objects if o.get('akustiikka')}
    return p, kolmioita


def ei_monisto(o):
    bm = bmesh.new(); bm.from_mesh(o.data); n = sum(1 for e in bm.edges if not e.is_manifold); bm.free(); return n


def osittain(y, tavoite):
    """Erilliset osat omiksi kohteikseen, Quadriflow kullekin (tavoite pinta-alan suhteessa), huono tulos → vokseliverkko."""
    bpy.ops.object.select_all(action='DESELECT'); y.select_set(True); bpy.context.view_layer.objects.active = y
    bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT'); bpy.ops.mesh.separate(type='LOOSE')
    bpy.ops.object.mode_set(mode='OBJECT')
    osat = list(bpy.context.selected_objects); ala = {o: sum(p.area for p in o.data.polygons) for o in osat}; A_ = sum(ala.values()) or 1
    valmiit = []
    for o in osat:
        if len(o.data.polygons) < 24: bpy.data.objects.remove(o); continue
        tav = max(24, int(tavoite * ala[o] / A_))
        if len(o.data.polygons) <= 2 * tav: valmiit.append(o); continue
        bpy.ops.object.select_all(action='DESELECT'); o.select_set(True); bpy.context.view_layer.objects.active = o
        bpy.ops.object.duplicate(); vara_ = bpy.context.object
        bpy.ops.object.select_all(action='DESELECT'); o.select_set(True); bpy.context.view_layer.objects.active = o
        try: bpy.ops.object.quadriflow_remesh(target_faces=tav, use_preserve_sharp=False, use_mesh_symmetry=False, seed=1873)
        except Exception as e: print('AKUSTIIKKA: quadriflow virhe osa', e)
        try: ok = len(o.data.polygons) <= 2 * tav and ei_monisto(o) == 0
        except ReferenceError: ok = False; o = None
        if ok: bpy.data.objects.remove(vara_); valmiit.append(o)
        else:
            if o is not None: bpy.data.objects.remove(o)
            valmiit.append(vara_)
    bpy.ops.object.select_all(action='DESELECT')
    for o in valmiit: o.select_set(True)
    bpy.context.view_layer.objects.active = valmiit[0]; bpy.ops.object.join(); return bpy.context.object


def suljettu(nimi, lahteet, voksel, tavoite, raja_kivi=0.5, pelkista=True):
    """Lähdeverkot yhdeksi suljetuksi pinnaksi (vokseliremesh) ja pelkistys tavoitekolmiomäärään; kunkin pinnan tunniste
    lähimmän alkuperäisen pinnan materiaalista (BVH), kauempana kuin raja_kivi → kivi. Palauttaa tunniste → kohde."""
    from mathutils.bvhtree import BVHTree
    dg = bpy.context.evaluated_depsgraph_get()
    # alkuperäiset pinnat ja niiden tunnisteet
    bm0 = bmesh.new(); tun0 = []
    for o in lahteet:
        m = o.evaluated_get(dg).to_mesh(); m.transform(o.matrix_world)
        ennen = len(bm0.faces); bm0.from_mesh(m)
        nimet = [s_.material.name if s_.material else '' for s_ in o.material_slots] or ['']
        for f in m.polygons: tun0.append(tunniste_nimesta(nimet[min(f.material_index, len(nimet) - 1)]))
        o.evaluated_get(dg).to_mesh_clear()
    bm0.faces.ensure_lookup_table(); puu = BVHTree.FromBMesh(bm0)
    # yhdistetty kopio → remesh → pelkistys
    bpy.ops.object.select_all(action='DESELECT')
    for o in lahteet: o.select_set(True)
    bpy.context.view_layer.objects.active = lahteet[0]
    VK = (voksel, voksel * 1.13, voksel * 0.89, voksel * 1.27)
    for i_vk, vk in enumerate(VK):   # 8.10.: vokseliremesh voi harvoin jättää kulmakosketuksia → uusi koko
        bpy.ops.object.select_all(action='DESELECT')
        for o in lahteet: o.select_set(True)
        bpy.context.view_layer.objects.active = lahteet[0]
        bpy.ops.object.duplicate(); bpy.ops.object.join(); y = bpy.context.object
        bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
        r = y.modifiers.new('r', 'REMESH'); r.mode = 'VOXEL'; r.voxel_size = vk; r.use_smooth_shade = False
        bpy.ops.object.modifier_apply(modifier='r')
        if ei_monisto(y) == 0 or i_vk == len(VK) - 1: break       # viimeinen yritys jää (raportoidaan)
        print('AKUSTIIKKA: remesh ei-monisto', nimi, vk); bpy.data.objects.remove(y)
    if pelkista == 'osittain':   # 8.10.: Quadriflow jokaiselle erilliselle osalle; epäonnistunut osa jää vokseliverkoksi (suljettu)
        y = osittain(y, tavoite); pelkista = False
    # pelkista=False: vokselikoko valittu niin, että remesh antaa suoraan sopivan määrän (aina suljettu); muuten Quadriflow
    # Quadriflow säilyttää suljetun pinnan (decimate jätti 5.10. kokeessa puuhun ja pihaan avoimia reunoja); varalla decimate
    bpy.ops.object.select_all(action='DESELECT'); y.select_set(True); bpy.context.view_layer.objects.active = y
    if not pelkista: tavoite = len(y.data.polygons)
    try:
        if pelkista: bpy.ops.object.quadriflow_remesh(target_faces=int(tavoite), use_preserve_sharp=False, use_mesh_symmetry=False, seed=1873)
    except Exception as e:
        print('AKUSTIIKKA: quadriflow virhe', nimi, e)
    vara = len(y.data.polygons) > 1.5 * tavoite        # quadriflow peruu hiljaa (monta erillistä osaa, iso verkko)
    if vara:
        d = y.modifiers.new('d', 'DECIMATE'); d.ratio = min(1.0, tavoite / max(1, len(y.data.polygons))); bpy.ops.object.modifier_apply(modifier='d')
    bm = bmesh.new(); bm.from_mesh(y.data)
    if vara:   # decimaten jättämät aukot umpeen ja kaksoiskärjet yhteen
        bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-4)
        bmesh.ops.holes_fill(bm, edges=[e for e in bm.edges if e.is_boundary], sides=0)
    bmesh.ops.triangulate(bm, faces=bm.faces[:])
    ryhmat = {}
    for f in bm.faces:
        c = f.calc_center_median(); hit = puu.find_nearest(c)
        t_ = tun0[hit[2]] if hit[0] is not None and hit[3] <= raja_kivi else 'kivi'
        ryhmat.setdefault(t_, []).append([v.index for v in f.verts])
    co_ = [v.co.copy() for v in bm.verts]; bm.free(); bpy.data.objects.remove(y)
    for t_, kolmiot in ryhmat.items():   # 8.10.: topologia säilyy (kärkien indeksit), ei hitsausta toleranssilla (teki ei-monistoreunoja)
        bmk = bmesh.new(); vm = {}
        for tri in kolmiot:
            try: bmk.faces.new([vm.setdefault(i, bmk.verts.new(co_[i])) if i not in vm else vm[i] for i in tri])
            except ValueError: pass
        if len(bmk.faces) < 100 and any(not e.is_manifold for e in bmk.edges):   # pieni avoin pala: akustisesti merkityksetön
            print('AKUSTIIKKA: pieni avoin pala pois', nimi, t_, len(bmk.faces)); bmk.free(); continue
        kohde(f'{nimi}-{t_}' if not nimi.endswith(t_) else nimi, t_, bmk)


def huone(tila):
    tyhjenna(); t = TILAT[tila]
    # ikkunat leivotun glb:n ikkuna:-tyhjistä (rakennuskoneen verkossa niitä ei ole), muoto ja pinnat rakennuskoneen verkosta
    bpy.ops.import_scene.gltf(filepath=os.path.join(PAKETTI, 'tilat', f'{tila}.glb'))
    ikkunat = [o.matrix_world.translation.copy() for o in bpy.context.scene.objects if o.type == 'EMPTY' and o.name.startswith('ikkuna:')]
    for o in list(bpy.context.scene.objects): bpy.data.objects.remove(o)
    bpy.ops.import_scene.gltf(filepath=os.path.join(DIST, 'tilat', f'{tila}.glb'))
    nakyvat = [o for o in bpy.context.scene.objects if o.type == 'MESH']
    mn, mx = t['rajat']['min'], t['rajat']['max']
    a = Vector((mn[0], -mx[2], mn[1])); b = Vector((mx[0], -mn[2], mx[1]))
    # ohuet laatat rajojen jokaiselle sivulle (sulkevat dioraaman poistetun leikkausseinän; olemassa olevat seinät sulautuvat)
    P = 0.3; bm = bmesh.new()
    for ax in range(3):
        for puoli in (0, 1):
            lo, hi = a.copy() - Vector((0.05, 0.05, 0.05)), b.copy() + Vector((0.05, 0.05, 0.05))
            if puoli == 0: hi[ax] = a[ax]; lo[ax] = a[ax] - P
            else: lo[ax] = b[ax]; hi[ax] = b[ax] + P
            laatikko(bm, lo, hi)
    me = bpy.data.meshes.new('laatat'); bm.to_mesh(me); bm.free()
    lo_ = bpy.data.objects.new('laatat', me); bpy.context.scene.collection.objects.link(lo_)
    # pinnat materiaalin mukaan ryhmiin: kivi (seinät, lattia, laatat) ja puu (kalusteet, pehmeät) omiksi suljetuiksi verkoiksi,
    # muuten pienet puuesineet sulautuvat pelkistyksessä seiniin (5.10. koe: kaikki pinnat kiveä)
    bpy.ops.object.select_all(action='DESELECT')
    for o in nakyvat: o.select_set(True)
    bpy.context.view_layer.objects.active = nakyvat[0]
    bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT'); bpy.ops.mesh.separate(type='MATERIAL')
    bpy.ops.object.mode_set(mode='OBJECT')
    osat = [o for o in bpy.context.scene.objects if o.type == 'MESH' and o is not lo_ and not o.get('akustiikka')]
    ryhma = {}
    for o in osat:
        m = o.material_slots[0].material.name if o.material_slots and o.material_slots[0].material else ''
        ryhma.setdefault(tunniste_nimesta(m), []).append(o)
    if tila in VOKSEL_ISO: suljettu(f'{tila}-kivi', ryhma.get('kivi', []) + [lo_], voksel=VOKSEL_ISO[tila][0], tavoite=500, pelkista='osittain')
    else: suljettu(f'{tila}-kivi', ryhma.get('kivi', []) + [lo_], voksel=0.22, tavoite=220)
    if ryhma.get('puu'):
        suljettu(f'{tila}-puu', ryhma['puu'], voksel=VOKSEL_ISO.get(tila, (0, 0.4))[1], tavoite=300, raja_kivi=99, pelkista='osittain' if tila in VOKSEL_ISO else False)
    for o in [o for o in bpy.context.scene.objects if not o.get('akustiikka') and o.type == 'MESH']: bpy.data.objects.remove(o)
    if ikkunat:   # ikkunat lasilevyinä (0,6 × 1,2 m) lähimmän seinän suuntaisina
        bm = bmesh.new()
        for p in ikkunat:
            etx = min(abs(p.x - a.x), abs(p.x - b.x)); ety = min(abs(p.y - a.y), abs(p.y - b.y))
            if etx < ety: laatikko(bm, Vector((p.x - 0.02, p.y - 0.3, p.z - 0.6)), Vector((p.x + 0.02, p.y + 0.3, p.z + 0.6)))
            else: laatikko(bm, Vector((p.x - 0.3, p.y - 0.02, p.z - 0.6)), Vector((p.x + 0.3, p.y + 0.02, p.z + 0.6)))
        kohde(f'{tila}-ikkunat', 'lasi', bm)
    return vie(tila)


def piha():
    tyhjenna()
    bpy.ops.import_scene.gltf(filepath=os.path.join(PAKETTI, 'ulkokuori', 'ulkokuori_kevyt.glb'))
    k = [o for o in bpy.context.scene.objects if o.type == 'MESH']
    suljettu('piha', k, voksel=5.0, tavoite=0, raja_kivi=99, pelkista=False)
    for o in k: bpy.data.objects.remove(o)
    bm = bmesh.new(); s = 150
    v = [bm.verts.new((x, y, -7.0)) for x, y in ((-s, -s), (s, -s), (s, s), (-s, s))]; bm.faces.new(v)
    kohde('piha-vesi', 'vesi', bm)
    return vie('piha')


def kavely_osa(osa):
    """Kävelyosan (kavely/<osa>.glb) näkyvä geometria: seinät ovat laatikoita, lattiat ja katot yksittäisiä pintoja, joten
    kaikki paksunnetaan (solidify 0,25 m) ennen vokseliremeshiä; ampuma-aukot ja kallio pois (aukot ovat avoimia)."""
    tyhjenna()
    bpy.ops.import_scene.gltf(filepath=os.path.join(PAKETTI, 'kavely', f'{osa}.glb'))
    nak = [o for o in bpy.context.scene.objects if o.type == 'MESH']
    bpy.ops.object.select_all(action='DESELECT')
    for o in nak: o.select_set(True)
    bpy.context.view_layer.objects.active = nak[0]
    bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT'); bpy.ops.mesh.separate(type='MATERIAL')
    bpy.ops.object.mode_set(mode='OBJECT')
    ryhma = {}
    for o in [o for o in bpy.context.scene.objects if o.type == 'MESH']:
        m = (o.material_slots[0].material.name if o.material_slots and o.material_slots[0].material else '').lower()
        if 'aukko' in m or 'kallio' in m: bpy.data.objects.remove(o); continue
        s = o.modifiers.new('s', 'SOLIDIFY'); s.thickness = 0.25; s.offset = 0.0
        ryhma.setdefault(tunniste_nimesta(m), []).append(o)
    if ryhma.get('kivi'): suljettu(f'{osa}-kivi', ryhma['kivi'], voksel=0.3, tavoite=500, pelkista='osittain')
    if ryhma.get('puu'): suljettu(f'{osa}-puu', ryhma['puu'], voksel=0.3, tavoite=0, raja_kivi=99, pelkista=False)
    for o in [o for o in bpy.context.scene.objects if not o.get('akustiikka') and o.type == 'MESH']: bpy.data.objects.remove(o)
    return vie(osa)


vanha = os.path.join(ULOS, 'akustiikka.json')
tulos = json.load(open(vanha))['tilat'] if os.path.exists(vanha) else {}
for t in VALITUT_TILAT:
    p, k = huone(t); tulos[t] = {'glb': os.path.basename(p), 'kolmioita': k}
for o_ in KAVELY_OSAT:
    p, k = kavely_osa(o_); tulos[o_] = {'glb': os.path.basename(p), 'kolmioita': k, 'lahde': f'kavely/{o_}.glb'}
if PIHA:
    p, k = piha(); tulos['piha'] = {'glb': os.path.basename(p), 'kolmioita': k}
J = {'huom': 'Linnanrakentaja 5.10.2026 (M-osan huoneet 8.10.). Akustiikkaverkot Steam Audion leivontaan (Siirtosepän suunnitelma kohta 6). '
             'Koordinaatisto = tilat/<tila>.glb, kavely/<osa>.glb ja ulkokuori (linnan maailma, glTF Y ylös). Materiaali "akustiikka:<tunniste>" ja extras.akustiikka.',
     'tunnisteet': {'kivi': 'Steam Audio Rock', 'puu': 'Steam Audio Wood', 'lasi': 'Steam Audio Glass',
                    'vesi': 'Steam Audio Generic (matala absorptio; ei omaa esiasetusta)'},
     'tilat': tulos}
json.dump(J, open(os.path.join(ULOS, 'akustiikka.json'), 'w'), ensure_ascii=False, indent=1)
print('AKUSTIIKKA', json.dumps(tulos, ensure_ascii=False))
