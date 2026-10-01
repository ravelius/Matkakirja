# Blender -b -P julkisivut.py -- glb tex ulos-kansio nimi x0 x1 y0 y1 z0 z1 : 4 ortokuvaa (katse pohjoiseen/itään/etelään/länteen),
# 30 px/m, kuvaan kirjoitetaan json: suunta, vasen reuna (u0), alareuna (z0), px/m
import bpy, sys, math, json, os
A = sys.argv[sys.argv.index('--') + 1:]; glb, tex, ulos, nimi = A[:4]; x0, x1, y0, y1, z0, z1 = map(float, A[4:10])
PX = 30
bpy.ops.wm.read_factory_settings(use_empty=True); sc = bpy.context.scene
sc.render.engine = 'CYCLES'; sc.cycles.samples = 4; sc.view_settings.view_transform = 'Standard'
bpy.ops.import_scene.gltf(filepath=glb); ob = max([o for o in sc.objects if o.type == 'MESH'], key=lambda o: len(o.data.polygons))
nt = ob.active_material.node_tree; out = next(n for n in nt.nodes if n.type == 'OUTPUT_MATERIAL'); k = next(n for n in nt.nodes if n.type == 'TEX_IMAGE')
k.image = bpy.data.images.load(tex); em = nt.nodes.new('ShaderNodeEmission'); nt.links.new(k.outputs[0], em.inputs[0]); nt.links.new(em.outputs[0], out.inputs['Surface'])
cx, cy, cz = (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2
tiedot = {}
# katse (suunta johon kamera katsoo), kameran paikka ulkona: katse pohjoiseen = kamera etelässä
for suunta, (dx, dy) in {'pohjoiseen': (0, 1), 'itaan': (1, 0), 'etelaan': (0, -1), 'lanteen': (-1, 0)}.items():
    lev = (x1 - x0) if dx == 0 else (y1 - y0); syv = (y1 - y0) if dx == 0 else (x1 - x0); kork = z1 - z0
    cd = bpy.data.cameras.new(suunta); cd.type = 'ORTHO'; cd.ortho_scale = max(lev, kork); cd.sensor_fit = 'AUTO'
    d = 100.0; cd.clip_start = d - syv / 2 - 1.0; cd.clip_end = d + syv / 2 + 1.0
    c = bpy.data.objects.new(suunta, cd); sc.collection.objects.link(c); sc.camera = c
    c.location = (cx - dx * d, cy - dy * d, cz)
    c.rotation_euler = (math.radians(90), 0, math.atan2(-dx, dy))
    sc.render.resolution_x = int(lev * PX); sc.render.resolution_y = int(kork * PX)
    cd.ortho_scale = max(lev, kork)
    sc.render.filepath = os.path.join(ulos, f'{nimi}-{suunta}.png'); bpy.ops.render.render(write_still=True)
    # u-akseli kuvassa vasemmalta oikealle: katse pohjoiseen → x kasvaa; itään → y pienenee; etelään → x pienenee; länteen → y kasvaa
    tiedot[suunta] = {'lev': lev, 'kork': kork, 'z0': z0, 'px_m': PX,
                      'u': {'pohjoiseen': ['x', x0, 1], 'itaan': ['y', y1, -1], 'etelaan': ['x', x1, -1], 'lanteen': ['y', y0, 1]}[suunta]}
json.dump(tiedot, open(os.path.join(ulos, f'{nimi}.json'), 'w'))
