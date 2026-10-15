import bpy, json, hashlib, struct, shutil, time
from pathlib import Path
ROOT=Path(__file__).resolve().parent
old=ROOT/'renders/exposure-diagnostic-v0';old.mkdir(exist_ok=True)
for view in ['K1','K2','K3','K4','K5']:
    shutil.copy2(ROOT/f'renders/{view}-model.png',old/f'{view}-model.png')
shutil.copy2(ROOT/'petrin-M01.blend',ROOT/'petrin-M01-before-display-exposure.blend')
shutil.copytree(ROOT/'qa',ROOT/'qa-exposure-diagnostic-v0',dirs_exist_ok=True)
bpy.ops.wm.open_mainfile(filepath=str(ROOT/'petrin-M01.blend'))
scene=bpy.context.scene
def geometry_hash():
    h=hashlib.sha256()
    for ob in sorted((o for o in scene.objects if o.type=='MESH'),key=lambda o:o.name):
        h.update(ob.name.encode())
        for row in ob.matrix_world:
            h.update(struct.pack('4d',*row))
        for v in ob.data.vertices:h.update(struct.pack('3d',*v.co))
        for p in ob.data.polygons:h.update(struct.pack(str(len(p.vertices))+'I',*p.vertices))
    return h.hexdigest()
def camera_hash():
    h=hashlib.sha256()
    for ob in sorted((o for o in scene.objects if o.type=='CAMERA'),key=lambda o:o.name):
        h.update(ob.name.encode())
        for row in ob.matrix_world:h.update(struct.pack('4d',*row))
        h.update(struct.pack('5d',ob.data.lens,ob.data.sensor_height,ob.data.sensor_width,ob.data.shift_x,ob.data.shift_y))
    return h.hexdigest()
g0,c0=geometry_hash(),camera_hash()
scene.view_settings.exposure=-2.5
pref=bpy.context.preferences.addons['cycles'].preferences;pref.compute_device_type='METAL';pref.get_devices()
for d in pref.devices:d.use=d.type=='METAL'
scene.cycles.device='GPU';scene.cycles.samples=48
for view in ['K1','K2','K3','K4','K5']:
    cfg=json.loads((ROOT/f'inputs/cameras/{view}.json').read_text())
    scene.camera=bpy.data.objects[view];scene.render.resolution_x=cfg['canvas'][0];scene.render.resolution_y=cfg['canvas'][1]
    scene.render.filepath=str(ROOT/f'renders/{view}-model.png')
    print('EXPOSURE_RENDER',view,flush=True);bpy.ops.render.render(write_still=True)
assert geometry_hash()==g0 and camera_hash()==c0
scene.camera=bpy.data.objects['K1'];scene.render.resolution_x=1536;scene.render.resolution_y=1024
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'petrin-M01.blend'),compress=True)
audit={'round':'M01','geometryIterations':1,'uniformDisplayExposureEV':-2.5,'geometrySHA256Before':g0,'geometrySHA256After':geometry_hash(),'cameraSHA256Before':c0,'cameraSHA256After':camera_hash(),'geometryUnchanged':True,'camerasUnchanged':True,'materialsUnchanged':True,'oldRendersPreserved':True,'targetPhotographsUnchanged':True,'rawGeometryMasksUnchanged':True,'onlyTechnicalDisplayExposureNormalization':True}
(ROOT/'exposure-normalization.json').write_text(json.dumps(audit,indent=2)+'\n')
manifest=json.loads((ROOT/'geometry-manifest.json').read_text());manifest['uniformDisplayExposureEV']=-2.5;manifest['geometrySHA256']=g0;manifest['cameraSHA256']=c0;(ROOT/'geometry-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print('EXPOSURE_NORMALIZED_GEOMETRY_AND_CAMERAS_UNCHANGED',flush=True)
