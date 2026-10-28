"""Metric PBR material graph; immutable newly generated albedo source.

No painting or retouching of an old delivered image. The material graph defines
new geometry in metres, samples the new source at isotropic scale, and bakes
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
WALL=[([.46,.54,.47,.53],.00),([.55,.48,.52,.45],.24),
      ([.49,.46,.55,.50],.10),([.52,.55,.45,.48],.36),
      ([.47,.53,.54,.46],.18),([.54,.45,.50,.51],.40),
      ([.50,.55,.46,.49],.07),([.45,.51,.54,.50],.29)]
FLOOR=[([.65,.70,.65],0),([.70,.65,.65],.22),([.67,.68,.65],.46),
       ([.65,.69,.66],.12),([.69,.66,.65],.38),([.66,.65,.69],.54)]
FH=[.33,.34,.33,.34,.33,.33]
FV=np.r_[0,np.cumsum(FH)]
SPECS={'sokkeli':([1024,614],[2,1.2],[True,False]),
 'sokkelin-ylapinta':([1024,51],[2,.1],[True,False]),
 'pilarin-etu':([307,614],[.6,1.2],[False,False]),
 'pilarin-sivu':([205,614],[.4,1.2],[False,False]),
 'lattialaatat':([1024,1024],[2,2],[True,True])}
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def savej(p,j): p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(j,ensure_ascii=False,indent=2)+'\n')
def smooth(a,b,x):
 t=np.clip((x-a)/(b-a),0,1);return t*t*(3-2*t)
def sample(u,v):
 def mirror(t):
  t=np.mod(t,2);return np.where(t<=1,t,2-t)
 x=mirror(u)*(T.shape[1]-1);y=mirror(v)*(T.shape[0]-1)
 x0=x.astype(np.int32);y0=y.astype(np.int32);x1=np.minimum(x0+1,T.shape[1]-1);y1=np.minimum(y0+1,T.shape[0]-1)
 tx=(x-x0)[...,None];ty=(y-y0)[...,None]
 return (T[y0,x0]*(1-tx)+T[y0,x1]*tx)*(1-ty)+(T[y1,x0]*(1-tx)+T[y1,x1]*tx)*ty
def course(x,lens,off):
 q=np.mod(x-off,2.);ends=np.cumsum(lens);i=np.minimum(np.searchsorted(ends,q,side='right'),len(lens)-1)
 lo=np.r_[0,ends[:-1]][i];width=np.asarray(lens)[i]
 return i,q-lo,width
def field(name,X,Y):
 floor=name=='lattialaatat';cap=name=='sokkelin-ylapinta'
 YY=np.mod(Y,2) if floor else np.clip(Y,0,1.2-1e-10)
 rows=np.minimum(np.searchsorted(FV[1:],YY,side='right'),5) if floor else np.minimum(np.floor(YY/.15).astype(int),7)
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
 c,z,r=evaluate(name,X,Y);n=normals(name,X,Y);pre=f'{name}-v02';folder=D/'pinnat'/pre;folder.mkdir(parents=True,exist_ok=True)
 arrays={'albedo':np.uint8(c*255+.5),'normal-opengl':np.uint8((n*.5+.5)*255+.5),'roughness':np.uint8(r*255+.5),'height':np.uint16(np.clip((z+.006)/.007*65535+.5,0,65535))}
 maps=[]
 for kind,a in arrays.items():
  p=folder/(pre+'-'+kind+'.png');Image.fromarray(a).save(p)
  maps.append({'kind':kind,'path':str(p.relative_to(D)),'sha256':sha(p),'bytes':p.stat().st_size,'sizePx':[w,h],'colorSpace':'sRGB' if kind=='albedo' else 'linear','bitDepth':16 if kind=='height' else 8})
 L=np.array([-.36,-.45,.817]);L/=np.linalg.norm(L);lit=np.clip(c*(.48+.55*np.maximum(np.sum(n*L,axis=-1),0))[...,None],0,1)
 return {'name':name,'variant':2,'dimensionsM':[W,H],'repeatXY':rep,'maps':maps,'heightDecode':{'offsetM':-.006,'rangeM':.007},'normalSpace':'tangent OpenGL +Y; PNG row down','seams':'SEAMS.json#'+name},Image.fromarray(np.uint8(lit*255+.5))
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
def verify(entries):
 checked=[]
 for entry in entries:
  for m in entry['maps']:
   p=D/m['path'];im=Image.open(p);a=np.asarray(im);assert list(im.size)==m['sizePx'];assert sha(p)==m['sha256']
   if m['kind']=='normal-opengl':
    n=a.astype(float)/255*2-1;assert abs(np.linalg.norm(n,axis=-1)-1).max()<.014;assert n[...,2].min()>0
   if m['kind']=='height':assert a.dtype==np.uint16
   checked.append(m['path'])
 # Limits and first derivatives at texture repeats, not just identical file dimensions.
 periodic=[]
 for name,axis in [('sokkeli',0),('sokkelin-ylapinta',0),('lattialaatat',0),('lattialaatat',1)]:
  W,H=SPECS[name][1];v=np.linspace(.003,(H if axis==0 else W)-.003,523)[:,None];e=1e-8
  X1,Y1=(np.full_like(v,e),v) if axis==0 else (v,np.full_like(v,e))
  X2,Y2=(np.full_like(v,W-e),v) if axis==0 else (v,np.full_like(v,H-e))
  delta=[float(np.max(abs(a-b))) for a,b in zip(evaluate(name,X1,Y1),evaluate(name,X2,Y2))]
  nd=float(np.max(abs(normals(name,X1,Y1)-normals(name,X2,Y2))))
  assert delta[0]<.001 and delta[1]<.00001 and nd<.005,(name,axis,delta,nd)
  periodic.append({'material':name,'axis':axis,'albedoHeightRoughnessMaxDifference':delta,'normalMaxDifference':nd})
 Y=np.linspace(.001,1.199,1201)[:,None];a=evaluate('pilarin-etu',np.full_like(Y,.6),Y);b=evaluate('pilarin-sivu',np.zeros_like(Y),Y)
 corner=[float(np.max(abs(x-y))) for x,y in zip(a,b)];assert max(corner)<1e-8
 # JSON row/joint centres reproduce actual material mortar; no hand-written approximate export.
 seams={n:seam_rows(n) for n in SPECS}
 for name,rows in seams.items():
  W,H=SPECS[name][1]
  for row in rows:
   y=sum(row['vBoundsPngDown'])/2*H
   for u in row['uJointCenters']:
    z=evaluate(name,np.array([[u*W]]),np.array([[y]]))[1][0,0];assert abs(z+.0057)<1e-8
 assert seams['sokkeli'][0]['uJointCenters']==seams['sokkelin-ylapinta'][0]['uJointCenters']
 ratio=[l/FH[r] for r,(ls,_) in enumerate(FLOOR) for l in ls];assert min(ratio)>1.8 and max(ratio)<2.3
 assert all(.45-1e-8<=x<=.60 for ls,_ in WALL for x in ls)
 old=json.loads((S/'stone-surfaces-v4/MATERIALS.json').read_text());curb=next(e for e in old['materials'] if e['name']=='reunakivi')
 assert all(sha(D/m['path'])==sha(S/'stone-surfaces-v4'/m['path']) for m in curb['maps'])
 return {'status':'PASS','maps':len(checked),'floorRows':6,'floorWidthsM':[min(x for ls,_ in FLOOR for x in ls),max(x for ls,_ in FLOOR for x in ls)],'floorDepthsM':FH,'floorAspectMinMax':[min(ratio),max(ratio)],'wallCourses':8,'wallRowHeightM':.15,'wallWidthsM':[.45,.55],'jointWidthM':[.0054,.0076],'pillarCornerAlbedoHeightRoughnessMaxDelta':corner,'wallTopJointAlignment':True,'seamJsonMatchesActualMortar':True,'curbByteExact':True,'periodicLimits':periodic,'files':checked},seams
def main():
 entries=[];views={}
 for name in SPECS:
  e,v=bake(name);entries.append(e);views[name]=v;print('baked '+name,flush=True)
 old=json.loads((S/'stone-surfaces-v4/MATERIALS.json').read_text());curb=next(e for e in old['materials'] if e['name']=='reunakivi')
 for m in curb['maps']:
  dest=D/m['path'];dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(S/'stone-surfaces-v4'/m['path'],dest)
 curb['unchangedFromV4']=True;entries.append(curb)
 qa,seams=verify(entries);savej(D/'qa/readback.json',qa)
 savej(D/'SEAMS.json',{'schemaVersion':1,'coordinates':'u=PNG left to right; vBoundsPngDown=PNG top to bottom; glTF v=1-PNG v. Values are seam centre lines, not stone edges. Texture edge listed in uClippedBounds is not automatically a physical joint.','jointWidthM':[.0054,.0076],'normalBevelWidthM':{'lattialaatat':.018,'wall':.010},'lattialaatatLongAxis':'U = across alley; V = along alley; use equal metric UV scale, never stretch either axis','materials':seams})
 report={'generatedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'sourceCommit':'5658e3dfb1a46267ac59f582525476c597aa25db','pipeline':'new immutable ImageGen albedo input + metric material graph; same source scale on both axes; no light or AO in albedo','nativeSourcePx':[T.shape[1],T.shape[0]],'newImageCalls':1,'tripoCalls':0,'materials':entries,'receiverAccepted':False,'gameIntegrated':False,'ownerAccepted':False}
 savej(D/'MATERIALS.json',report)
 sheet=Image.new('RGB',(1800,1600),'#f2f0eb');dr=ImageDraw.Draw(sheet)
 dr.text((20,14),'Kivipinnat v5 — uusi 2D/PBR-materiaali; pelivertailu ja hyväksyntä vielä avoinna',font=FONT,fill='#222')
 for n,y in [('02-lahikuva-lattia.png',55),('02-lahikuva-kivijalka.png',325)]:
  im=Image.open(D/'references'/n).convert('RGB');im.thumbnail((1760,250));sheet.paste(im,(20,y))
 dr.text((20,585),'Yllä vastaanottajan vertailut: vasen v4 pelissä, oikea tavoite. Alla v5:n materiaaliesikatselu.',font=FONT,fill='#222')
 for name,xy,sz in [('lattialaatat',(20,635),(800,800)),('sokkeli',(860,635),(900,540)),('sokkelin-ylapinta',(860,1220),(900,45)),('pilarin-etu',(860,1310),(120,240)),('pilarin-sivu',(1030,1310),(80,240))]:
  im=views[name].copy();im.thumbnail(sz);sheet.paste(im,xy);dr.text((xy[0],xy[1]+im.height+6),name+'-v02',font=SMALL,fill='#222')
 dr.text((1160,1330),'Lattia: 6 poikittaista riviä / 2 m',font=SMALL,fill='#222');dr.text((1160,1370),'Kivijalka: 8 riviä / 1,20 m',font=SMALL,fill='#222');dr.text((1160,1410),'Reunakivi: v4-tavut ennallaan',font=SMALL,fill='#222');dr.text((1160,1450),'Esikatselun valo ei ole albedossa',font=SMALL,fill='#222')
 sheet.save(D/'esikatselu/kivipinnat-v5-vertailu.png')
 # Inspect seam continuity at repeats in the actual baked albedo.
 tile=Image.open(D/'pinnat/lattialaatat-v02/lattialaatat-v02-albedo.png');repeat=Image.new('RGB',(2048,2048))
 for x in (0,1024):
  for y in (0,1024):repeat.paste(tile,(x,y))
 repeat.save(D/'esikatselu/lattia-2x2-albedo.png')
 print(json.dumps({'status':'PASS','maps':qa['maps'],'root':str(D)}),flush=True)
if __name__=='__main__':main()
