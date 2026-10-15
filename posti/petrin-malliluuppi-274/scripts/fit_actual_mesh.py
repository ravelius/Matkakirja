from pathlib import Path
import ctypes,json,math,time,sys,hashlib
import numpy as np
from PIL import Image
P=Path('/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/kuvatuotanto/petrin-tavoitehavainnekuvat-20261014');C=P/'models/continuation-274';S=C/'scripts'
lib=ctypes.CDLL(str(S/'libproject_mesh.dylib'))
F=np.ctypeslib.ndpointer(dtype=np.float32,flags='C_CONTIGUOUS');I=np.ctypeslib.ndpointer(dtype=np.int32,flags='C_CONTIGUOUS');D=np.ctypeslib.ndpointer(dtype=np.float64,flags='C_CONTIGUOUS');U=np.ctypeslib.ndpointer(dtype=np.uint8,flags='C_CONTIGUOUS')
lib.raster_tower.argtypes=[F,ctypes.c_int,I,ctypes.c_int,D,ctypes.c_int,ctypes.c_int,ctypes.c_int,U];lib.raster_tower.restype=None
PREV=sys.argv[2] if len(sys.argv)>2 else 'M11';prev=P/'models'/PREV
meta=json.loads((prev/'projection-mesh.json').read_text());vertices=np.fromfile(prev/'projection-mesh-vertices.f32',dtype=np.float32);triangles=np.fromfile(prev/'projection-mesh-triangles.i32',dtype=np.int32)
assert vertices.size==meta['vertices']*3 and triangles.size==meta['triangles']*3

def vector(c):return np.array([c['cameraAzimuthDegrees'],c['distanceM'],c['heightM'],c['pitchDegrees'],c['verticalFOVDegrees'],*c['principalPointNativePx']],dtype=np.float64)
def render(c,x,scale):
 w,h=c['canvas'];w,h=round(w*scale),round(h*scale);out=np.zeros((h,w),dtype=np.uint8)
 lib.raster_tower(vertices,meta['vertices'],triangles,meta['triangles'],np.ascontiguousarray(x),w,h,c['canvas'][1],out)
 return out>0

cams={v:json.loads((prev/f'inputs/cameras/{v}.json').read_text()) for v in ['K1','K2','K3','K4','K5']}
valid=[];start=time.time()
for v,c in cams.items():
 for scale in [.5,1.0]:
  m=render(c,vector(c),scale);size=(m.shape[1],m.shape[0]);b=np.asarray(Image.open(prev/f'qa/{v}-model-filled-mask.png').resize(size,Image.Resampling.NEAREST))>0;t=np.asarray(Image.open(prev/f'inputs/targets/{v}-mask.png').resize(size,Image.Resampling.NEAREST))>0
  a=(m&t).sum()/max(1,(m|t).sum());actual=(b&t).sum()/max(1,(b|t).sum());agreement=(m&b).sum()/max(1,(m|b).sum())
  valid.append({'view':v,'scale':scale,'softwareVsBlenderFilledMaskIoU':float(agreement),'softwareTargetIoU':float(a),'BlenderTargetIoUAtSameScale':float(actual),'absoluteDifferencePercentagePoints':float(abs(a-actual)*100)})
validation={'parentRound':PREV,'meshVertices':meta['vertices'],'meshTriangles':meta['triangles'],'method':'Rasterize actual saved tower triangles, opaque mask then outside flood fill; analytical perspective camera. Optimization proposal only; final acceptance measured from native Blender render.','rows':valid,'validationSeconds':time.time()-start,'softwareIsNotTheBindingFinalMetric':True}
(C/f'{PREV}-software-projection-validation.json').write_text(json.dumps(validation,indent=2)+'\n')
if sys.argv[1]=='validate':
 print(json.dumps(validation),flush=True);sys.exit(0)

