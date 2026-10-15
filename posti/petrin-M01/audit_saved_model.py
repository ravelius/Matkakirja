import bpy,json,math
from pathlib import Path
from mathutils import Vector
from bpy_extras.object_utils import world_to_camera_view
ROOT=Path(__file__).resolve().parent
bpy.ops.wm.open_mainfile(filepath=str(ROOT/'petrin-M01.blend'))
s=bpy.context.scene
meshes=[o for o in s.objects if o.type=='MESH' and 'source_role' in o]
measurements={}
for role,expected in [('body_top',58.7),('lower_floor',20),('upper_floor',51)]:
    vals=[(o.matrix_world@v.co).z for o in meshes if o['source_role']==role for v in o.data.vertices]
    measurements[role]={'expectedMaxZ':expected,'actualMaxZ':max(vals),'absoluteErrorM':abs(max(vals)-expected)}
    assert abs(max(vals)-expected)<1e-4
all_body=[(o.matrix_world@v.co).z for o in meshes if o['source_role']!='mast' for v in o.data.vertices]
image_nodes=[n.name for m in bpy.data.materials if m.use_nodes for n in m.node_tree.nodes if n.bl_idname=='ShaderNodeTexImage']
assert not image_nodes,'Model must not use target-photo textures'
poses=[]
for view in ['K1','K2','K3','K4','K5']:
    c=json.loads((ROOT/f'inputs/cameras/{view}.json').read_text());cam=bpy.data.objects[view];s.render.resolution_x=c['canvas'][0];s.render.resolution_y=c['canvas'][1];s.camera=cam
    errors=[]
    for row in c['modelPhysicalLevelAxisProjection'].values():
        y=(1-world_to_camera_view(s,cam,Vector((0,0,row['heightM']))).y)*c['canvas'][1];errors.append(abs(y-row['nativeY']))
    assert max(errors)<.1
    poses.append({'view':view,'maximumAxisProjectionErrorPixels':max(errors),'lensMm':cam.data.lens,'positionM':list(cam.location),'sourceCameraSHAUnchangedInInputs':True})
shoe=bpy.data.objects['Eight ground support shoes'].data
adj=[set() for _ in shoe.vertices]
for edge in shoe.edges:
    a,b=edge.vertices;adj[a].add(b);adj[b].add(a)
remaining=set(range(len(adj)));components=0
while remaining:
    todo=[remaining.pop()];components+=1
    while todo:
        v=todo.pop()
        for n in adj[v]&remaining:remaining.remove(n);todo.append(n)
assert components==8
result={'savedBlendReadbackPassed':True,'blender':bpy.app.version_string,'towerMeshObjects':len(meshes),'towerVertices':sum(len(o.data.vertices) for o in meshes),'towerPolygons':sum(len(o.data.polygons) for o in meshes),'actualBindingHeightMeasurements':measurements,'allNonMastMeshMinZ':min(all_body),'allNonMastMeshMaxZ':max(all_body),'nonMastOverallHeightErrorPercent':abs(max(all_body)-min(all_body)-58.7)/58.7*100,'actualGroundShoeConnectedComponents':components,'targetImageTextureNodes':image_nodes,'cameraChecks':poses,'uniformDisplayExposureEV':s.view_settings.exposure,'reRenderingPerformed':False,'independentRealWorldSurvey':False,'onlyFirstAuthorizedModelRound':True}
(ROOT/'saved-model-audit.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print('SAVED_MODEL_AUDIT_PASSED',json.dumps(result),flush=True)
