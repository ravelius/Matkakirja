"""Metric PBR material graph; immutable v5 native albedo source.

No painting or retouching of an old delivered image. The material graph defines
new joint layout in metres, samples the new source at isotropic scale, and bakes
albedo/height/normal/roughness. Light exists only in labelled technical previews.
"""
from pathlib import Path
import os, json, hashlib, datetime, shutil
os.environ.setdefault('OPENBLAS_NUM_THREADS','1')
import numpy as np
from PIL import Image, ImageDraw, ImageFont
D=Path(__file__).resolve().parents[1]
S=D.parent
T=np.asarray(Image.open(D/'sources/marble-native.png').convert('RGB'),dtype=np.float32)/255
FONT=ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc',21)
SMALL=ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc',17)
WALL=[([.75,1.25],.00),([.70,1.30],.35),
      ([.80,1.20],.10),([1.28,.72],.55),
      ([.77,1.23],.20),([1.15,.85],.65),
      ([.73,1.27],.30),([1.22,.78],.75)]
FLOOR=[([.60,1.40],0),([1.20,.80],.27),([.70,1.30],.95)]
FH=[.62,.68,.70]
FV=np.r_[0,np.cumsum(FH)]
SPECS={'sokkeli':([1024,614],[2,1.2],[True,False]),
 'sokkelin-ylapinta':([1024,51],[2,.1],[True,False]),
 'lattialaatat':([1024,1024],[2,2],[True,True])}
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def savej(p,j): p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(j,ensure_ascii=False,indent=2)+'\n')
def smooth(a,b,x):
 t=np.clip((x-a)/(b-a),0,1);return t*t*(3-2*t)
def native_sample(u,v):
 x=np.clip(u,0,1)*(T.shape[1]-1);y=np.clip(v,0,1)*(T.shape[0]-1)
 x0=x.astype(np.int32);y0=y.astype(np.int32);x1=np.minimum(x0+1,T.shape[1]-1);y1=np.minimum(y0+1,T.shape[0]-1)
 tx=(x-x0)[...,None];ty=(y-y0)[...,None]
 return (T[y0,x0]*(1-tx)+T[y0,x1]*tx)*(1-ty)+(T[y1,x0]*(1-tx)+T[y1,x1]*tx)*ty
def sample(u,v):
 # Periodic shader addressing, no reflection or per-stone scale changes.
 # In the 0.10 source-unit overlap, crossfade translated native samples.
 # Native source file is untouched; outside the overlap derivatives stay 1:1.
 period=.90;overlap=1-period
 x=np.mod(u,period);y=np.mod(v,period)
 wx=smooth(0,overlap,x)[...,None];wy=smooth(0,overlap,y)[...,None]
 xx=np.where(x<overlap,x+period,x);yy=np.where(y<overlap,y+period,y)
 return ((native_sample(xx,yy)*(1-wx)+native_sample(x,yy)*wx)*(1-wy)
         +(native_sample(xx,y)*(1-wx)+native_sample(x,y)*wx)*wy)
def course(x,lens,off):
 q=np.mod(x-off,2.);ends=np.cumsum(lens);i=np.minimum(np.searchsorted(ends,q,side='right'),len(lens)-1)
 lo=np.r_[0,ends[:-1]][i];width=np.asarray(lens)[i]
 return i,q-lo,width
def field(name,X,Y):
 floor=name=='lattialaatat';cap=name=='sokkelin-ylapinta'
 YY=np.mod(Y,2) if floor else np.clip(Y,0,1.2-1e-10)
 rows=np.minimum(np.searchsorted(FV[1:],YY,side='right'),len(FH)-1) if floor else np.minimum(np.floor(YY/.15).astype(int),7)
 if cap: rows=np.zeros_like(X,dtype=int)
 tx=X+(.6 if name=='pilarin-sivu' else 0)
 ids=np.zeros(X.shape,dtype=int);lx=np.zeros_like(X);ly=np.zeros_like(Y);cw=np.zeros_like(X);ch=np.zeros_like(Y)
 sets=FLOOR if floor else WALL
 for r,(lens,off) in enumerate(sets[:1] if cap else sets):
  i,local,width=course(tx,lens,off);m=rows==r
  ids[m]=i[m]+r*11+(1000 if floor else 0);lx[m]=local[m];cw[m]=width[m]
  ly[m]=(YY-FV[r] if floor else YY-.15*r)[m];ch[m]=FH[r] if floor else .15
 if cap:
  ly=Y.copy();ch[:]=.1
 radius=.014 if floor else .007
 qx=np.abs(lx-cw/2)-(cw/2-radius);qy=np.abs(ly-ch/2)-(ch/2-radius)
 dist=radius-np.sqrt(np.maximum(qx,0)**2+np.maximum(qy,0)**2)-np.minimum(np.maximum(qx,qy),0)
 if cap:dist=np.minimum(lx,cw-lx)
 return ids,lx,ly,dist