R=sys.argv[1];N=int(R[1:]);assert 12<=N<=15
rng=np.random.default_rng(27400+N);dest=C/f'optimized-cameras/{R}';dest.mkdir(parents=True,exist_ok=True);log={};fitstart=time.time()
cfg=json.loads((prev/'configuration.json').read_text())
for key,value in [('lower_xy_scale',1.0),('upper_xy_scale',1.0),('upper_shoulder_z',57.0),('lower_gallery_xy_scale',1.0)]:cfg.setdefault(key,value)
geometrylog=[]
if R in ['M13','M15']:
    old=dict(cfg);basevertices=vertices.copy().reshape(-1,3);upper=np.zeros(meta['vertices'],bool);mast=np.zeros(meta['vertices'],bool);gallery=np.zeros(meta['vertices'],bool);gallerybracket=np.zeros(meta['vertices'],bool)
    for part in meta['parts']:
        sl=slice(part['firstVertex'],part['firstVertex']+part['vertices'])
        if part['name'].startswith(('Upper','UPPER_FLOOR')) or part['role']=='body_top':upper[sl]=True
        if part['role']=='mast':mast[sl]=True
        if part['name'].startswith(('Lower','LOWER_FLOOR')):gallery[sl]=True
        if part['name'].startswith(('Lower gallery deep structural','Lower gallery side bracket')):gallerybracket[sl]=True
    def transformed(c):
        a=basevertices.copy();z=a[:,2].copy();weight=np.where(z<=7,1,np.maximum(0,(20-z)/13))
        ratio=(1+(c['lower_xy_scale']-1)*weight)/(1+(old['lower_xy_scale']-1)*weight)
        a[:,:2]*=ratio[:,None]
        gw=np.where(gallerybracket,np.clip((z-17.8)/1.9,0,1),1.0)
        gr=(1+(c['lower_gallery_xy_scale']-1)*gw)/(1+(old['lower_gallery_xy_scale']-1)*gw)
        a[gallery,:2]*=gr[gallery,None]
        a[upper,:2]*=c['upper_xy_scale']/old['upper_xy_scale']
        ids=upper&(z>=51);u=z[ids];canonical=np.where(u<=old['upper_shoulder_z'],51+(u-51)*6/(old['upper_shoulder_z']-51),57+(u-old['upper_shoulder_z'])*1.7/(58.7-old['upper_shoulder_z']))
        a[ids,2]=np.where(canonical<=57,51+(canonical-51)*(c['upper_shoulder_z']-51)/6,c['upper_shoulder_z']+(canonical-57)*(58.7-c['upper_shoulder_z'])/1.7)
        a[mast,2]=58.7+(z[mast]-58.7)*(c['mast_top']-58.7)/(old['mast_top']-58.7)
        return np.ascontiguousarray(a.flatten(),dtype=np.float32)
    targetnative={v:np.asarray(Image.open(prev/f'inputs/targets/{v}-mask.png'))>0 for v in cams}
    actual_parent={r['view']:r for r in json.loads((prev/'qa/metrics.json').read_text())['perView']}
    baseline_software={}
    for v,cam in cams.items():
        mm=render(cam,vector(cam),1.0);tt=targetnative[v];baseline_software[v]=float((mm&tt).sum()/max(1,(mm|tt).sum()))
    preserve_minimum={v:min(baseline_software[v],(.85 if v=='K1' else .9)+baseline_software[v]-actual_parent[v]['silhouetteIoU']+.00005) for v in cams if actual_parent[v]['IoUThresholdPassed']}
    def shape_score(c):
        global vertices
        vertices=transformed(c);scores=[]
        for v,cam in cams.items():
            m=render(cam,vector(cam),1.0);t=targetnative[v];value=float((m&t).sum()/max(1,(m|t).sum()));scores.append(value)
        deficits=sum(max(0,preserve_minimum[v]-s) for v,s in zip(cams,scores) if v in preserve_minimum)
        ratios=[s/(.85 if v=='K1' else .9) for v,s in zip(cams,scores)]
        return float(np.mean(scores))+.6*min(ratios)-100*deficits
    ranges={'upper_xy_scale':(.88,1.10),'upper_shoulder_z':(56.2,57.8),'mast_top':(66.5,71.0),'lower_xy_scale':(.93,1.04),'lower_gallery_xy_scale':(.88,1.12)}
    initial=shape_score(cfg)
    for factor in [.12,.05,.02]:
        for key,(lo,hi) in ranges.items():
            choice=(initial,cfg[key])
            for sign in [-1,1]:
                q=dict(cfg);q[key]=np.clip(q[key]+sign*(hi-lo)*factor,lo,hi);value=shape_score(q)
                if value>choice[0]:choice=(value,float(q[key]))
            if choice[1]!=cfg[key]:geometrylog.append({'parameter':key,'before':cfg[key],'after':choice[1],'objectiveBefore':initial,'objectiveAfter':choice[0]})
            initial,cfg[key]=choice
    vertices=transformed(cfg)
