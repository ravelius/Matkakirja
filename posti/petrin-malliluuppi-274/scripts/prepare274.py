from pathlib import Path
from datetime import datetime,timezone
import sys,json,shutil,hashlib
P=Path('/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/kuvatuotanto/petrin-tavoitehavainnekuvat-20261014')
B=P/'models/M09';C=P/'models/continuation-274';R=sys.argv[1];N=int(R[1:]);assert 11<=N<=15
D=P/'models'/R;assert not (D/f'petrin-{R}.blend').exists()
D.mkdir(exist_ok=True)
for f in ['renders','qa','inputs/cameras','inputs/targets']:(D/f).mkdir(parents=True,exist_ok=True)
cfg=json.loads((C/f'{R}-configuration.json').read_text()) if (C/f'{R}-configuration.json').exists() else json.loads((B/'configuration.json').read_text())
if R=='M11':
 cfg.update(upper_cabin_radius=3.70,upper_spandrel=1.4,upper_underside_bottom=50.0,upper_underside_inner_radius=2.35,lower_support_detail=True,red_window_shutters=True,lighting='neutral-white-world-sun-gray-ground',steel_sRGB='505F73',trim_sRGB='8E9AAB',roof_sRGB='6E7E90',cream_sRGB='E9DFCA',glass_sRGB='313C4D',red_sRGB='A34F45',displayExposureEV=0.0)
for key,value in [('lower_xy_scale',1.0),('upper_xy_scale',1.0),('upper_shoulder_z',57.0),('lower_gallery_xy_scale',1.0)]:cfg.setdefault(key,value)
(D/'configuration.json').write_text(json.dumps(cfg,indent=2)+'\n')
for f in (B/'inputs/targets').iterdir():
 if f.is_file() and not f.name.startswith('._'):shutil.copy2(f,D/'inputs/targets'/f.name)
