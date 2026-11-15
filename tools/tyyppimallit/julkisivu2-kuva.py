"""KK 15.11. ~03.3x arkki 2 (julkisivukirkko, ehdot a ja b): venytyksen ääritapaukset ylhäältä, sivulta (etelä) ja edestä (länsi) samalla
mittakaavalla, sekä pari raskas | kevyt 45°:sta täysikokoisena ja pelin katseluetäisyydeltä (pieni kuva, suurennus ilman pehmennystä).
blender -b -P julkisivu2-kuva.py -- <obj-kansio> <kuvakansio>"""
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
sc.view_settings.view_transform = 'Standard'
def tyhjenna():
    for o in list(bpy.data.objects): bpy.data.objects.remove(o, do_unlink=True)
def tuo(nimi, siirto=(0, 0, 0)):
    bpy.ops.wm.obj_import(filepath=os.path.join(OBJ, nimi + '.obj'), forward_axis='NEGATIVE_Z', up_axis='Y')
    o = bpy.context.selected_objects[0]; o.location = siirto; return o
def maa():
    bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, -0.05))
    p = bpy.context.active_object; p.scale = (400, 400, 1)
    ca = p.data.color_attributes.new('Col', 'FLOAT_COLOR', 'POINT')
    for d in ca.data: d.color = (0.60, 0.58, 0.52, 1)
def kuva(nimi, az, el, skaala, keski, rx, ry, nakyma):
    cam_d = bpy.data.cameras.new('k'); cam_d.type = 'ORTHO'; cam_d.ortho_scale = skaala; cam_d.clip_end = 3000
    cam = bpy.data.objects.new('k', cam_d); sc.collection.objects.link(cam); sc.camera = cam
    ra, re = math.radians(az), math.radians(el)
    suunta = Vector((math.cos(ra) * math.cos(re), math.sin(ra) * math.cos(re), math.sin(re)))
    rot = (-suunta).to_track_quat('-Z', 'Y'); cam.rotation_euler = rot.to_euler()
    cam.location = Vector(keski) + suunta * 900
    sc.render.resolution_x, sc.render.resolution_y = rx, ry
    sc.render.filepath = os.path.join(ULOS, f'{nimi}-{nakyma}.png')
    bpy.ops.render.render(write_still=True)
MALLIT = ['j-0-1.0-1.0', 'j-1-1.0-1.0', 'j-1-0.6-1.0', 'j-1-1.6-1.0', 'j-1-1.0-0.6', 'j-1-1.0-1.6', 'j-1-0.6-0.6', 'j-1-1.6-1.6', 'j-1-1.6-0.6', 'j-1-0.6-1.6']
for m in MALLIT:
    tyhjenna(); tuo(m); maa()
    kuva(m, 270, 90, 92, (0, 0, 0), 540, 400, 'ylhaalta')
    kuva(m, 270, 2, 92, (0, 0, 30), 540, 400, 'sivulta')
    kuva(m, 180, 2, 92, (0, 0, 30), 540, 400, 'edesta')
for m in ('j-raskas', 'j-1-1.0-1.0'):
    tyhjenna(); tuo(m); tuo('talo', (30, -30, 0)); maa()
    kuva(m, 225, 40, 110, (0, 0, 15), 810, 600, 'pari')
    kuva(m, 225, 40, 110, (0, 0, 15), 162, 120, 'pelissa')   # ~1,5 px/m: kirkko ~70 px kuten kartalla lähimmillään
print('VALMIS')
