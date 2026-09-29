# Voudin sinetti, löytökortin kuva (Päätoimittaja 30.9.; pelin oma malli on reseptit-etsinta.mjs): sileä sinettisormus vanhaa messinkiä hieman kuluneena,
# sinettipinnassa peilikuvana kaiverrettu vaakunakilpi, jossa kaksi poikkipalkkia (ei tietyn suvun vaakunaa),
# tumma samettikangas kynttilänvalossa. Blender -b -P sinetti_kuva.py -- <ulos.png> [näytteet]
import bpy, bmesh, math, sys
from mathutils import Vector
a = sys.argv[sys.argv.index('--') + 1:]
ULOS = a[0]; NAYTTEET = int(a[1]) if len(a) > 1 else 256
bpy.ops.wm.read_factory_settings(use_empty=True); sc = bpy.context.scene
sc.render.engine = 'CYCLES'; sc.cycles.samples = NAYTTEET; sc.cycles.use_denoising = True
pr = bpy.context.preferences.addons['cycles'].preferences; pr.compute_device_type = 'METAL'; pr.get_devices()
for d in pr.devices: d.use = True
sc.cycles.device = 'GPU'; sc.view_settings.view_transform = 'AgX'; sc.view_settings.look = 'AgX - Medium High Contrast'
M = 0.001  # millimetri

def sileaksi(o, tasot=2):
    s = o.modifiers.new('s', 'SUBSURF'); s.levels = s.render_levels = tasot
    bpy.context.view_layer.objects.active = o; bpy.ops.object.shade_smooth()

# Rengas: kiskoprofiili (torus, litistetty), sisähalkaisija 18 mm.
bpy.ops.mesh.primitive_torus_add(major_radius=10.2 * M, minor_radius=1.5 * M, major_segments=64, minor_segments=24)
rengas = bpy.context.object; rengas.scale = (1, 1, 1.45); rengas.rotation_euler = (math.radians(90), 0, 0)
bpy.ops.object.transform_apply(scale=True, rotation=True); sileaksi(rengas)
# Sinettilaatta: soikea kiekko renkaan päällä + kaula renkaaseen.
bpy.ops.mesh.primitive_cylinder_add(vertices=64, radius=6.2 * M, depth=2.6 * M, location=(0, 0, 11.6 * M))
laatta = bpy.context.object; laatta.scale = (1.0, 0.82, 1); bpy.ops.object.transform_apply(scale=True)
b = laatta.modifiers.new('viiste', 'BEVEL'); b.width = 0.5 * M; b.segments = 4
bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=3.4 * M, depth=3 * M, location=(0, 0, 9.6 * M))
kaula = bpy.context.object; kaula.scale = (1.35, 0.8, 1); bpy.ops.object.transform_apply(scale=True)

