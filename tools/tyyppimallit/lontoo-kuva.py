"""KK 15.11. 01.13 kohta 4: Lontoon asemat, palatsit attikalla ja Royal Exchange (MK01-rivit kuten pelissä). blender -b -P lontoo-kuva.py -- obj/lontoo kuvat/lontoo"""
import bpy, sys, os, math, json
from mathutils import Vector
a = sys.argv[sys.argv.index('--') + 1:]; OBJ, ULOS = a[0], a[1]; os.makedirs(ULOS, exist_ok=True)
sc = bpy.context.scene; sc.render.engine = 'BLENDER_WORKBENCH'; sh = sc.display.shading
sh.light = 'FLAT'; sh.color_type = 'VERTEX'; sh.show_cavity = False; sh.show_object_outline = True; sh.object_outline_color = (0.25, 0.22, 0.2)
sh.show_shadows = False; sh.background_type = 'VIEWPORT'; sh.background_color = (0.93, 0.91, 0.86)
sc.render.resolution_x, sc.render.resolution_y = 900, 640; sc.view_settings.view_transform = 'Standard'
def tuo(polku, siirto=(0, 0, 0)):
    bpy.ops.wm.obj_import(filepath=polku, forward_axis='NEGATIVE_Z', up_axis='Y'); o = bpy.context.selected_objects[0]; o.location = siirto; return o
TALO = '/Users/Shared/Claude/proto-3d/_tyo/valoseppa/tyyppitalot/obj/talo.obj'
for nimi, n, L, W, rivi in json.load(open(os.path.join(OBJ, 'lista.json'))):
    for o in list(bpy.data.objects): bpy.data.objects.remove(o, do_unlink=True)
    m = tuo(os.path.join(OBJ, nimi + '.obj')); bpy.context.view_layer.update()
    bb = [m.matrix_world @ Vector(c) for c in m.bound_box]; cx = sum(v.x for v in bb) / 8; cy = sum(v.y for v in bb) / 8
    mx = max(v.x for v in bb); my = min(v.y for v in bb)
    tuo(TALO, (mx + 14, my - 4, 0))
    bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, -0.05)); p = bpy.context.active_object; p.scale = (2000, 2000, 1)
    ca = p.data.color_attributes.new('Col', 'FLOAT_COLOR', 'POINT')
    for d in ca.data: d.color = (0.60, 0.58, 0.52, 1)
    cam_d = bpy.data.cameras.new('k'); cam_d.type = 'ORTHO'; cam_d.ortho_scale = (L + W) * 0.85 + 30; cam_d.clip_end = 5000
    cam = bpy.data.objects.new('k', cam_d); sc.collection.objects.link(cam); sc.camera = cam
    ra, re = math.radians(225), math.radians(35)
    s = Vector((math.cos(ra) * math.cos(re), math.sin(ra) * math.cos(re), math.sin(re)))
    cam.rotation_euler = (-s).to_track_quat('-Z', 'Y').to_euler(); cam.location = Vector((cx + 8, cy - 8, 10)) + s * 2000
    sc.render.filepath = os.path.join(ULOS, nimi + '.png'); bpy.ops.render.render(write_still=True)
print('VALMIS')