def evaluate(name,X,Y):
 ids,lx,ly,dist=field(name,X,Y)
 h=(ids.astype(np.uint64)*1103515245+12345)%2147483647
 phaseu=(h%127)*.0031;phasev=((h//127)%131)*.0031
 # Equal U/V metres-to-source scale prevents a stretched vein direction.
 color=sample(.03+lx*.83+phaseu,.03+ly*.83+phasev)
 tones=np.array([.955,.98,1.,1.02,1.035]);color*=tones[(h%5).astype(int)][...,None]
 joint=1-smooth(.0027,.0038,dist) # 5.4–7.6 mm full physical mortar width.
 bevel=.018 if name=='lattialaatat' else .010
 t=np.clip((dist-.0033)/bevel,0,1);rounding=.5-.5*np.cos(np.pi*t)
 micro=.000035*np.sin(2*np.pi*(lx*31+ly*17+ids*.23))+.000035*np.sin(2*np.pi*(lx*6.1+ly*8.7))
 height=-.0057+.0057*rounding+micro*rounding
 height=height*(1-joint)-.0057*joint
 mortar=np.array([.57,.557,.535]);color=color*(1-joint[...,None])+mortar*joint[...,None]
 rough=(.69+.018*np.sin(2*np.pi*(lx*7+ly*4)))*(1-joint)+.90*joint
 return np.clip(color,0,1),height,rough
def normals(name,X,Y):
 eps=.0002
 dx=(evaluate(name,X+eps,Y)[1]-evaluate(name,X-eps,Y)[1])/(2*eps)
 dy=(evaluate(name,X,Y+eps)[1]-evaluate(name,X,Y-eps)[1])/(2*eps)
 n=np.stack([-dx,dy,np.ones_like(dx)],axis=-1);n/=np.linalg.norm(n,axis=-1)[...,None]
 return n
def bake(name):
 (w,h),(W,H),rep=SPECS[name];X,Y=np.meshgrid((np.arange(w)+.5)*W/w,(np.arange(h)+.5)*H/h)
 c,z,r=evaluate(name,X,Y);n=normals(name,X,Y);pre=f'{name}-v03';folder=D/'pinnat'/pre;folder.mkdir(parents=True,exist_ok=True)
 arrays={'albedo':np.uint8(c*255+.5),'normal-opengl':np.uint8((n*.5+.5)*255+.5),'roughness':np.uint8(r*255+.5),'height':np.uint16(np.clip((z+.006)/.007*65535+.5,0,65535))}
 maps=[]
 for kind,a in arrays.items():
  p=folder/(pre+'-'+kind+'.png');Image.fromarray(a).save(p)
  maps.append({'kind':kind,'path':str(p.relative_to(D)),'sha256':sha(p),'bytes':p.stat().st_size,'sizePx':[w,h],'colorSpace':'sRGB' if kind=='albedo' else 'linear','bitDepth':16 if kind=='height' else 8})
 L=np.array([-.36,-.45,.817]);L/=np.linalg.norm(L);lit=np.clip(c*(.48+.55*np.maximum(np.sum(n*L,axis=-1),0))[...,None],0,1)
 return {'name':name,'variant':3,'dimensionsM':[W,H],'repeatXY':rep,'maps':maps,'heightDecode':{'offsetM':-.006,'rangeM':.007},'normalSpace':'tangent OpenGL +Y; PNG row down','seams':'SEAMS.json#'+name},Image.fromarray(np.uint8(lit*255+.5))
def seam_rows(name):
 floor=name=='lattialaatat';cap=name=='sokkelin-ylapinta';W,H=SPECS[name][1];start=.6 if name=='pilarin-sivu' else 0
 out=[]
 for i,(lens,off) in enumerate((FLOOR if floor else WALL)[:1] if cap else FLOOR if floor else WALL):
  joint=sorted(float(x) for x in np.mod(np.r_[0,np.cumsum(lens)[:-1]]+off,2))
  # Physical joints only. uClippedBounds also includes the texture edge, not a mortar joint.
  js=sorted((x-start)/W for x in joint if start-1e-9<=x<=start+W+1e-9)
  vb=[0,1] if cap else [float(FV[i]/H),float(FV[i+1]/H)] if floor else [i*.15/H,(i+1)*.15/H]
  out.append({'row':i,'vBoundsPngDown':vb,'vBoundsGltfUp':sorted([1-x for x in vb]),'uJointCenters':js,'uClippedBounds':sorted(set([0.,1.]+js)),'periodM':2,'periodicLengthsM':lens,'periodicOffsetM':off,'faceStartM':start})
 return out
def verify(entries,seams):
 checked=[];unchanged=[]
 for entry in entries:
  for m in entry['maps']:
   p=D/m['path'];im=Image.open(p);a=np.asarray(im)
   assert list(im.size)==m['sizePx'];assert sha(p)==m['sha256']
   if m['kind']=='normal-opengl':
    n=a.astype(float)/255*2-1
    assert abs(np.linalg.norm(n,axis=-1)-1).max()<.014
    assert n[...,2].min()>0
   if m['kind']=='height':assert a.dtype==np.uint16
   if entry.get('unchangedFromV5'):
    assert sha(p)==sha(S/'stone-surfaces-v5'/m['path'])
    unchanged.append(m['path'])
   checked.append(m['path'])
 periodic=[]
 for name,axis in [('sokkeli',0),('sokkelin-ylapinta',0),('lattialaatat',0),('lattialaatat',1)]:
  W,H=SPECS[name][1];v=np.linspace(.003,(H if axis==0 else W)-.003,523)[:,None];e=1e-8
  X1,Y1=(np.full_like(v,e),v) if axis==0 else (v,np.full_like(v,e))
  X2,Y2=(np.full_like(v,W-e),v) if axis==0 else (v,np.full_like(v,H-e))
  delta=[float(np.max(abs(a-b))) for a,b in zip(evaluate(name,X1,Y1),evaluate(name,X2,Y2))]
  nd=float(np.max(abs(normals(name,X1,Y1)-normals(name,X2,Y2))))
  assert delta[0]<.001 and delta[1]<.00001 and nd<.005,(name,axis,delta,nd)
  periodic.append({'material':name,'axis':axis,'albedoHeightRoughnessMaxDifference':delta,'normalMaxDifference':nd})
 raster=[]
 for name in SPECS:
  (w,h),(W,H),_=SPECS[name]
  z=np.asarray(Image.open(D/f'pinnat/{name}-v03/{name}-v03-height.png'),dtype=float)/65535*.007-.006
  for row in seams[name]:
   y=sum(row['vBoundsPngDown'])/2*H
   for u in row['uJointCenters']:
    actual=evaluate(name,np.array([[u*W]]),np.array([[y]]))[1][0,0]
    assert abs(actual+.0057)<1e-8
    px=min(w-1,int(u*w));py=min(h-1,int(y/H*h))
    assert abs(z[py,px]+.0057)<.00003,(name,row['row'],u,z[py,px])
    raster.append({'material':name,'row':row['row'],'u':u,'heightM':float(z[py,px])})
 assert seams['sokkeli'][0]['uJointCenters']==seams['sokkelin-ylapinta'][0]['uJointCenters']
 oldseams=json.loads((S/'stone-surfaces-v5/SEAMS.json').read_text())['materials']
 for name in ['pilarin-etu','pilarin-sivu']:assert seams[name]==oldseams[name]
 assert len(unchanged)==12 and len(checked)==24
 assert abs(sum(FH)-2)<1e-9 and len(FH)==3
 assert all(abs(sum(ls)-2)<1e-9 for ls,_ in FLOOR+WALL)
 fw=[x for ls,_ in FLOOR for x in ls];ww=[x for ls,_ in WALL for x in ls]
 assert min(fw)>=.6 and max(fw)<=1.4 and max(fw)/min(fw)>=2
 assert min(ww)>=.7 and max(ww)<=1.4
 stagger={}
 for name in ['lattialaatat','sokkeli']:
  rows=seams[name];distances=[]
  for i in range(len(rows) if name=='lattialaatat' else len(rows)-1):
   a=rows[i]['uJointCenters'];b=rows[(i+1)%len(rows)]['uJointCenters']
   distances.append(min(min(abs(x-y),1-abs(x-y))*2 for x in a for y in b))
  assert min(distances)>=.14,distances
  stagger[name]={'minAdjacentJointOffsetM':min(distances),'pairsM':distances}
 return {'status':'PASS','maps':24,'newMaps':12,'unchangedMaps':12,'allPillarAndCurbMapsByteExactV5':True,
  'unchangedPillarSeamMetadata':True,'floorRows':3,'floorWidthsM':[min(fw),max(fw)],'floorDepthsM':FH,
  'wallCourses':8,'wallRowHeightM':.15,'wallWidthsM':[min(ww),max(ww)],'jointWidthM':[.0054,.0076],
  'stagger':stagger,'wallTopJointAlignment':True,'seamJsonMatchesActualMortar':True,
  'rasterMortarReadback':raster,'periodicLimits':periodic,'files':checked,'unchangedFiles':unchanged}

def main():
 entries=[];views={}
 for name in SPECS:
  e,v=bake(name);entries.append(e);views[name]=v;print('baked '+name,flush=True)
 old=json.loads((S/'stone-surfaces-v5/MATERIALS.json').read_text())
 for name in ['pilarin-etu','pilarin-sivu','reunakivi']:
  e=next(x for x in old['materials'] if x['name']==name)
  for m in e['maps']:
   dest=D/m['path'];dest.parent.mkdir(parents=True,exist_ok=True)
   shutil.copyfile(S/'stone-surfaces-v5'/m['path'],dest)
  e['unchangedFromV5']=True;entries.append(e)
 oldseams=json.loads((S/'stone-surfaces-v5/SEAMS.json').read_text())
 seams={n:seam_rows(n) for n in SPECS}
 for name in ['pilarin-etu','pilarin-sivu']:seams[name]=oldseams['materials'][name]
 qa=verify(entries,seams);savej(D/'qa/readback.json',qa)
 oldseams['materials']=seams
 oldseams['lattialaatatLongAxis']='U = across alley; V = along alley; three rows / 2m. Use equal metric UV scale; never stretch either axis.'
 savej(D/'SEAMS.json',oldseams)
 report={'generatedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),
  'sourceCommit':'cac6ea6abb75b8905fd87d95b73bbf03ccecfc50',
  'pipeline':'v5 immutable ImageGen stone source + revised metric joint layout; unchanged 0.83 source units/metre in both axes; no light or AO in albedo',
  'sourceAddressing':{'mode':'translated periodic wrap with smooth edge crossfade, no reflection','sourceUnitsPerMetreUV':[.83,.83],'periodSourceUnits':.9,'overlapSourceUnits':.1},'nativeSourcePx':[T.shape[1],T.shape[0]],'nativeSourceSha256':sha(D/'sources/marble-native.png'),
  'nativeSourceByteExactV5':sha(D/'sources/marble-native.png')==sha(S/'stone-surfaces-v5/sources/marble-native.png'),
  'newImageCalls':0,'tripoCalls':0,'materials':entries,'receiverAccepted':False,'gameIntegrated':False,'ownerAccepted':False}
 savej(D/'MATERIALS.json',report)
 sheet=Image.new('RGB',(1800,1510),'#f2f0eb');dr=ImageDraw.Draw(sheet)
 dr.text((20,14),'Kivipinnat v6 — eripituiset laatat ja matalat pitkät sokkelikivet',font=FONT,fill='#222')
 for n,x in [('02-peli-v135-havainne.jpg',20),('05-peli-v135-havainne.jpg',920)]:
  im=Image.open(D/'references'/n).convert('RGB');im.thumbnail((860,323));sheet.paste(im,(x,60))
 dr.text((20,409),'Yllä lähdeparit: vasen peli v135, oikea tavoite. Alla v6:n TEKNINEN esikatselu, ei pelikuva.',font=FONT,fill='#222')
 for name,xy,sz in [('lattialaatat',(20,460),(800,800)),('sokkeli',(860,460),(900,540)),('sokkelin-ylapinta',(860,1060),(900,45))]:
  im=views[name].copy();im.thumbnail(sz);sheet.paste(im,xy)
  dr.text((xy[0],xy[1]+im.height+6),name+'-v03',font=SMALL,fill='#222')
 labels=['Lattia: 3 riviä / 2 m; 0,62 / 0,68 / 0,70 m syvät',
 'Laatan pituus: 0,60–1,40 m; keskimäärin 1,00 m',
 'Sokkeli: 8 riviä / 1,20 m; kivet 0,70–1,30 m',
 'Porrastus: lattia vähintään 18 cm, sokkeli 15 cm',
 'Pilarin etu/sivu sekä reunakivi: v5:n tavut ennallaan',
 '12 uutta + 12 ennallaan = 24 karttaa',
 'Juonteen mittakaava 0,83 lähdeyksikköä/metri U:ssa ja V:ssä',
 'Esikatselun valo ei ole albedossa. Lavastajan pelivertailu odottaa.']
 for i,label in enumerate(labels):dr.text((20 if i<4 else 900,1320+(i%4)*39),label,font=SMALL,fill='#222')
 sheet.save(D/'esikatselu/kivipinnat-v6-vertailu.png')
 for name in ['lattialaatat','sokkeli']:
  tile=Image.open(D/f'pinnat/{name}-v03/{name}-v03-albedo.png')
  nx,ny=(2,2) if name=='lattialaatat' else (2,1)
  repeat=Image.new('RGB',(tile.width*nx,tile.height*ny))
  for x in range(nx):
   for y in range(ny):repeat.paste(tile,(x*tile.width,y*tile.height))
  repeat.save(D/f'esikatselu/{name}-toisto-albedo.png')
 print(json.dumps({'status':'PASS','maps':qa['maps'],'root':str(D)}),flush=True)
if __name__=='__main__':main()
