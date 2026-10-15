from pathlib import Path
import sys,json,math,time,hashlib
import numpy as np
from PIL import Image,ImageDraw

P=Path('/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/kuvatuotanto/petrin-tavoitehavainnekuvat-20261014')
C=P/'models/continuation-273'
R=sys.argv[1];PREV=sys.argv[2]
assert 3<=int(R[1:])<=10
previous=P/'models'/PREV
cfg=json.loads((previous/'configuration.json').read_text())
original={v:json.loads((P/f'models/M01/inputs/cameras/{v}.json').read_text()) for v in ['K1','K2','K3','K4','K5']}
cams={v:json.loads((previous/f'inputs/cameras/{v}.json').read_text()) for v in original}
rng=np.random.default_rng(27300+int(R[1:]));start=time.time()


def geometry(c):
    verts=[];faces=[];rot=math.radians(19.5)
    def ring(r,z,n=8):return [(r*math.cos(rot+i*2*math.pi/n),r*math.sin(rot+i*2*math.pi/n),z) for i in range(n)]
    def solid(r0,z0,r1,z1,n=8):
        i=len(verts);verts.extend(ring(r0,z0,n)+ring(r1,z1,n))
        faces.extend([[i+j,i+(j+1)%n,i+n+(j+1)%n,i+n+j] for j in range(n)])
        faces.extend([list(range(i,i+n)),list(range(i+n,i+2*n))])
    profile=[(7,c['leg_r7']+.10),(12,c['leg_r12']+.10),(20,c['leg_r20']+.10),(24,5.0),(32,4.3),(40,3.7),(51,2.85)]
    for (z0,r0),(z1,r1) in zip(profile,profile[1:]):solid(r0,z0,r1,z1)
    hall=c['hall_flat_width']/2/math.cos(math.pi/8)
    solid(hall,0,hall,5.4);solid(hall+.5,5.4,.5,7)
    low=c['lower_gallery_radius']
    solid(low,19.7,low,21.25)
    solid(6.55*low/8.15,20,6.55*low/8.15,20+c['lower_glass_height'])
    solid(6.8*low/8.15,20+c['lower_glass_height'],5,20.6+c['lower_glass_height'])
    up=c['upper_cabin_radius']
    solid(up,50.7,up,57);solid(up*4.45/4.06,57,.32,58.7)
    if int(R[1:])>=8:solid(2.75,48.9,up,50.7)
    solid(.65,58.7,.65,c['mast_top']-.3,4)
    solid(.04,c['mast_top']-.6,.04,c['mast_top'],4)
    # Separate perimeter support rods; no convex hull is filled across open feet.
    for j in range(8):
        a=rot+j*math.pi/4
        for z0,r0,z1,r1 in [(0,c['foot_radius'],7,c['leg_r7'])]:
            i=len(verts)
            p=np.array([r0*math.cos(a),r0*math.sin(a),z0]);q=np.array([r1*math.cos(a),r1*math.sin(a),z1]);u=np.array([-.22*math.sin(a),.22*math.cos(a),0]);t=np.array([0,0,.22])
            verts.extend([p-u-t,p+u-t,p+u+t,p-u+t,q-u-t,q+u-t,q+u+t,q-u+t])
            faces.extend([[i+x for x in face] for face in [(0,1,2,3),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]])
    return np.asarray(verts),faces


def vector(c):
    return np.array([c['cameraAzimuthDegrees'],c['distanceM'],c['heightM'],c['pitchDegrees'],c['verticalFOVDegrees'],*c['principalPointNativePx']],dtype=float)


def project(vertices,x):
    az,D,H,pitch,fov,cx,cy=x;a,p=math.radians(az),math.radians(pitch)
    camera=np.array([D*math.sin(a),D*math.cos(a),H]);q=vertices-camera
    forward=np.array([-math.sin(a)*math.cos(p),-math.cos(a)*math.cos(p),math.sin(p)])
    right=np.array([-math.cos(a),math.sin(a),0]);up=np.cross(right,forward)
    d=q@forward
    return q@right/d,q@up/d


