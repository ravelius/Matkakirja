"""KK 15.11. 00.16 kohta 2: sama kirkko venytettynä 0,6 | 1,0 | 1,6 x:n (pituus) ja z:n (leveys) suuntaan, 45° lounaasta, sama mittakaava rivillä.
blender -b -P venytys-kuva.py -- <obj-kansio> <kuvakansio> [malli]  → <malli>-x060.png … -z160.png; arkki: python3 -I arkki-venytys.py."""
import bpy, sys, os, math
from mathutils import Vector
a = sys.argv[sys.argv.index('--') + 1:]
OBJ, ULOS = a[0], a[1]; MALLI = a[2] if len(a) > 2 else 'kirkko-keski'
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
for akseli in ('x', 'z'):
    for s in (0.6, 1.0, 1.6):
        for o in list(bpy.data.objects): bpy.data.objects.remove(o, do_unlink=True)
        m = tuo(MALLI)
        m.scale = (s, 1, 1) if akseli == 'x' else (1, 1, s)   # tuonti jättää kierron objektiin: paikallinen x = obj x, z = obj z
        bpy.context.view_layer.update()
        tuo('talo', (28, -42, 0))   # mittakaavatalo samassa kohdassa joka kuvassa
        bpy.ops.mesh.primitive_plane_add(size=1, location=(0, -10, -0.05))
        p = bpy.context.active_object; p.scale = (400, 400, 1)
        ca = p.data.color_attributes.new('Col', 'FLOAT_COLOR', 'POINT')
        for d in ca.data: d.color = (0.60, 0.58, 0.52, 1)
        cam_d = bpy.data.cameras.new('k'); cam_d.type = 'ORTHO'; cam_d.ortho_scale = 125; cam_d.clip_end = 2000
        cam = bpy.data.objects.new('k', cam_d); sc.collection.objects.link(cam); sc.camera = cam
        ra, re = math.radians(225), math.radians(35)
        suunta = Vector((math.cos(ra) * math.cos(re), math.sin(ra) * math.cos(re), math.sin(re)))
        rot = (-suunta).to_track_quat('-Z', 'Y'); cam.rotation_euler = rot.to_euler()
        cam.location = Vector((8, -10, 18)) + suunta * 600
        sc.render.filepath = os.path.join(ULOS, f'{MALLI}-{akseli}{int(s * 100):03d}.png')
        bpy.ops.render.render(write_still=True)
print('VALMIS')
