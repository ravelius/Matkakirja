"""Periodic metric material bake from immutable generated plaster inputs.
Four periodic texture projections, no directional light/AO in basecolor. Chunked RAM use.
"""
from pathlib import Path
import json,hashlib,datetime,resource
import numpy as np
from PIL import Image,ImageDraw,ImageFont
R=Path(__file__).resolve().parents[1];D=R/'plaster-surfaces-v1';D.mkdir(exist_ok=True)
resource.setrlimit(resource.RLIMIT_CPU,(130,150))
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def sample(t,u,v):
 x=u*(t.shape[1]-1);y=v*(t.shape[0]-1);ix=x.astype(np.int32);iy=y.astype(np.int32);jx=np.minimum(ix+1,t.shape[1]-1);jy=np.minimum(iy+1,t.shape[0]-1);fx=(x-ix)[...,None];fy=(y-iy)[...,None]
 return (t[iy,ix]*(1-fx)+t[iy,jx]*fx)*(1-fy)+(t[jy,ix]*(1-fx)+t[jy,jx]*fx)*fy
def periodic_color(t,X,Y):
 u=np.mod(X/4,1);v=np.mod(1-Y/4,1);a=np.sin(np.pi*u)**2;b=np.sin(np.pi*v)**2;u2=np.mod(u+.5,1);v2=np.mod(v+.5,1)
 return (sample(t,u,v)*(a*b)[...,None]+sample(t,u2,v)*((1-a)*b)[...,None]+sample(t,u,v2)*(a*(1-b))[...,None]+sample(t,u2,v2)*((1-a)*(1-b))[...,None]).astype(np.float32)
def physical(X,Y,variant):
 h=.00015*np.sin(2*np.pi*(X*3.25+Y*2.5+variant*.13))+.00007*np.sin(2*np.pi*(X*13.25-Y*11.5))+.000025*np.sin(2*np.pi*(X*53.5+Y*43.25))
 dx=2*np.pi*(.00015*3.25*np.cos(2*np.pi*(X*3.25+Y*2.5+variant*.13))+.00007*13.25*np.cos(2*np.pi*(X*13.25-Y*11.5))+.000025*53.5*np.cos(2*np.pi*(X*53.5+Y*43.25)))
 dy=2*np.pi*(.00015*2.5*np.cos(2*np.pi*(X*3.25+Y*2.5+variant*.13))-.00007*11.5*np.cos(2*np.pi*(X*13.25-Y*11.5))+.000025*43.25*np.cos(2*np.pi*(X*53.5+Y*43.25)))
 n=np.stack([-dx,-dy,np.ones_like(dx)],axis=-1);n/=np.linalg.norm(n,axis=-1)[...,None];rough=.86+.025*np.sin(2*np.pi*(X*1.25+Y*.75+variant*.13));return h,n,rough
def render(tex,variant,strip=False):
 w,h=(2048,256) if strip else (2048,2048);H=.5 if strip else 4.;top=1.7 if strip else 4.
 rgb=np.empty((h,w,3),np.uint8);normal=np.empty_like(rgb);height=np.empty((h,w),np.uint16);rough=np.empty((h,w),np.uint8);mask=np.zeros((h,w),np.uint8)
 x=(np.arange(w,dtype=np.float32)+.5)*4/w
 for y0 in range(0,h,128):
  ys=top-(np.arange(y0,min(h,y0+128),dtype=np.float32)+.5)*H/h;X,Y=np.meshgrid(x,ys);col=periodic_color(tex,X,Y);hh,n,rr=physical(X,Y,variant)
  if strip:
   level=np.clip((1.7-Y)/.5,0,1);dirt=.32*level**2*(.80+.13*np.sin(2*np.pi*(X*.75+variant*.17))+.07*np.sin(2*np.pi*X*3.25))
   dirt=np.clip(dirt,0,.42);col=col*(1-dirt[...,None])+np.array([.18,.115,.075]) *dirt[...,None];rr=rr*(1-dirt)+.97*dirt;mask[y0:y0+len(ys)]=np.uint8(dirt*255+.5)
  rgb[y0:y0+len(ys)]=np.uint8(np.clip(col*255+.5,0,255));normal[y0:y0+len(ys)]=np.uint8(np.clip((n*.5+.5)*255+.5,0,255));height[y0:y0+len(ys)]=np.uint16(np.clip((hh+.001)/.002*65535+.5,0,65535));rough[y0:y0+len(ys)]=np.uint8(rr*255+.5)
 return {'albedo':rgb,'normal-opengl':normal,'roughness':rough,'height':height,**({'dirt-mask':mask} if strip else {})}
