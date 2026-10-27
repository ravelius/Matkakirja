"""Bake a metric, code-native material graph to LR's specified UV rectangles.

Generated albedo sources are immutable texture inputs. This is a UV/material bake,
not paint retouching: stone geometry, joints, micro-height and normals are analytic.
No light, AO or shadow is multiplied into base color. One bounded CPU worker.
"""
from pathlib import Path
import os,sys,json,hashlib,datetime,resource
import numpy as np
from PIL import Image,ImageDraw,ImageFont
R=Path(__file__).resolve().parents[1];D=R/'stone-surfaces-v3'
resource.setrlimit(resource.RLIMIT_CPU,(170,180))
SOURCES=[np.asarray(Image.open(R/'texture-native'/f'stone-base-v{i:02d}.png').convert('RGB'),dtype=np.float32)/255 for i in range(1,5)]
FONT=ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc',18)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def smooth(a,b,x):
 t=np.clip((x-a)/(b-a),0,1);return t*t*(3-2*t)
def mirror(t):
 t=np.mod(t,2);return np.where(t<=1,t,2-t)
def sample(tex,u,v):
 x=mirror(u)*(tex.shape[1]-1);y=mirror(v)*(tex.shape[0]-1)
 x0=x.astype(np.int32);y0=y.astype(np.int32);x1=np.minimum(x0+1,tex.shape[1]-1);y1=np.minimum(y0+1,tex.shape[0]-1)
 tx=(x-x0)[...,None];ty=(y-y0)[...,None]
 return (tex[y0,x0]*(1-tx)+tex[y0,x1]*tx)*(1-ty)+(tex[y1,x0]*(1-tx)+tex[y1,x1]*tx)*ty
def periodic_course(t,lengths,offset,period):
 q=np.mod(t-offset,period);ends=np.cumsum(lengths);idx=np.searchsorted(ends,q,side='right');idx=np.minimum(idx,len(lengths)-1)
 start=np.r_[0,ends[:-1]][idx];width=np.array(lengths)[idx];local=q-start
 return idx,local,np.minimum(local,width-local)
def wall_lengths(variant,row):
 variants=[[.65,.75,.60],[.80,.55,.65],[.70,.60,.70],[.55,.75,.70]]
 lengths=np.roll(variants[variant-1],row%3).tolist();offset=([.12,.43,.16,.48][row]+(variant-1)*.07)%2
 return lengths,offset
def field(name,variant,X,Y):
 row=np.minimum((Y/.3).astype(int),3);rowlocal=np.mod(Y,.3)
 ids=np.zeros(X.shape,dtype=int);lx=X.copy();ly=Y.copy();edge=np.full(X.shape,10.0);dist=np.full(X.shape,10.0)
 if name in ['sokkeli','sokkelin-ylapinta']:
  if name=='sokkelin-ylapinta':row=np.zeros(X.shape,dtype=int);rowlocal=Y
  for r in range(4 if name=='sokkeli' else 1):
   lengths,offset=wall_lengths(variant,r);i,l,d=periodic_course(X,lengths,offset,2.0);m=row==r;ids[m]=i[m]+r*7;lx[m]=l[m];ly[m]=rowlocal[m];dist[m]=d[m]
  if name=='sokkeli':dist=np.minimum(dist,np.minimum(rowlocal,.3-rowlocal))
  edge=dist
 elif name=='lattialaatat':
  col=np.minimum((X/.5).astype(int),3);colx=np.mod(X,.5)
  sets=[[.7,.65,.65],[.8,1.2],[.6,.8,.6],[1.1,.9]]
  for c in range(4):
   lens=sets[(c+variant-1)%4];off=(.17+c*.29+variant*.11)%2;i,l,d=periodic_course(Y,lens,off,2);m=col==c;ids[m]=i[m]+7*c;lx[m]=colx[m];ly[m]=l[m];dist[m]=d[m]
  dist=np.minimum(dist,np.minimum(colx,.5-colx));edge=dist
 elif name.startswith('pilarin-'):
  # Shared corner: front RIGHT (.60m), side LEFT (0m); no painted joint at corner.
  side=name=='pilarin-sivu';t=X+.6 if side else X
  for r in range(4):
   # Corner stone spans .40/.20 or .20/.40 across the two faces.
   left=.2 if r%2==0 else .4;right=.8 if r%2==0 else 1.0;m=row==r
   i=np.where(t<left,0,np.where(t<right,1,2));lo=np.where(i==0,0,np.where(i==1,left,right));hi=np.where(i==0,left,np.where(i==1,right,1.4))
   ids[m]=i[m]+r*7;lx[m]=(t-lo)[m];ly[m]=rowlocal[m];dist[m]=np.minimum(np.abs(t-left),np.abs(t-right))[m]
  dist=np.minimum(dist,np.minimum(rowlocal,.3-rowlocal));edge=dist
 else:
  # One curb stone unwrap: .30m top + .02 bevel + .20 front. No false end seam.
  ids[:]=variant;lx=X;ly=Y;dist[:]=10
  edge=np.minimum.reduce([X,.70-X,np.abs(Y-.30),np.abs(Y-.32)])
 return ids,lx,ly,dist,edge
