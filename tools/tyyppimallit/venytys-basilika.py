"""KK 15.11. 00.28 kohta 4a: samalla 58 × 38 m pohjalla kirkko-keski venytettynä | kirkko-levea 1,0 (| tornipari), ja levea 0,6 | 1,0 | 1,6 x:ssä ja z:ssa.
blender -b -P venytys-levea.py -- <obj-kansio> <kuvakansio>  → basilika-*.png; arkki: python3 -I arkki-levea.py <kuvakansio> <ulos.jpg>"""
import bpy, sys, os, math
from mathutils import Vector
a = sys.argv[sys.argv.index('--') + 1:]
OBJ, ULOS = a[0], a[1]
os.makedirs(ULOS, exist_ok=True)
sc = bpy.context.scene
sc.render.engine = 'BLENDER_WORKBENCH'
sh = sc.display.shading
sh.light = 'FLAT'; sh.color_type = 'VERTEX'; sh.show_cavity = False; sh.show_object_outline = True; sh.object_outline_color = (0.25, 0.22, 0.2)
sh.show_shadows = False; sh.background_type = 'VIEWPORT'; sh.background_color = (0.93, 0.91, 0.86)
sc.render.resolution_x, sc.render.resolution_y = 900, 640
sc.view_settings.view_transform = 'Standard'
def tuo(nimi, siirto=(0, 0, 0)):
    bpy.ops.wm.obj_import(filepath=os.path.join(OBJ, nimi + '.obj'), forward_axis='NEGATIVE_Z', up_axis='Y')
    o = bpy.context.selected_objects[0]; o.location = siirto; return o
KUVAT = [('basilika-58x38', 'kirkko-levea', (58 / 34, 1, 38 / 21)), ('basilika-100', 'kirkko-basilika', (1, 1, 1)),
         ('basilika-pari', 'kirkko-basilika-lansi-2-neula', (1, 1, 1))]
KUVAT += [(f'basilika-{ak}{int(s * 100):03d}', 'kirkko-basilika', (s, 1, 1) if ak == 'x' else (1, 1, s)) for ak in 'xz' for s in (0.6, 1.0, 1.6)]
for nimi, malli, sk in KUVAT:
    for o in list(bpy.data.objects): bpy.data.objects.remove(o, do_unlink=True)
    m = tuo(malli); m.scale = sk
    bpy.context.view_layer.update()
    tuo('talo', (36, -46, 0))
    bpy.ops.mesh.primitive_plane_add(size=1, location=(0, -10, -0.05))
    p = bpy.context.active_object; p.scale = (400, 400, 1)
    ca = p.data.color_attributes.new('Col', 'FLOAT_COLOR', 'POINT')
    for d in ca.data: d.color = (0.60, 0.58, 0.52, 1)
    # 58 × 38 m pohja vaaleana suorakaiteena (sama joka kuvassa)
    bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, 0.02))
    q = bpy.context.active_object; q.scale = (58, 38, 1)
    cq = q.data.color_attributes.new('Col', 'FLOAT_COLOR', 'POINT')
    for d in cq.data: d.color = (0.78, 0.74, 0.62, 1)
    cam_d = bpy.data.cameras.new('k'); cam_d.type = 'ORTHO'; cam_d.ortho_scale = 130; cam_d.clip_end = 2000
    cam = bpy.data.objects.new('k', cam_d); sc.collection.objects.link(cam); sc.camera = cam
    ra, re = math.radians(225), math.radians(35)
    suunta = Vector((math.cos(ra) * math.cos(re), math.sin(ra) * math.cos(re), math.sin(re)))
    cam.rotation_euler = (-suunta).to_track_quat('-Z', 'Y').to_euler()
    cam.location = Vector((8, -12, 16)) + suunta * 600
    sc.render.filepath = os.path.join(ULOS, nimi + '.png')
    bpy.ops.render.render(write_still=True)
print('VALMIS')
