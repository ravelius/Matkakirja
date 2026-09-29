# Tutkii Senaatin fotogrammetrisen Olavinlinnan OBJ:n: objektit, materiaalit, kolmiot ja rajat (Linnanrakentaja 29.9.).
import bpy, sys, time
from mathutils import Vector
polku = sys.argv[sys.argv.index('--') + 1]
bpy.ops.wm.read_factory_settings(use_empty=True)
t = time.time()
bpy.ops.wm.obj_import(filepath=polku)
print('TUTKI: tuonti', round(time.time() - t, 1), 's')
for o in bpy.data.objects:
    if o.type != 'MESH':
        continue
    me = o.data
    pm = {}
    for p in me.polygons:
        pm[p.material_index] = pm.get(p.material_index, 0) + len(p.vertices) - 2
    bb = [o.matrix_world @ Vector(c) for c in o.bound_box]
    mn = [min(v[i] for v in bb) for i in range(3)]; mx = [max(v[i] for v in bb) for i in range(3)]
    print('TUTKI:', o.name, 'kolmioita', sum(pm.values()), 'materiaaleittain',
          {o.material_slots[i].material.name if i < len(o.material_slots) and o.material_slots[i].material else i: n for i, n in pm.items()},
          'min', [round(x, 1) for x in mn], 'max', [round(x, 1) for x in mx])
for im in bpy.data.images:
    print('TUTKI: kuva', im.name, tuple(im.size))