def export(prefix,maps):
 folder=D/'pinnat'/prefix;folder.mkdir(parents=True,exist_ok=True);rows=[]
 for kind,a in maps.items():
  p=folder/(prefix+'-'+kind+'.png');Image.fromarray(a).save(p);b=np.asarray(Image.open(p));assert np.array_equal(a,b);rows.append(dict(kind=kind,path=str(p.relative_to(D)),sha256=sha(p),bytes=p.stat().st_size,sizePx=[a.shape[1],a.shape[0]],colorSpace='sRGB' if kind=='albedo' else 'linear'))
 return rows
font=ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc',18);ref=Image.open(R/'references/205842-02-havainne.png').convert('RGB');ref.thumbnail((680,510));entries=[]
for i in range(1,5):
 src=R/'texture-native'/f'plaster-base-v{i:02d}.png';tex=np.asarray(Image.open(src).convert('RGB'),np.float32)/255;main=render(tex,i);strip=render(tex,i,True);rows=export(f'rappaus-v{i:02d}',main);srows=export(f'rappaus-alalika-v{i:02d}',strip)
 v=np.linspace(.01,3.99,91)[:,None];zero=np.zeros_like(v);four=np.full_like(v,4);deltas=[]
 for a,b in [(periodic_color(tex,zero,v),periodic_color(tex,four,v)),(periodic_color(tex,v,zero),periodic_color(tex,v,four))]:deltas.append(float(np.max(abs(a-b))))
 assert max(deltas)<1e-6
 n=main['normal-opengl'].astype(np.float32)/127.5-1;assert np.max(abs(np.linalg.norm(n,axis=-1)-1))<.008
 entry=dict(variant=i,source=str(src.resolve()),sourceSHA256=sha(src),sourceSize=[1254,1254],finalSize=[2048,2048],native2K=False,dimensionsM=[4,4],repeatXY=[True,True],maps=rows,heightDecode={'offsetM':-.001,'rangeM':.002},bottomStrip={'maps':srows,'dimensionsM':[4,.5],'bottomWorldY':1.2,'topWorldY':1.7,'repeatXY':[True,False]},qa={'periodicAlbedoMaxDeltas':deltas,'readback':True});entries.append(entry)
 sheet=Image.new('RGB',(1430,850),'#f4f1eb');d=ImageDraw.Draw(sheet);d.text((18,15),f'Rappaus {i}/4 — tavoite / valaisematon 4 × 4 m materiaali ja alareunan likajuova',font=font,fill='#222');sheet.paste(ref,(10,55));sheet.paste(Image.fromarray(main['albedo']).resize((640,640),Image.Resampling.LANCZOS),(760,55));d.text((760,705),'4 × 4 m; alkuperäinen pohja 1254 px, vienti 2048 px',font=font,fill='#222');sheet.paste(Image.fromarray(strip['albedo']).resize((680,85),Image.Resampling.LANCZOS),(10,630));d.text((10,725),'Alalika 4 × 0,5 m; yläreuna jatkuu seinäpintaan',font=font,fill='#222');d.text((18,790),'Tekninen vertailu. Ei pelin samasta kamerasta otettu hyväksyntäkuva.',font=font,fill='#222');p=D/'esikatselu'/f'rappaus-v{i:02d}-vertailu.png';p.parent.mkdir(exist_ok=True);sheet.save(p)
(D/'MATERIALS.json').write_text(json.dumps(dict(createdAt=datetime.datetime.now(datetime.timezone.utc).isoformat(),materials=entries,imageCalls=4,tripoCalls=0,qa='PASS_READBACK_PERIODIC_NORMALS',gameIntegrated=False,ownerAccepted=False),indent=2)+'\n');print(json.dumps(dict(package=str(D),variants=4,maps=36,status='PASS')))
