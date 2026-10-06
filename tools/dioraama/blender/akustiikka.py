# AKUSTIIKKAVERKOT (Linnanrakentaja 5.10.2026; Siirtosepän linnan Unity-suunnitelman kohta 6, Päätoimittajan erä):
# yksinkertaistetut suljetut verkot Steam Audion kaiun leivontaan, erillisinä glb:inä näkyvien rinnalle (näkyviin ei muutoksia).
#   huone (keittio, kappeli): suljettu laatikkokuori tilan rajoista (myös dioraaman poistettu leikkausseinä takaisin) +
#        isot rekvisiitat (irtonaiset osat, tilavuus ≥ RAJA) laatikkoina + ikkunat (ikkuna:-tyhjät) lasilevyinä
#   piha: ulkokuori pelkistettynä (~2000 kolmiota) + vesitaso (vedenpinta y −7)
# Koordinaatisto: linnan maailma kuten tilat/<tila>.glb ja ulkokuori (glTF Y ylös). Materiaalit "akustiikka:<tunniste>",
# tunnisteet kivi | puu | lasi | vesi; sama extras.akustiikka-kentässä (materiaali ja solmu).
#   Blender -b --factory-startup -P akustiikka.py -- <blender-paketti> <rakennus.json> <ulos-kansio> <dist-paketti>
# Huoneiden muoto ja pintojen nimet rakennuskoneen tilaverkosta (<dist-paketti>/tilat/<tila>.glb, sama geometria ja
# maailma kuin leivotussa; leivotussa glb:ssä ei ole materiaaleja).
import bpy, bmesh, json, math, os, sys
from mathutils import Vector
A = sys.argv[sys.argv.index('--') + 1:]
PAKETTI, RAK, ULOS, DIST = A[0], A[1], A[2], A[3]; os.makedirs(ULOS, exist_ok=True)
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
    bpy.ops.object.duplicate(); bpy.ops.object.join(); y = bpy.context.object
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    r = y.modifiers.new('r', 'REMESH'); r.mode = 'VOXEL'; r.voxel_size = voksel; r.use_smooth_shade = False
    bpy.ops.object.modifier_apply(modifier='r')
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
        ryhmat.setdefault(t_, []).append([v.co.copy() for v in f.verts])
    bm.free(); bpy.data.objects.remove(y)
    for t_, kolmiot in ryhmat.items():
        bmk = bmesh.new()
        for tri in kolmiot: bmk.faces.new([bmk.verts.new(v) for v in tri])
        bmesh.ops.remove_doubles(bmk, verts=bmk.verts, dist=1e-5)
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
    suljettu(f'{tila}-kivi', ryhma.get('kivi', []) + [lo_], voksel=0.22, tavoite=220)
    if ryhma.get('puu'): suljettu(f'{tila}-puu', ryhma['puu'], voksel=0.4, tavoite=0, raja_kivi=99, pelkista=False)
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


tulos = {}
for t in ('keittio', 'kappeli'):
    p, k = huone(t); tulos[t] = {'glb': os.path.basename(p), 'kolmioita': k}
p, k = piha(); tulos['piha'] = {'glb': os.path.basename(p), 'kolmioita': k}
J = {'huom': 'Linnanrakentaja 5.10.2026. Akustiikkaverkot Steam Audion leivontaan (Siirtosepän suunnitelma kohta 6). Koordinaatisto = '
             'tilat/<tila>.glb ja ulkokuori (linnan maailma, glTF Y ylös). Materiaali "akustiikka:<tunniste>" ja extras.akustiikka.',
     'tunnisteet': {'kivi': 'Steam Audio Rock', 'puu': 'Steam Audio Wood', 'lasi': 'Steam Audio Glass',
                    'vesi': 'Steam Audio Generic (matala absorptio; ei omaa esiasetusta)'},
     'tilat': tulos}
json.dump(J, open(os.path.join(ULOS, 'akustiikka.json'), 'w'), ensure_ascii=False, indent=1)
print('AKUSTIIKKA', json.dumps(tulos, ensure_ascii=False))