# Kaiverrus (peilikuva, painuma 0,5 mm): kilven ääriviivaura + kaksi poikkipalkkia, leikataan EXACT-booleanilla.
def prisma(nimi, pts, z0, z1):
    bm = bmesh.new(); ala = [bm.verts.new((x, y, z0)) for x, y in pts]; yla = [bm.verts.new((x, y, z1)) for x, y in pts]
    bm.faces.new(ala[::-1]); bm.faces.new(yla); n = len(pts)
    for i in range(n): bm.faces.new((ala[i], ala[(i + 1) % n], yla[(i + 1) % n], yla[i]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new(nimi); bm.to_mesh(me); o = bpy.data.objects.new(nimi, me); sc.collection.objects.link(o); o.hide_render = True; return o
def kilven_reuna(w, h, n=24):
    pts = [(-w / 2, h / 2), (w / 2, h / 2)]
    for i in range(n + 1):  # oikea kylki alas kärkeen ja vasen takaisin (puolikaaret)
        t = i / n; pts.append((w / 2 * math.cos(t * math.pi / 2), h / 2 - h * 0.35 - (h * 0.65) * math.sin(t * math.pi / 2)))
    for i in range(1, n):
        t = i / n; pts.append((-w / 2 * math.sin(t * math.pi / 2), -h / 2 + (h * 0.65) * (1 - math.cos(t * math.pi / 2))))
    return pts
pinta = 11.6 * M + 1.3 * M; SY = 0.5 * M
W, H, U = 5.2 * M, 6.2 * M, 0.45 * M
leikkurit = [('ulko', kilven_reuna(W, H)), ('sisa', kilven_reuna(W - 2 * U, H - 2 * U))]
ulko = prisma('ulko', leikkurit[0][1], pinta - SY, pinta + M); sisa = prisma('sisa', leikkurit[1][1], pinta - 2 * SY, pinta + 2 * M)
# Ura = ulko − sisä: leikataan ensin koko kilpi, sitten palautetaan sisäosa (sisä on korkeampi kuin laatta, ei poistu).
bo = laatta.modifiers.new('ura', 'BOOLEAN'); bo.operation = 'DIFFERENCE'; bo.object = ulko; bo.solver = 'EXACT'
sisus = prisma('sisus', kilven_reuna(W - 2 * U, H - 2 * U), pinta - SY - 0.02 * M, pinta - 0.02 * M); sisus.hide_render = False
# Poikkipalkit kaiverrettuina sisuksen pintaan (peilikuva: vinous toiseen suuntaan kuin valmiissa painatuksessa).
for i, yy in enumerate((1.05 * M, -0.55 * M)):
    pp = [(-2.6 * M, yy - 0.38 * M), (2.6 * M, yy - 0.38 * M - 0.28 * M), (2.6 * M, yy + 0.38 * M - 0.28 * M), (-2.6 * M, yy + 0.38 * M)]
    pal = prisma(f'palkki{i}', pp, pinta - SY - 0.3 * M, pinta + M)
    bp = sisus.modifiers.new(f'p{i}', 'BOOLEAN'); bp.operation = 'DIFFERENCE'; bp.object = pal; bp.solver = 'EXACT'
# Materiaali: vanha messinki, kulunut: karheus kohinasta, painumissa (ambient occlusion) tummempi patina.
m = bpy.data.materials.new('messinki'); m.use_nodes = True; nt = m.node_tree; bs = nt.nodes['Principled BSDF']
bs.inputs['Metallic'].default_value = 1.0
ao = nt.nodes.new('ShaderNodeAmbientOcclusion'); ao.inputs['Distance'].default_value = 1.2 * M
ramppi = nt.nodes.new('ShaderNodeValToRGB'); e0, e1 = ramppi.color_ramp.elements
e0.position, e0.color = 0.35, (0.16, 0.10, 0.04, 1); e1.position, e1.color = 0.9, (0.70, 0.55, 0.30, 1)
nt.links.new(ao.outputs['AO'], ramppi.inputs['Fac']); nt.links.new(ramppi.outputs['Color'], bs.inputs['Base Color'])
kohina = nt.nodes.new('ShaderNodeTexNoise'); kohina.inputs['Scale'].default_value = 2500; kohina.inputs['Detail'].default_value = 8
kr = nt.nodes.new('ShaderNodeMapRange'); kr.inputs['To Min'].default_value = 0.28; kr.inputs['To Max'].default_value = 0.5
nt.links.new(kohina.outputs['Fac'], kr.inputs['Value']); nt.links.new(kr.outputs['Result'], bs.inputs['Roughness'])
naarmu = nt.nodes.new('ShaderNodeTexNoise'); naarmu.inputs['Scale'].default_value = 900; naarmu.inputs['Detail'].default_value = 12
naarmu.inputs['Distortion'].default_value = 3; kohou = nt.nodes.new('ShaderNodeBump'); kohou.inputs['Strength'].default_value = 0.12
kohou.inputs['Distance'].default_value = 0.00005; nt.links.new(naarmu.outputs['Fac'], kohou.inputs['Height']); nt.links.new(kohou.outputs['Normal'], bs.inputs['Normal'])
for o in (rengas, laatta, kaula, sisus): o.data.materials.append(m)
# Samettikangas: poimutettu taso, tumma viininpunainen, sheen.
bpy.ops.mesh.primitive_plane_add(size=0.2, location=(0, 0, -12.3 * M)); kangas = bpy.context.object
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.subdivide(number_cuts=60); bpy.ops.object.mode_set(mode='OBJECT')
tx = bpy.data.textures.new('poimu', 'CLOUDS'); tx.noise_scale = 0.018
dsp = kangas.modifiers.new('poimut', 'DISPLACE'); dsp.texture = tx; dsp.strength = 0.003; dsp.mid_level = 0.5
sileaksi(kangas, 1)
km = bpy.data.materials.new('sametti'); km.use_nodes = True; kb = km.node_tree.nodes['Principled BSDF']
kb.inputs['Base Color'].default_value = (0.07, 0.003, 0.012, 1); kb.inputs['Roughness'].default_value = 0.85
kb.inputs['Sheen Weight'].default_value = 1.0; kb.inputs['Sheen Tint'].default_value = (0.5, 0.15, 0.2, 1); kb.inputs['Sheen Roughness'].default_value = 0.35
kangas.data.materials.append(km)
# Valo: kynttilä (lämmin, pehmeä, vasemmalta takaa) + heikko kylmä täyte; musta maailma.
w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True; w.node_tree.nodes['Background'].inputs['Color'].default_value = (0.004, 0.004, 0.006, 1)
for nimi, pos, e, vari, koko in (('kynttila', (-0.09, 0.07, 0.07), 1.1, (1.0, 0.55, 0.22), 0.012), ('tayte', (0.1, -0.06, 0.05), 0.08, (0.55, 0.65, 1.0), 0.05)):
    L = bpy.data.lights.new(nimi, 'POINT'); L.energy = e; L.color = vari; L.shadow_soft_size = koko
    lo = bpy.data.objects.new(nimi, L); sc.collection.objects.link(lo); lo.location = pos
# Kamera: kolme neljäsosaa ylhäältä, sinettipinta ja rengas näkyvät, syväterävyys pehmentää taustan.
kd = bpy.data.cameras.new('k'); kd.lens = 100; kd.clip_start = 0.001
k = bpy.data.objects.new('k', kd); sc.collection.objects.link(k); sc.camera = k
k.location = (0.032, -0.07, 0.062); kohde = Vector((0, 0, 4 * M))
k.rotation_euler = (kohde - k.location).to_track_quat('-Z', 'Y').to_euler()
kd.dof.use_dof = True; kd.dof.focus_distance = (kohde - k.location).length; kd.dof.aperture_fstop = 22
sc.render.resolution_x = sc.render.resolution_y = 1024; sc.render.filepath = ULOS
bpy.ops.render.render(write_still=True)