def evaluate(name,variant,X,Y):
 ids,lx,ly,dist,edge=field(name,variant,X,Y)
 # Distinct per-stone UV phase, while shared corner stones remain continuous.
 u=.04+lx*.54+np.mod(ids*.137+variant*.051,.22);v=.04+ly*.54+np.mod(ids*.113+variant*.037,.22)
 color=sample(SOURCES[variant-1],u,v)
 tone=np.array([.90,.96,1.00,1.035,.925],dtype=np.float32)[np.mod(ids+variant,5)]
 color=color*tone[...,None]
 wear=.00045*np.sin(2*np.pi*(lx*6.3+ly*7.1+ids*.31))+.00020*np.sin(2*np.pi*(lx*13.7-ly*9.3))
 joint=1-smooth(.004+wear,.006+wear,dist);bevel=smooth(.005,.014+wear,edge)
 mortar=np.array([.49,.477,.456],dtype=np.float32)
 color=color*(1-joint[...,None])+mortar*joint[...,None]
 # Bounded geometric microrelief, never inferred directly from mineral colors.
 micro=.000055*np.sin(2*np.pi*(lx*43+ly*17+ids*.17))+.000022*np.sin(2*np.pi*(lx*91-ly*37+variant*.31))+.00008*np.sin(2*np.pi*(lx*9.7+ly*12.3+ids*.47))
 height=(micro*bevel-.002*(1-bevel))*(1-joint)-.005*joint
 rough=(.79+.035*np.sin(2*np.pi*(lx*7+ly*4+variant)))*(1-joint)+.94*joint
 return np.clip(color,0,1),height,np.clip(rough,0,1)
SPECS={
 'reunakivi':([360,266],[.7,.52],[False,False]),
 'sokkeli':([1024,614],[2,1.2],[True,False]),
 'sokkelin-ylapinta':([1024,51],[2,.1],[True,False]),
 'pilarin-etu':([307,614],[.6,1.2],[False,False]),
 'pilarin-sivu':([205,614],[.4,1.2],[False,False]),
 'lattialaatat':([1024,1024],[2,2],[True,True]),
}
def savepng(p,a):
 p.parent.mkdir(parents=True,exist_ok=True);Image.fromarray(a).save(p)
def bake(name,variant):
 (w,h),(W,H),repeat=SPECS[name];x=(np.arange(w,dtype=np.float32)+.5)*W/w;y=(np.arange(h,dtype=np.float32)+.5)*H/h;X,Y=np.meshgrid(x,y)
 color,height,rough=evaluate(name,variant,X,Y)
 # Analytic centered differences evaluated in the declared metric UV domain.
 eps=.00025
 def hei(x,y):
  if repeat[0]:x=np.mod(x,W)
  if repeat[1]:y=np.mod(y,H)
  return evaluate(name,variant,x,y)[1]
 dx=(hei(X+eps,Y)-hei(X-eps,Y))/(2*eps);dy=(hei(X,Y+eps)-hei(X,Y-eps))/(2*eps)
 # +Y tangent normal maps for conventional UV v-up; PNG row direction is down.
 n=np.stack([-dx,dy,np.ones_like(dx)],axis=-1);n/=np.linalg.norm(n,axis=-1)[...,None]
 prefix=f'{name}-v{variant:02d}';folder=D/'pinnat'/prefix
 maps={'albedo':np.uint8(np.clip(color*255+.5,0,255)),'normal-opengl':np.uint8(np.clip((n*.5+.5)*255+.5,0,255)),'roughness':np.uint8(np.clip(rough*255+.5,0,255)),'height':np.uint16(np.clip((height+.006)/.007*65535+.5,0,65535))}
 rows=[]
 for typ,a in maps.items():
  path=folder/(prefix+'-'+typ+'.png');savepng(path,a);rows.append(dict(path=str(path.relative_to(D)),sha256=sha(path),bytes=path.stat().st_size,kind=typ,sizePx=[w,h],colorSpace='sRGB' if typ=='albedo' else 'linear',bitDepth=16 if typ=='height' else 8))
 # CPU preview of new material graph. Lighting is ONLY in the preview, never albedo.
 L=np.array([-.36,-.45,.817],dtype=np.float32);L/=np.linalg.norm(L);lit=np.clip(color*(.48+.55*np.maximum(np.sum(n*L,axis=-1),0))[...,None],0,1)
 preview=Image.fromarray(np.uint8(lit*255+.5))
 return dict(name=name,variant=variant,dimensionsM=[W,H],repeatXY=repeat,maps=rows,heightDecode={'offsetM':-.006,'rangeM':.007},normalSpace='tangent OpenGL +Y; PNG row down'),preview