for v in ['K1','K2','K3','K4','K5']:
 src=C/f'optimized-cameras/{R}/{v}.json'
 if not src.exists():src=B/f'inputs/cameras/{v}.json'
 data=json.loads(src.read_text());data.update(parentCameraFileSHA256=hashlib.sha256(src.read_bytes()).hexdigest(),sourceTaskNumber=274,maskSHA256=hashlib.sha256((D/f'inputs/targets/{v}-mask.png').read_bytes()).hexdigest(),activeTargetMaskVersion='PT-accepted-current',PTCameraAcceptanceVerified=False)
 (D/f'inputs/cameras/{v}.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
s=(B/'build_and_render.py').read_text().replace('M09',R).replace("'maximumTotalModelRounds':10","'maximumTotalModelRounds':15")
s=s.replace("MAST_TOP=CFG['mast_top']", "MAST_TOP=68.6125 # M09 basis; target mast Z applied by explicit geometry transform below")
s=s.replace('scene.view_settings.exposure=-2.5',"scene.view_settings.exposure=CFG['displayExposureEV']")
for old,key in [('A5ACB5','steel_sRGB'),('C7CDD3','trim_sRGB'),('9DA9AD','roof_sRGB'),('EFE3C0','cream_sRGB'),('777E83','glass_sRGB'),('773530','red_sRGB')]:
 assert "'"+old+"'" in s,old;s=s.replace("'"+old+"'",'CFG['+repr(key)+']')
s=s.replace("'718952'","'777777'")
s='\n'.join("world=bpy.data.worlds.new('Neutral white daylight');world.use_nodes=True;scene.world=world;bg=world.node_tree.nodes.get('Background');bg.inputs['Color'].default_value=(.8,.8,.8,1);bg.inputs['Strength'].default_value=.8" if line.startswith("world=bpy.data.worlds.new('Procedural daylight')") else line for line in s.splitlines())+'\n'
s=s.replace('light.energy=2.3','light.energy=2.0')
s=s.replace("2.75,48.9,CFG['upper_cabin_radius'],50.7", "CFG['upper_underside_inner_radius'],CFG['upper_underside_bottom'],CFG['upper_cabin_radius'],50.7")
s=s.replace('for t in range(5):\n            a=t/5;c=(t+1)/5', 'for t in range(8):\n            a=t/8;c=(t+1)/8')
detail='''# Task274: actual dark gallery braces and reconstructed red shutters.
if CFG['lower_support_detail']:
    q=ring(CFG['lower_gallery_radius'],19.7);a=ring(CFG['leg_r20']+.1,17.8)
    for i in range(8):
        rod(bucket('Lower gallery deep structural brackets','steel'),a[i],q[i],.16)
        rod(bucket('Lower gallery side bracket ties','steel'),a[i],q[(i+1)%8],.10)
if CFG['red_window_shutters']:
    for i in range(8):
        A=corners[i];B=corners[(i+1)%8];u=(B-A).normalized();mid=(A+B)/2;n=Vector((mid.x,mid.y,0)).normalized();width=(B-A).length
        for center in [-width*.30,0,width*.30]:
            if n.y<-.95 and center==0:continue
            for side in [-1,1]:
                q=mid+u*(center+side*.91)+n*.08+Vector((0,0,2.55))
                box(bucket('Estimated red window shutters','red'),q,u*.31,n*.08,2.75)
                for z in [1.3,3.8]:box(bucket('Shutter metal hinges','dark'),q+Vector((0,0,z-2.55)),u*.28,n*.11,.07)

'''
deform='''# Task274 bounded 3D geometry parameters. All binding Z levels remain fixed.
for name,b in buckets.items():
    gallery=name.startswith('Lower') or name.startswith('LOWER_FLOOR')
    gallery_bracket=name.startswith(('Lower gallery deep structural','Lower gallery side bracket'))
    upper=name.startswith('Upper') or name.startswith('UPPER_FLOOR') or b['role']=='body_top'
    changed=[]
    for x,y,z in b['v']:
        weight=1.0 if z<=7 else max(0.0,(20.0-z)/13.0)
        low=1.0+(CFG['lower_xy_scale']-1.0)*weight
        x*=low;y*=low
        if gallery:
            gallery_weight=max(0.0,min(1.0,(z-17.8)/1.9)) if gallery_bracket else 1.0
            gallery_scale=1.0+(CFG['lower_gallery_xy_scale']-1.0)*gallery_weight
            x*=gallery_scale;y*=gallery_scale
        if upper:
            x*=CFG['upper_xy_scale'];y*=CFG['upper_xy_scale']
            if z>=51:
                z=51+(z-51)*(CFG['upper_shoulder_z']-51)/6 if z<=57 else CFG['upper_shoulder_z']+(z-57)*(58.7-CFG['upper_shoulder_z'])/1.7
        if b['role']=='mast':z=58.7+(z-58.7)*(CFG['mast_top']-58.7)/(68.6125-58.7)
        changed.append((x,y,z))
    b['v']=changed

'''
s=s.replace('tower=[]',detail+deform+'tower=[]')
export='''# Actual opaque tower triangles for numerical camera fitting, never a target-image warp.
import array
allv=[];allt=[];parts=[]
for ob in tower:
    start=len(allv)//3
    for v in ob.data.vertices:allv.extend(ob.matrix_world@v.co)
    count0=len(allt)//3
    for f in ob.data.polygons:
        ids=list(f.vertices)
        for j in range(1,len(ids)-1):allt.extend([start+ids[0],start+ids[j],start+ids[j+1]])
    parts.append({'name':ob.name,'role':ob['source_role'],'firstVertex':start,'vertices':len(ob.data.vertices),'firstTriangle':count0,'triangles':len(allt)//3-count0})
with (ROOT/'projection-mesh-vertices.f32').open('wb') as f:array.array('f',allv).tofile(f)
with (ROOT/'projection-mesh-triangles.i32').open('wb') as f:array.array('i',allt).tofile(f)
(ROOT/'projection-mesh.json').write_text(json.dumps({'round':ROOT.name,'vertices':len(allv)//3,'triangles':len(allt)//3,'source':'actual same tower objects used for Blender rendering, world coordinates','parts':parts},indent=2)+'\\n')

'''
s=s.replace('# Neutral three-dimensional context;',export+'# Neutral three-dimensional context;')
(D/'build_and_render.py').write_text(s)
for name in ['analyse_round.py','audit_saved_model.py']:
 a=(B/name).read_text().replace('M09',R).replace("'modelIterationsCompleted':9","'modelIterationsCompleted':"+str(N)).replace("'maximumTotalModelRounds':10","'maximumTotalModelRounds':15").replace('Task273 active continuation: stop at all five IoU thresholds or ten total model rounds; final PT acceptance separate.','Task274: max five additional rounds M11-M15 from M09; stop for PT feedback.').replace('uniformDisplayExposureEV','displayExposureEV')
 (D/name).write_text(a)
for src,dest in [(C/'authorization.json',D/'authorization.json'),(B/'source-licenses.json',D/'source-licenses.json')]:shutil.copy2(src,dest)
print(json.dumps({'prepared':R,'parent':'M09','cfg':cfg}),flush=True)
