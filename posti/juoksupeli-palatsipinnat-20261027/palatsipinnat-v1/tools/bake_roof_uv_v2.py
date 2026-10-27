from pathlib import Path
import json,hashlib,datetime,sys,resource
import numpy as np
from PIL import Image,ImageDraw,ImageFont
R=Path(__file__).resolve().parents[1];D=R/'roof-surfaces-v2';D.mkdir(exist_ok=True)
resource.setrlimit(resource.RLIMIT_CPU,(60,70))
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def smooth(a,b,x):t=np.clip((x-a)/(b-a),0,1);return t*t*(3-2*t)
def sample(t,u,v):
 x=np.clip(u,0,1)*(t.shape[1]-1);y=np.clip(v,0,1)*(t.shape[0]-1);ix=x.astype(int);iy=y.astype(int);jx=np.minimum(ix+1,t.shape[1]-1);jy=np.minimum(iy+1,t.shape[0]-1);fx=(x-ix)[...,None];fy=(y-iy)[...,None]
 return (t[iy,ix]*(1-fx)+t[iy,jx]*fx)*(1-fy)+(t[jy,ix]*(1-fx)+t[jy,jx]*fx)*fy
def field(X,Y,variant,tex):
 X=np.mod(X,1);Y=np.mod(Y,1);px=np.mod(X,.25);py=np.mod(Y,.25)
 theta=2*np.pi*(px/.25-.5);profile=.024*np.cos(theta)+.006*np.cos(2*theta)
 # Four actual transverse tile overlaps per metre, 4mm ramped lip.
 overlap=.004*(1-py/.25)*smooth(0,.006,py)
 height=profile+overlap+.00004*np.sin(2*np.pi*(X*23+Y*17+variant*.31))
 u=.10+px*3.2;v=.10+py*3.2
 color=sample(tex,u,v)
 blend=smooth(0,.006,np.minimum(px,.25-px))*smooth(0,.004,np.minimum(py,.25-py))
 glaze=np.mean(tex,axis=(0,1))
 color=color*blend[...,None]+glaze*(1-blend[...,None])
 color*= (.985+.015*np.cos(2*np.pi*(X*3+Y*2+variant*.11)))[...,None]
 cut=1-smooth(.001,.003,np.minimum(py,.25-py));color=color*(1-.05*cut[...,None])
 rough=.25+.025*np.cos(2*np.pi*(3*X+2*Y+variant*.13))+.12*cut
 return color,height,rough
font=ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc',18);ref=Image.open(R/'references/205842-02-havainne.png').convert('RGB');ref.thumbnail((650,510));entries=[]
for variant in range(1,5):
 source=R/'texture-native'/f'roof-base-v{variant:02d}.png';tex=np.asarray(Image.open(source).convert('RGB'),np.float32)/255
 p=(np.arange(512,dtype=np.float32)+.5)/512;X,Y=np.meshgrid(p,p);color,h,rough=field(X,Y,variant,tex);e=.00025;dx=(field(X+e,Y,variant,tex)[1]-field(X-e,Y,variant,tex)[1])/(2*e);dy=(field(X,Y+e,variant,tex)[1]-field(X,Y-e,variant,tex)[1])/(2*e)
 n=np.stack([-dx,dy,np.ones_like(dx)],axis=-1);n/=np.linalg.norm(n,axis=-1)[...,None]
 maps={'albedo':np.uint8(np.clip(color*255+.5,0,255)),'normal-opengl':np.uint8(np.clip((n*.5+.5)*255+.5,0,255)),'roughness':np.uint8(np.clip(rough*255+.5,0,255)),'height':np.uint16(np.clip((h+.025)/.065*65535+.5,0,65535))};rows=[];folder=D/'pinnat'/f'kattotiili-v{variant:02d}';folder.mkdir(parents=True,exist_ok=True)
 for k,a in maps.items():
  path=folder/f'kattotiili-v{variant:02d}-{k}.png';Image.fromarray(a).save(path);read=np.asarray(Image.open(path));assert np.array_equal(read,a);rows.append(dict(kind=k,path=str(path.relative_to(D)),sha256=sha(path),bytes=path.stat().st_size,sizePx=[512,512],colorSpace='sRGB' if k=='albedo' else 'linear'))
 q=[]
 for axis in [0,1]:
  v=np.linspace(.001,.999,501)[:,None];zero=np.zeros_like(v);one=np.ones_like(v);a=field(zero,v,variant,tex) if axis==0 else field(v,zero,variant,tex);b=field(one,v,variant,tex) if axis==0 else field(v,one,variant,tex);delta=[float(np.max(abs(s-t))) for s,t in zip(a,b)];assert max(delta)==0;q.append(dict(axis=axis,albedoHeightRoughnessMaxDelta=delta))
 n8=maps['normal-opengl'].astype(float)/127.5-1;assert np.max(abs(np.linalg.norm(n8,axis=-1)-1))<.008
 entries.append(dict(variant=variant,dimensionsM=[1,1],rows=4,overlapSpacingM=.25,repeatXY=[True,True],source=str(source.resolve()),sourceSHA256=sha(source),maps=rows,qaPeriodic=q,heightDecode={'offsetM':-.025,'rangeM':.065},rangeM=[float(h.min()),float(h.max())]))
 light=np.array([-.45,-.4,.8]);light/=np.linalg.norm(light);half=light+np.array([0,0,1]);half/=np.linalg.norm(half);diff=np.maximum(np.sum(n*light,axis=-1),0);spec=np.maximum(np.sum(n*half,axis=-1),0)**(2/np.maximum(rough,.1)**2)
 linear=color**2.2*(.4+.6*diff)[...,None]+.38*spec[...,None];lit=np.uint8(np.clip(linear,0,1)**(1/2.2)*255+.5)
 sheet=Image.new('RGB',(1260,630),'#f4f1eb');d=ImageDraw.Draw(sheet);d.text((18,15),f'Kattotiili {variant}/4 — tavoite / materiaalin valo- ja kohokuvioesikatselu',font=font,fill='#222');sheet.paste(ref,(10,55));sheet.paste(Image.fromarray(lit),(720,55));d.text((720,575),'1 × 1 m, neljä tiiliriviä; valo vain esikatselussa',font=font,fill='#222');path=D/'esikatselu'/f'katto-v{variant:02d}-vertailu.png';path.parent.mkdir(exist_ok=True);sheet.save(path)
(D/'MATERIALS.json').write_text(json.dumps(dict(createdAt=datetime.datetime.now(datetime.timezone.utc).isoformat(),materials=entries,imageCalls=4,tripoCalls=0,qa='PASS_READBACK_DIMENSIONS_PERIODIC_NORMALS',gameIntegrated=False,ownerAccepted=False),indent=2)+'\n');print(json.dumps(dict(package=str(D),materials=4,maps=16,qa='PASS')))