def mask(c,vertices,faces,x,size):
    w,h=c['canvas'];scale=size[1]/h;f=h/(2*math.tan(math.radians(x[4])/2))
    px,py=project(vertices,x);xy=np.column_stack([(x[5]+f*px)*scale,(x[6]-f*py)*scale])
    im=Image.new('1',size);draw=ImageDraw.Draw(im)
    for ids in faces:draw.polygon([tuple(v) for v in xy[ids]],fill=1)
    return np.asarray(im)


targets={}
for v,c in cams.items():
    w,h=c['canvas'];size=(round(w/4),round(h/4))
    targets[v]=(np.asarray(Image.open(previous/f'inputs/targets/{v}-mask.png').convert('L').resize(size,Image.Resampling.NEAREST))>127,size)


def iou(v,x,g):
    target,size=targets[v];m=mask(cams[v],*g,x,size)
    return (m&target).sum()/max(1,(m|target).sum())


def camfit(v,c,geom):
    base=vector(original[v]);x=vector(c)
    lower=np.array([base[0]-5,base[1]*.8,max(.8,base[2]*.8),base[3]-5,base[4]*.78,base[5]-35,base[6]-35])
    upper=np.array([base[0]+5,base[1]*1.2,base[2]*1.2+(.5 if base[2]<3 else 0),base[3]+5,base[4]*1.22,base[5]+35,base[6]+35])
    if R=='M10':
        # Final authorized trial: wider but finite pose bounds around uncertain starting estimates.
        lower=np.array([base[0]-12,base[1]*.7,max(.8,base[2]*.75),base[3]-6,base[4]*.75,base[5]-45,base[6]-45])
        upper=np.array([base[0]+12,base[1]*1.3,base[2]*1.25+(.6 if base[2]<3 else 0),base[3]+6,base[4]*1.25,base[5]+45,base[6]+45])
    x=np.clip(x,lower,upper);score=iou(v,x,geom);before=score
    span=upper-lower;steps=span*.12
    if int(R[1:])>=6:
        # Broader bounded search resolves correlated pose/FOV variables without changing the mask.
        pop=lower+rng.random((26,7))*span;pop[0]=x
        scores=np.array([iou(v,q,geom) for q in pop])
        for generation in range(38):
            for i in range(len(pop)):
                ids=[j for j in range(len(pop)) if j!=i]
                a,b,c=rng.choice(ids,3,replace=False)
                mutant=np.clip(pop[a]+.65*(pop[b]-pop[c]),lower,upper)
                cross=rng.random(7)<.8;cross[rng.integers(7)]=True
                q=np.where(cross,mutant,pop[i]);s=iou(v,q,geom)
                if s>scores[i]:pop[i]=q;scores[i]=s
        idx=int(scores.argmax())
        if scores[idx]>score:score=float(scores[idx]);x=pop[idx].copy()
    for sweep in range(9):
        for k in [4,3,5,6,1,2,0]:
            best=(score,x)
            for sign in [-1,1]:
                q=x.copy();q[k]=np.clip(q[k]+sign*steps[k],lower[k],upper[k]);s=iou(v,q,geom)
                if s>best[0]:best=(s,q)
            score,x=best
        steps*=.70
    for k in range(160):
        q=np.clip(x+rng.normal(0,1,7)*span*(.025 if k<80 else .008),lower,upper);s=iou(v,q,geom)
        if s>score:score,x=s,q
    return x,{'proxyIoUBefore':float(before),'proxyIoUAfter':float(score),'bounds':{'lower':lower.tolist(),'upper':upper.tolist()},'optimizationUsesSimplifiedPhysicalEnvelopeOnly':True,'notAnExactRenderedIoUPass':True}


