# Faceit vaihe 2 (Linnanrakentaja 6.10.2026): ARKit-ilmeiden leivonta muotoavaimiksi, vain tarvittavat 16 muotoa jäävät,
# Faceitin riggi, maamerkit ja faceit_*-ryhmät pois, vienti glb:ksi (skin + morph targets, leikkeet ennallaan).
#   Blender -b <vaihe1.blend> -P faceit_leivo.py -- <ulos.glb>
import bpy, sys, addon_utils
ULOS = sys.argv[sys.argv.index('--') + 1]
addon_utils.enable('bl_ext.user_default.faceit', default_set=True)
PIDA = ['eyeBlinkLeft', 'eyeBlinkRight', 'jawOpen', 'mouthClose', 'mouthFunnel', 'mouthPucker', 'mouthStretchLeft', 'mouthStretchRight',
        'mouthRollLower', 'mouthSmileLeft', 'mouthSmileRight', 'mouthFrownLeft', 'mouthFrownRight', 'browInnerUp', 'browDownLeft', 'browDownRight']
r = bpy.ops.faceit.generate_shapekeys('EXEC_DEFAULT', modifier_action='FACEIT'); print('LEIVO generate_shapekeys', r)
sc = bpy.context.scene
for it in list(sc.faceit_face_objects):
    o = it.obj_pointer
    if o is None or o.data.shape_keys is None: continue
    kaikki = [k.name for k in o.data.shape_keys.key_blocks]
    for k in list(o.data.shape_keys.key_blocks)[1:]:
        if k.name not in PIDA: o.shape_key_remove(k)
    perus = o.data.shape_keys.key_blocks[0].data
    for k in list(o.data.shape_keys.key_blocks)[1:]:  # tyhjät muodot pois (alle 0,5 mm), esim. tukka ja silmämunat
        if max((k.data[i].co - perus[i].co).length for i in range(len(perus))) < 0.0005: o.shape_key_remove(k)
    jaljella = [k.name for k in o.data.shape_keys.key_blocks][1:]
    if not jaljella: o.shape_key_clear()
    for g in list(o.vertex_groups):
        if g.name.startswith('faceit_'): o.vertex_groups.remove(g)
    for m in list(o.modifiers):
        if m.type == 'ARMATURE' and m.object and m.object.name.startswith('FaceitRig'): o.modifiers.remove(m)
    if not any(m.type == 'ARMATURE' and m.object and not m.object.name.startswith('FaceitRig') for m in o.modifiers):
        o.modifiers.new('Armature', 'ARMATURE').object = [a for a in bpy.data.objects if a.type == 'ARMATURE' and not a.name.startswith('FaceitRig')][0]
        print(f'LEIVO {o.name}: vartalon Armature-muokkain palautettu')
    print(f'LEIVO {o.name}: {len(kaikki) - 1} → {len(jaljella)} muotoa', jaljella if len(jaljella) < 20 else '')
for o in list(bpy.data.objects):
    if o.name.startswith('FaceitRig') or o.name.startswith('facial_landmarks') or 'faceit' in o.name.lower(): bpy.data.objects.remove(o)
arm = [o for o in bpy.data.objects if o.type == 'ARMATURE'][0]
for a in list(bpy.data.actions):
    if 'faceit' in a.name.lower() or a.name in ('overwrite_shape_action', 'shapes_action'): bpy.data.actions.remove(a)
print('LEIVO toiminnot', sorted(a.name for a in bpy.data.actions))
arm.animation_data.action = None
for pb in arm.pose.bones: pb.matrix_basis = pb.matrix_basis.__class__()
bpy.ops.object.mode_set(mode='OBJECT') if bpy.context.object and bpy.context.object.mode != 'OBJECT' else None
bpy.ops.object.select_all(action='DESELECT'); arm.select_set(True)
for o in arm.children: o.select_set(True)
bpy.context.view_layer.objects.active = arm
bpy.ops.export_scene.gltf(filepath=ULOS, use_selection=True, export_format='GLB', export_animation_mode='ACTIONS', export_skins=True,
                          export_morph=True, export_morph_normal=False, export_yup=True, export_apply=False,
                          export_image_format='JPEG', export_jpeg_quality=85)
print('LEIVO valmis', ULOS)