def qa_crossface(variant):
 # Sample exact corner boundary at shared world coordinate, not neighbor pixel centers.
 Y=np.linspace(.01,1.19,590,dtype=np.float32)[:,None]
 a=evaluate('pilarin-etu',variant,np.full_like(Y,.6),Y);b=evaluate('pilarin-sivu',variant,np.zeros_like(Y),Y)
 corner_delta=[float(np.max(np.abs(x-y))) for x,y in zip(a,b)]
 assert max(corner_delta)<1e-6,corner_delta
 # Wall top and upper-cap vertical joints share EXACT x coordinates by construction.
 lengths,offset=wall_lengths(variant,0);joints=np.mod(np.r_[0,np.cumsum(lengths)[:-1]]+offset,2).tolist()
 periodic=[]
 for name,axis in [('sokkeli',0),('sokkelin-ylapinta',0),('lattialaatat',0),('lattialaatat',1)]:
  (w,h),(W,H),rep=SPECS[name];v=np.linspace(.003,(H if axis==0 else W)-.003,501,dtype=np.float32)[:,None]
  if axis==0:a=evaluate(name,variant,np.zeros_like(v),v);b=evaluate(name,variant,np.full_like(v,W),v)
  else:a=evaluate(name,variant,v,np.zeros_like(v));b=evaluate(name,variant,v,np.full_like(v,H))
  # Compare limits just inside each side to avoid identifying different stone sides exactly ON a joint.
  e=1e-7
  if axis==0:a=evaluate(name,variant,np.full_like(v,e),v);b=evaluate(name,variant,np.full_like(v,W-e),v)
  else:a=evaluate(name,variant,v,np.full_like(v,e));b=evaluate(name,variant,v,np.full_like(v,H-e))
  delta=[float(np.max(np.abs(x-y))) for x,y in zip(a,b)];assert delta[0]<.001 and delta[1]<.00001,(name,delta)
  periodic.append(dict(name=name,axis=axis,albedoMaximumDelta=delta[0],heightMaximumDeltaM=delta[1]))
 return dict(variant=variant,pillarCornerAlbedoHeightRoughnessMaxDelta=corner_delta,wallTopJointCentersM=joints,periodicLimits=periodic)
def main():
 D.mkdir(exist_ok=True);entries=[];qas=[];ref=Image.open(R/'references/205842-02-havainne.png').convert('RGB');ref.thumbnail((680,520))
 for variant in range(1,5):
  previews={}
  for name in SPECS:
   entry,im=bake(name,variant);entries.append(entry);previews[name]=im
  qa=qa_crossface(variant);qas.append(qa)
  sheet=Image.new('RGB',(1400,1050),'#f2f0eb');d=ImageDraw.Draw(sheet);d.text((20,15),f'Kivipinnat {variant}/4 — havainne vasemmalla, materiaalin tekninen esikatselu oikealla',font=FONT,fill='#222');sheet.paste(ref,(10,55));d.text((20,590),'Tavoitteen valo on vain vertailukuvassa. Albedoissa ei ole esikatselun valoa.',font=FONT,fill='#222')
  layouts=[('sokkeli',(720,60),(650,390)),('lattialaatat',(20,650),(370,370)),('reunakivi',(430,680),(320,236)),('pilarin-etu',(790,650),(170,340)),('pilarin-sivu',(985,650),(113,340)),('sokkelin-ylapinta',(720,495),(650,32))]
  for name,(x,y),size in layouts:
   im=previews[name].copy();im.thumbnail(size);sheet.paste(im,(x,y));d.text((x,y+im.height+8),name,font=FONT,fill='#222')
  path=D/'esikatselu'/f'kivipinnat-v{variant:02d}-vertailu.png';path.parent.mkdir(exist_ok=True);sheet.save(path)
 report=dict(generatedAt=datetime.datetime.now(datetime.timezone.utc).isoformat(),pipeline='metric code-native material graph bake; generated albedo inputs preserved byte-exact',newImageCalls=4,tripoCalls=0,variants=4,materials=entries,qa=qas,receiverAccepted=False,gameIntegrated=False,ownerAccepted=False)
 (D/'MATERIALS.json').write_text(json.dumps(report,indent=2,ensure_ascii=False)+'\n');print(json.dumps(dict(materials=len(entries),maps=sum(len(e['maps']) for e in entries),qa='PASS',package=str(D))),flush=True)
if __name__=='__main__':main()
