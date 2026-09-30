# Kuoren pintojen korkeudet pystysäteellä annetuissa pisteissä (Linnanrakentaja 29.9.): kaikki osumat ylhäältä alas.
#   Blender -b -P kuori_korkeudet.py -- <kuori.glb> x1,y1 x2,y2 …   (x itä, y pohjoinen)
import bpy, sys
from mathutils import Vector
a = sys.argv[sys.argv.index('--') + 1:]
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=a[0])
dg = bpy.context.evaluated_depsgraph_get()
for xy in a[1:]:
    x, y = (float(v) for v in xy.split(','))
    z, osumat = 200.0, []
    while True:
        ok, loc, n, *_ = bpy.context.scene.ray_cast(dg, Vector((x, y, z)), Vector((0, 0, -1)))
        if not ok: break
        osumat.append(round(loc.z, 2)); z = loc.z - 0.05
    print('KORKEUS', xy, osumat)