def apply(c,x):
    c=json.loads(json.dumps(c));az,D,H,pitch,fov,cx,cy=map(float,x);w,h=c['canvas'];a=math.radians(az)
    c.update(cameraAzimuthDegrees=az,distanceM=D,heightM=H,pitchDegrees=pitch,verticalFOVDegrees=fov,principalPointNativePx=[cx,cy],positionRelativeTowerCenterM=[D*math.sin(a),D*math.cos(a),H],focalLengthNativePixels=h/(2*math.tan(math.radians(fov)/2)),noMeshModelOrRenderCreated=False,cameraSilhouetteOptimizationAuthorizedByTask=273,fitIsNotUniqueRecoveredCamera=True,PTCameraAcceptanceVerified=False)
    f=c['focalLengthNativePixels'];levels={}
    for key,z in [('ground',0),('hallRoofApprox',7),('lowerPlatform',20),('upperPlatform',51),('bodyTop',58.7),('mastTopApprox',cfg['mast_top'])]:
        _,yy=project(np.array([[0,0,z]]),x);y=cy-f*float(yy[0]);levels[key]={'heightM':z,'nativeY':y,'normalizedY':y/h}
    c['modelPhysicalLevelAxisProjection']=levels
    c['fixedPhysicalDimensions'].update(totalHeightApproxM=cfg['mast_top'],totalHeightUncertain=True)
    c['fittingMethod']='Task273 bounded numerical silhouette fit of 3D physical envelope; exact actual geometry/render IoU measured separately after Blender render'
    if R=='M10':
        v=c['cameraID'];c['parentCameraSourceTaskNumber']=c['sourceTaskNumber'];c['sourceTaskNumber']=273
        c['parentCameraOriginalMaskSHA256']=c['maskSHA256'];c['maskSHA256']=hashlib.sha256((previous/f'inputs/targets/{v}-mask.png').read_bytes()).hexdigest()
        c['parentOriginalCameraSHA256']=hashlib.sha256((P/f'models/M01/inputs/cameras/{v}.json').read_bytes()).hexdigest()
    return c


geom=geometry(cfg);fitlog={}
for v in cams:
    x,log=camfit(v,cams[v],geom);cams[v]=apply(cams[v],x);fitlog[v]=log

# Coordinate-search uncertain widths/mast only after first camera-only refinement.
geometrylog=[]
if int(R[1:])>=4:
    ranges={'foot_radius':(11.4,13.8),'hall_flat_width':(18.0,22.0),'leg_r7':(9.5,11.4),'leg_r12':(7.8,9.5),'leg_r20':(5.1,6.4),'lower_gallery_radius':(6.7,8.4),'upper_cabin_radius':(3.4,4.5),'mast_top':(66.5,71.0)}
    def score(c):
        g=geometry(c);vals=[iou(v,vector(cams[v]),g) for v in cams]
        return float(np.mean(vals))+.4*min(vals)
    old=score(cfg)
    for factor in [.06,.025]:
        for key,(lo,hi) in ranges.items():
            best=(old,cfg[key]);step=(hi-lo)*factor
            for sign in [-1,1]:
                c=dict(cfg);c[key]=max(lo,min(hi,c[key]+sign*step));s=score(c)
                if s>best[0]:best=(s,c[key])
            if best[1]!=cfg[key]:geometrylog.append({'parameter':key,'before':cfg[key],'after':best[1],'proxyObjectiveBefore':old,'proxyObjectiveAfter':best[0]})
            old,cfg[key]=best
    geom=geometry(cfg)
    for v in cams:
        x,log=camfit(v,cams[v],geom);cams[v]=apply(cams[v],x);fitlog[v]['afterGeometryFit']=log
if int(R[1:])>=5:
    cfg['facade_detail_level']=2
    cfg['lattice_pitch']=1.4
    cfg['lattice_rod_radius']=.095

dest=C/f'optimized-cameras/{R}';dest.mkdir(parents=True,exist_ok=True)
for v,c in cams.items():(dest/f'{v}.json').write_text(json.dumps(c,ensure_ascii=False,indent=2)+'\n')
(C/f'{R}-configuration.json').write_text(json.dumps(cfg,indent=2)+'\n')
log={'round':R,'previousRound':PREV,'sourceTask':273,'cameraFits':fitlog,'geometryChanges':geometrylog,'seconds':time.time()-start,'targetImagesAndMasksUnchanged':True,'bindingHeightsUnchanged':[58.7,20,51],'estimatedMastTopM':cfg['mast_top'],'methodLimit':'Proxy optimization is only a proposal; acceptance uses actual Blender geometry masks on native grid, never this proxy metric.'}
(C/f'{R}-optimization.json').write_text(json.dumps(log,indent=2)+'\n')
print(json.dumps({'round':R,'seconds':log['seconds'],'proxyIoUAfter':{v:fitlog[v].get('afterGeometryFit',fitlog[v])['proxyIoUAfter'] for v in cams},'geometryChanges':geometrylog}),flush=True)
