# Seinäpisteet kuoresta tunnelman sijoitteluun (Linnanrakentaja 29.9.): vaakasäde pisteestä kompassisuuntaan → osuma ja
# seinän normaalin kompassikulma (soihdun suunta), sekä maanpinta pisteen alla (ylin osuma alaspäin annetun korkeuden alta).
#   Blender -b -P kuori_seinapiste.py -- <kuori.glb> x,y,z,suunta [x,y,z,suunta …]   (x itä, y pohjoinen, suunta 0 = pohjoinen)
#   Tulostus: SEINA x,y,z,suunta -> osuma (x, y, z) normaali <aste> etaisyys <m> | MAA z (säde alas pisteestä)
import bpy, sys, math
from mathutils import Vector
a = sys.argv[sys.argv.index('--') + 1:]
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=a[0])
dg = bpy.context.evaluated_depsgraph_get()
sc = bpy.context.scene
for p in a[1:]:
    x, y, z, s = (float(v) for v in p.split(','))
    alku = Vector((x, y, z))
    alas = sc.ray_cast(dg, alku, Vector((0, 0, -1)), distance=60)
    maa = f'{alas[1].z:.2f}' if alas[0] else '-'
    d = Vector((math.sin(math.radians(s)), math.cos(math.radians(s)), 0))
    osu, paikka, nrm, *_ = sc.ray_cast(dg, alku, d, distance=25)
    if osu:
        n = Vector((nrm.x, nrm.y, 0))
        kulma = (math.degrees(math.atan2(n.x, n.y)) + 360) % 360 if n.length > 1e-3 else float('nan')
        print(f'SEINA {p} -> osuma ({paikka.x:.2f}, {paikka.y:.2f}, {paikka.z:.2f}) normaali {kulma:.0f} '
              f'etaisyys {(paikka - alku).length:.2f} | MAA {maa}')
    else:
        print(f'SEINA {p} -> ei osumaa | MAA {maa}')
