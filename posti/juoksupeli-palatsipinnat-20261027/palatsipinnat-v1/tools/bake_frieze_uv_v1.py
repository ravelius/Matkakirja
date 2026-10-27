from pathlib import Path
import json,hashlib,datetime,resource
import numpy as np
from PIL import Image,ImageDraw,ImageFont,ImageFilter
R=Path(__file__).resolve().parents[1];D=R/'frieze-surfaces-v1';D.mkdir(exist_ok=True)
resource.setrlimit(resource.RLIMIT_CPU,(60,70))
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def smooth(a,b,x):t=np.clip((x-a)/(b-a),0,1);return t*t*(3-2*t)
def normals(height,W,H):
 dy=np.gradient(height,H/height.shape[0],axis=0);dx=(np.roll(height,-1,axis=1)-np.roll(height,1,axis=1))/(2*W/height.shape[1]);n=np.stack([-dx,dy,np.ones_like(dx)],axis=-1);n/=np.linalg.norm(n,axis=-1)[...,None];return np.uint8(np.clip((n*.5+.5)*255+.5,0,255))
def export(prefix,maps):
 folder=D/'pinnat'/prefix;folder.mkdir(parents=True,exist_ok=True);rows=[]
 for kind,a in maps.items():
  p=folder/(prefix+'-'+kind+'.png');Image.fromarray(a).save(p);b=np.asarray(Image.open(p));assert np.array_equal(a,b);rows.append(dict(path=str(p.relative_to(D)),sha256=sha(p),bytes=p.stat().st_size,kind=kind,sizePx=[a.shape[1],a.shape[0]],colorSpace='sRGB' if kind=='albedo' else 'linear'))
 return rows
font=ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc',18);ref=Image.open(R/'references/205842-05-havainne.png').convert('RGB');ref.thumbnail((700,525));entries=[]
for i in range(1,5):
 src=R/'texture-native'/(f'frieze-v2-base-v{i:02d}.png' if i<4 else 'frieze-base-v04.png');original=Image.open(src).convert('RGB');im=original.resize((2048,512),Image.Resampling.LANCZOS);rgb=np.asarray(im);c=rgb.astype(np.float32)/255
 edge=abs(rgb[:,0].astype(float)-rgb[:,-1].astype(float));mae=float(edge.mean());p95=float(np.quantile(edge,.95));fraction=float(np.mean(edge>32));assert mae<5 and p95<12 and fraction<.01,(i,mae,p95,fraction)
 gold=smooth(.08,.26,c[...,0]-c[...,2])*smooth(.055,.17,c[...,0]-c[...,1]);gold=np.asarray(Image.fromarray(np.uint8(gold*255)).filter(ImageFilter.GaussianBlur(.65)),np.float32)/255
 h=.00035*gold;rough=.66-.28*gold;metallic=.7*gold
 maps={'albedo':rgb,'normal-opengl':normals(h,4.13,1.03),'roughness':np.uint8(rough*255+.5),'metallic':np.uint8(metallic*255+.5),'height':np.uint16(np.clip(h/.001*65535+.5,0,65535))}
 rows=export(f'friisi-v{i:02d}',maps)
 gcolor=np.median(c[gold>.8],axis=0);x=(np.arange(512)+.5)/512;y=(np.arange(32)+.5)/32;X,Y=np.meshgrid(x,y);grain=.985+.015*np.sin(2*np.pi*(19*X+3*Y+i*.23));trim=np.uint8(np.clip(gcolor[None,None,:]*grain[...,None]*255+.5,0,255));th=.00012*np.sin(np.pi*Y)**2
 tmaps={'albedo':trim,'normal-opengl':normals(th,1,.06),'roughness':np.uint8(np.full((32,512),.36)*255+.5),'metallic':np.uint8(np.full((32,512),.7)*255+.5)};trows=export(f'kultalista-v{i:02d}',tmaps)
 entries.append(dict(variant=i,source=str(src.resolve()),sourceSHA256=sha(src),sourceSize=list(original.size),finalSize=[2048,512],uvNormalization='entire original image resampled to LR rectangle; no crop or paint retouch',dimensionsM=[4.13,1.03],repeatXY=[True,False],maps=rows,heightRangeM=[0,.001],goldTrim={'dimensionsM':[1,.06],'maps':trows},seamQA={'meanAbsRGBDelta255':mae,'p95':p95,'fractionOver32':fraction,'gate':'visual tolerance, not byte-identical edges','status':'PASS_REVIEW'}))
 sheet=Image.new('RGB',(1440,660),'#f4f1eb');d=ImageDraw.Draw(sheet);d.text((18,15),f'Friisi {i}/4 — tavoite / valmis 4,13 × 1,03 m albedo ja normal-kartta',font=font,fill='#222');sheet.paste(ref,(10,55));sheet.paste(im.resize((700,175),Image.Resampling.LANCZOS),(730,60));d.text((730,245),'Pohjaväri, valaisematon',font=font,fill='#222');sheet.paste(Image.fromarray(maps['normal-opengl']).resize((700,175)),(730,280));d.text((730,465),'Normal: kultakorostus 0,35 mm',font=font,fill='#222');sheet.paste(Image.fromarray(trim).resize((700,44)),(730,505));d.text((730,558),'Erillinen kultalista 1 × 0,06 m',font=font,fill='#222');d.text((18,610),'Tekninen materiaalivertailu. Pelin kameravertailu ja hyväksyntä vielä avoinna.',font=font,fill='#222');out=D/'esikatselu'/f'friisi-v{i:02d}-vertailu.png';out.parent.mkdir(exist_ok=True);sheet.save(out)
 seam=np.concatenate([rgb[:,-90:],rgb[:,:90]],axis=1);Image.fromarray(seam).save(D/'esikatselu'/f'friisi-v{i:02d}-toistosauma.png')
(D/'MATERIALS.json').write_text(json.dumps(dict(createdAt=datetime.datetime.now(datetime.timezone.utc).isoformat(),imageCalls=7,originalFailedCalls=3,selectedSources=4,materials=entries,tripoCalls=0,gameIntegrated=False,ownerAccepted=False),indent=2)+'\n');print(json.dumps(dict(package=str(D),variants=4,maps=36,status='PASS_REVIEW',seams=[e['seamQA'] for e in entries])))
