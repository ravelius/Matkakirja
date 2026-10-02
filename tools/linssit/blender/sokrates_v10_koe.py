import bpy, sys, math, os
ARGS = sys.argv[sys.argv.index('--') + 1:]; sys.argv = [sys.argv[0]]
exec(open('/Users/Shared/Claude/wt/linnanrakentaja-sokrates-bysti/tools/linssit/blender/sokrates_bysti.py').read())
from mathutils import Vector, Matrix
ULOS, T, ISO = ARGS[0], ARGS[1], float(ARGS[2])
o = rakenna(48); sc = bpy.context.scene; _kipsin_pinta(o)
for nimi in ('sivu', 'reuna', 'tayte'): bpy.data.objects[nimi].hide_render = True
aur = bpy.data.lights.new('aurinko', 'SPOT'); aur.spot_size = math.radians(60); aur.spot_blend = 0.3; aur.shadow_soft_size = 0.012
aur.color = (1.0, 0.95, 0.88); aur.energy = 95; ao = bpy.data.objects.new('aurinko', aur); sc.collection.objects.link(ao)
ao.location = PAA + Vector((0.70, -0.70, 0.85)).normalized() * 1.3; kohdista(ao, PAA)
p, n = osuma(-0.005, 0.418); su = (n + Vector((-0.40, -0.15, -0.30))).normalized()
v4_projektori('paa', p, su, 0.6, 0.075, os.path.join(T, 'paa-38a.png'), 0.0205 * ISO, (100, 400), V7_TYKKI)
kiertopiste('tausta', (p, su), None, (10, 60, 900, 950), V7_TYKKI, T, 0.11, (0.006, 0.008, 0.010, 0.013), 38)
c, t, u = lentoasento(p, n, kulma=55, matka=0.11)
cd = bpy.data.cameras.new('k'); cd.lens = V3B_LINSSI; cd.sensor_fit = 'VERTICAL'; cd.sensor_height = 24; cd.clip_start = 0.003
cam = bpy.data.objects.new('k', cd); sc.collection.objects.link(cam); sc.camera = cam; cam.location = c; kohdista(cam, p)
sc.render.resolution_x, sc.render.resolution_y = 590, 1278
for r in (180, 250):
    sc.frame_set(r); sc.render.filepath = f'{ULOS}-{r}.png'; bpy.ops.render.render(write_still=True)
print('V10 valmis')
