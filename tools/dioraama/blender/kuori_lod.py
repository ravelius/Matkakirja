# Kuoren laatutasojen halkeamat umpeen (Linnanrakentaja 29.9.2026). ulkokuori.py harvensi OBJ:n suoraan, ja karttasaumoilla
# kärjet ovat kahdennettuina: Decimate harvensi sauman kummankin puolen erikseen ja repi saumat auki (taivas näkyi kuoren
# läpi; Unity piirtää kuoren Cull Off -tilassa). Kokeillut ja hylätyt: kärkien yhdistäminen ennen harvennusta (UV:t
# venyvät karttojen yli), saumakärkien lukitus (83 % kärjistä saumoilla → ei harvene), uudet UV:t + uudelleenleivonta
# (400 k kolmion smart project -pakkaus sumensi ja sekoitti värit). Ratkaisu: alkuperäinen taso säilyy sellaisenaan
# (tekstuuri ja UV0 ennallaan, samat tekstuurit kaikilla tasoilla), ja sen taakse lisätään umpinainen taustakerros:
# huippu-taso kärjet yhdistettyinä (1 mm) ja harvennettuna, siirrettynä normaalia pitkin 3 cm sisään. Taustan UV:t
# ovat venyneet, mutta se näkyy vain halkeamien läpi, jolloin väri on lähes oikea.
#   nice -n 15 Blender -b -P kuori_lod.py -- <ulkokuori_huippu.glb> <ulkokuori_<taso>.glb> <ulos.glb> [tausta_kolmiot 80000]
import bpy, bmesh, os, sys, time
a = sys.argv[sys.argv.index('--') + 1:]
HUIPPU, TASO, ULOS = a[:3]
TAUSTA = int(a[3]) if len(a) > 3 else 80000
SISAAN = 0.03
bpy.ops.wm.read_factory_settings(use_empty=True); sc = bpy.context.scene
t0 = time.time()
bpy.ops.import_scene.gltf(filepath=TASO)
taso = next(x for x in sc.objects if x.type == 'MESH')
ennen = set(sc.objects)
bpy.ops.import_scene.gltf(filepath=HUIPPU)
tausta = next(x for x in sc.objects if x.type == 'MESH' and x not in ennen)
bm = bmesh.new(); bm.from_mesh(tausta.data)
bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=0.001); bm.to_mesh(tausta.data); bm.free()
mod = tausta.modifiers.new('kevennys', 'DECIMATE'); mod.ratio = min(1.0, TAUSTA / len(tausta.data.polygons))
bpy.ops.object.select_all(action='DESELECT'); tausta.select_set(True); bpy.context.view_layer.objects.active = tausta
bpy.ops.object.modifier_apply(modifier=mod.name)
# Sisään normaalia pitkin (kärkinormaalit harvennetusta, yhtenäisestä verkosta).
me = tausta.data
for v in me.vertices: v.co -= v.normal * SISAAN
# Sama materiaali kuin tasolla (sama tekstuuri, UV0), jotta yhdistetyssä verkossa on yksi materiaali.
tausta.data.materials.clear()
for s in taso.material_slots: tausta.data.materials.append(s.material)
# UV-kerroksen nimi tason mukaiseksi (join yhdistää nimen mukaan).
if tausta.data.uv_layers and taso.data.uv_layers: tausta.data.uv_layers[0].name = taso.data.uv_layers[0].name
nt, nk = len(taso.data.polygons), len(tausta.data.polygons)
bpy.ops.object.select_all(action='DESELECT'); taso.select_set(True); tausta.select_set(True); bpy.context.view_layer.objects.active = taso
bpy.ops.object.join()
bpy.ops.export_scene.gltf(filepath=ULOS, use_selection=True, export_format='GLB', export_image_format='JPEG',
                          export_jpeg_quality=88, export_texcoords=True, export_normals=True, export_materials='EXPORT')
print(f'LOD: {os.path.basename(ULOS)} taso {nt} + tausta {nk} kolmiota, {os.path.getsize(ULOS) / 1e6:.1f} Mt, {time.time() - t0:.1f} s')
