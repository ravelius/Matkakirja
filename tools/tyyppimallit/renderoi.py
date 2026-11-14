"""Blender (taustalla): blender -b -P renderoi.py -- <obj-kansio> <kuvakansio>. Workbench, kärkivärit, neutraali studiovalo, ortokamera.
Jokaisesta tyypistä kolme kuvaa: 45° (lounaasta), edestä (lännestä, julkisivu) ja sivulta (etelästä); tavallinen talo vieressä mittakaavaksi."""
import bpy, sys, os, math
from mathutils import Vector
a = sys.argv[sys.argv.index('--') + 1:]
OBJ, ULOS = a[0], a[1]
os.makedirs(ULOS, exist_ok=True)
TYYPIT = ['kirkko-pieni', 'kirkko-keski', 'kirkko-suuri', 'asema', 'palatsi', 'kupolikirkko', 'kupolikirkko-ilman',
          'kirkko-keski-risteys-1-pyramidi', 'kirkko-keski-lansi-2-neula', 'kirkko-keski-lansi-1-tasakatto', 'kirkko-pieni-risteys-2-pyramidi']
if len(a) > 2: TYYPIT = a[2].split(',')

def tyhjenna():
    for o in list(bpy.data.objects): bpy.data.objects.remove(o, do_unlink=True)

def tuo(nimi, siirto=(0, 0, 0)):
    bpy.ops.wm.obj_import(filepath=os.path.join(OBJ, nimi + '.obj'), forward_axis='NEGATIVE_Z', up_axis='Y')
    o = bpy.context.selected_objects[0]
    o.location = siirto
    return o

sc = bpy.context.scene
sc.render.engine = 'BLENDER_WORKBENCH'
sh = sc.display.shading
sh.light = 'FLAT'; sh.color_type = 'VERTEX'
sh.show_cavity = False; sh.show_object_outline = True; sh.object_outline_color = (0.25, 0.22, 0.2)
sh.show_shadows = False
sh.background_type = 'VIEWPORT'; sh.background_color = (0.93, 0.91, 0.86)
sc.display.light_direction = (-0.45, -0.6, 0.66)
sc.render.resolution_x, sc.render.resolution_y = 900, 640
sc.render.film_transparent = False
sc.view_settings.view_transform = 'Standard'

for t in TYYPIT:
    tyhjenna()
    m = tuo(t)
    bb = [m.matrix_world @ Vector(c) for c in m.bound_box]
    x0 = min(v.x for v in bb); x1 = max(v.x for v in bb); y0 = min(v.y for v in bb); y1 = max(v.y for v in bb); z1 = max(v.z for v in bb)
    tuo('talo', (x1 + 14, y0 + 6, 0))
    tuo('talo', (x0 + 8, y1 + 22, 0) if t != 'palatsi' else (x0 - 14, y1 + 24, 0))
    # maa
    bpy.ops.mesh.primitive_plane_add(size=1, location=((x0 + x1) / 2, (y0 + y1) / 2, -0.05))
    p = bpy.context.active_object; p.scale = (x1 - x0 + 80, y1 - y0 + 80, 1)
    ca = p.data.color_attributes.new('Col', 'FLOAT_COLOR', 'POINT')
    for d in ca.data: d.color = (0.60, 0.58, 0.52, 1)
    keski = Vector(((x0 + x1) / 2 + 7, (y0 + y1) / 2 + 3, z1 * 0.4))
    koko = max(x1 - x0 + 30, y1 - y0 + 30, z1 * 1.3)
    cam_d = bpy.data.cameras.new('k'); cam_d.type = 'ORTHO'
    cam = bpy.data.objects.new('k', cam_d); sc.collection.objects.link(cam); sc.camera = cam
    nak = {'45': (225, 45, 1.05), 'edesta': (180, 3, 0.95), 'sivulta': (270, 3, 1.0)}
    if t == 'palatsi' or t.startswith('palatsi-piha') or t.startswith('piha-') or t.startswith('piha2-'): nak = {'45': (225, 45, 1.05), 'edesta': (90, 3, 1.0), 'sivulta': (180, 3, 1.0)}   # pääjulkisivu pohjoiseen (pihan puoli)
    for nakyma, (az, el, sk) in nak.items():
        # az: suunta, josta katsotaan (0 = itä, 90 = pohjoinen); kamera katsoo kohti keskeä
        ra, re = math.radians(az), math.radians(el)
        suunta = Vector((math.cos(ra) * math.cos(re), math.sin(ra) * math.cos(re), math.sin(re)))
        rot = (-suunta).to_track_quat('-Z', 'Y')
        cam.rotation_euler = rot.to_euler()
        # Sovitus: kaikkien kappaleiden (paitsi maan) kulmat kameran tasoon, keskitys ja ortomittakaava + 8 % reunaa.
        R = rot.to_matrix(); oik, yl = R.col[0], R.col[1]
        pts = [o.matrix_world @ Vector(c) for o in sc.objects if o.type == 'MESH' and o != p for c in o.bound_box]
        us = [q.dot(oik) for q in pts]; vs = [q.dot(yl) for q in pts]
        uc, vc = (min(us) + max(us)) / 2, (min(vs) + max(vs)) / 2
        asp = sc.render.resolution_x / sc.render.resolution_y
        cam_d.ortho_scale = max(max(us) - min(us), (max(vs) - min(vs)) * asp) * 1.08
        cam.location = oik * uc + yl * vc + suunta * 600
        cam_d.clip_end = 2000
        sc.render.filepath = os.path.join(ULOS, f'{t}-{nakyma}.png')
        bpy.ops.render.render(write_still=True)
print('VALMIS')