def fit_view(item):
 v,c=item
 rng=np.random.default_rng(274000+N*10+int(v[1:])) if N>=14 else globals()['rng']
 # Use half resolution only when its actual-mesh raster agrees within one percentage point.
 row=next(x for x in valid if x['view']==v and x['scale']==.5)
 scale=1.0
 w,h=c['canvas'];size=(round(w*scale),round(h*scale));target=np.asarray(Image.open(prev/f'inputs/targets/{v}-mask.png').resize(size,Image.Resampling.NEAREST))>0
 def score(x):
  m=render(c,x,scale);return float((m&target).sum()/max(1,(m|target).sum()))
 base=json.loads((P/f'models/M09/inputs/cameras/{v}.json').read_text());b=vector(base);x=vector(c)
 low=np.array([b[0]-6,b[1]*.85,max(.8,b[2]*.85),b[3]-3,b[4]*.88,b[5]-30,b[6]-30]);high=np.array([b[0]+6,b[1]*1.15,b[2]*1.15+.25,b[3]+3,b[4]*1.12,b[5]+30,b[6]+30]);span=high-low
 x=np.clip(x,low,high);before=best=score(x);steps=span*.12;evals=1
 if N>=14:
  pop=low+rng.random((18,7))*span;pop[0]=x;scores=np.array([score(q) for q in pop]);evals+=len(pop)
  for generation in range(22):
   for i in range(len(pop)):
    ids=[j for j in range(len(pop)) if j!=i];aa,bb,cc=rng.choice(ids,3,replace=False)
    mutant=np.clip(pop[aa]+.65*(pop[bb]-pop[cc]),low,high);cross=rng.random(7)<.8;cross[rng.integers(7)]=True
    q=np.where(cross,mutant,pop[i]);value=score(q);evals+=1
    if value>scores[i]:pop[i]=q;scores[i]=value
  index=int(scores.argmax())
  if scores[index]>best:best=float(scores[index]);x=pop[index].copy()
 # Deterministic coordinate search plus correlated local perturbations of real camera parameters.
 for sweep in range(8):
  for k in [4,3,6,5,1,2,0]:
   choice=(best,x)
   for sign in [-1,1]:
    q=x.copy();q[k]=np.clip(q[k]+sign*steps[k],low[k],high[k]);s=score(q);evals+=1
    if s>choice[0]:choice=(s,q)
   best,x=choice
  steps*=.7
 for i in range(100):
  q=np.clip(x+rng.normal(0,1,7)*span*(.03 if i<60 else .01),low,high);s=score(q);evals+=1
  if s>best:best,x=s,q
 az,dist,hei,pitch,fov,cx,cy=map(float,x);a=math.radians(az);p=math.radians(pitch);f=c['canvas'][1]/(2*math.tan(math.radians(fov)/2))
 c.update(cameraAzimuthDegrees=az,distanceM=dist,heightM=hei,pitchDegrees=pitch,verticalFOVDegrees=fov,principalPointNativePx=[cx,cy],positionRelativeTowerCenterM=[dist*math.sin(a),dist*math.cos(a),hei],focalLengthNativePixels=f,sourceTaskNumber=274,fittingMethod='Task274 numerical perspective-camera fit of actual saved opaque tower triangles; native Blender silhouette metric remains binding',PTCameraAcceptanceVerified=False)
 for name,row in c['modelPhysicalLevelAxisProjection'].items():
  if name=='mastTopApprox':row['heightM']=cfg['mast_top']
  z=row['heightM'];y=cy-f*math.tan(math.atan2(z-hei,dist)-p);row.update(nativeY=y,normalizedY=y/c['canvas'][1])
 c['fixedPhysicalDimensions'].update(totalHeightApproxM=cfg['mast_top'],totalHeightUncertain=True)
 (dest/f'{v}.json').write_text(json.dumps(c,ensure_ascii=False,indent=2)+'\n')
 itemlog={'parentRound':PREV,'softwareFitScale':scale,'beforeIoU':before,'afterIoU':best,'evaluations':evals,'lowerBounds':low.tolist(),'upperBounds':high.tolist(),'cameraOptimizationOnlyNoImageWarp':True,'nativeFinalBlenderRenderRequired':True}
 print(json.dumps({'round':R,'view':v,'softwareIoUBefore':before,'softwareIoUAfter':best,'elapsedSeconds':time.time()-fitstart}),flush=True)
 return v,itemlog

from concurrent.futures import ThreadPoolExecutor
with ThreadPoolExecutor(max_workers=3 if N>=14 else 1) as pool:
 for v,itemlog in pool.map(fit_view,cams.items()):log[v]=itemlog

(C/f'{R}-configuration.json').write_text(json.dumps(cfg,indent=2)+'\n')
(C/f'{R}-actual-mesh-camera-fit.json').write_text(json.dumps({'round':R,'parentRound':PREV,'sourceTask':274,'cameraFits':log,'geometryChanges':geometrylog,'preservePassingViewsDuringGeometrySearch':locals().get('preserve_minimum',{}),'seconds':time.time()-fitstart,'bindingHeightsM':[58.7,20,51],'newAIImages':0,'maskImagesUnchanged':True},indent=2)+'\n')
