import bpy, sys, math, os
ARGS = sys.argv[sys.argv.index('--') + 1:]; sys.argv = [sys.argv[0]]
exec(open('/Users/Shared/Claude/wt/linnanrakentaja-sokrates-bysti/tools/linssit/blender/sokrates_bysti.py').read())
from mathutils import Vector, Matrix
ULOS, KAIKU, VOIMA, LEV_K = ARGS[0], ARGS[1], float(ARGS[2]), float(ARGS[3])
o = rakenna(64); sc = bpy.context.scene; _kipsin_pinta(o)
for nimi in ('sivu', 'reuna', 'tayte'): bpy.data.objects[nimi].hide_render = True
sc.world.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.0      # kaiku ainoa valo
p, n = osuma(0.040, 0.374)                                                          # vasen silmämuna (katsojasta oikea)
print('SILMA', tuple(round(v, 4) for v in p), tuple(round(v, 2) for v in n))
kaiku_projektori('kaiku', p, (n + Vector((-0.75, 0.0, 0.30))).normalized(), 0.5, LEV_K, KAIKU, (1, 100), VOIMA)
cd = bpy.data.cameras.new('k'); cd.lens = 50; cd.sensor_fit = 'VERTICAL'; cd.sensor_height = 24; cd.clip_start = 0.002
cam = bpy.data.objects.new('k', cd); sc.collection.objects.link(cam); sc.camera = cam
cs = (n + Vector((0.25, 0.0, -0.20))).normalized(); cam.location = p + cs * float(ARGS[4]); kohdista(cam, p + Vector((0, 0, 0.001)))
cd.dof.use_dof = False
sc.frame_set(50); sc.render.resolution_x, sc.render.resolution_y = 590, 1278
sc.render.filepath = ULOS; bpy.ops.render.render(write_still=True); print('SILMA valmis', ULOS)
