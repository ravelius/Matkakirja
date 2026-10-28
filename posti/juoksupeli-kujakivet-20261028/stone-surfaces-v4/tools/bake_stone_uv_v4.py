"""V4 metric material graph: exact existing UV rectangles; new generated calm albedo input.
No source image paint/retouch. Bevel/stone layout/normal/height are analytic geometry.
"""
from pathlib import Path
import json,datetime,shutil,hashlib,resource
import numpy as np
from PIL import Image,ImageDraw
import bake_stone_uv_v3 as b
R=Path(__file__).resolve().parents[1];D=R/'stone-surfaces-v4';b.D=D
T=np.asarray(Image.open(D/'sources/stone-calm-native.png').convert('RGB'),np.float32)/255
def wall_lengths(variant,row):return [1/3]*6,(row%2)/6
def field(name,X,Y):
 ids=np.zeros(X.shape,int);lx=X.copy();ly=Y.copy();dist=np.full_like(X,10);edge=dist.copy();cw=np.full_like(X,1/3);ch=np.full_like(X,.15)
 if name in ['sokkeli','sokkelin-ylapinta']:
  row=np.clip(np.floor(Y/.15).astype(int),0,7) if name=='sokkeli' else np.zeros(X.shape,int)
  for r in range(8 if name=='sokkeli' else 1):
   lengths,offset=wall_lengths(1,r);i,l,z=b.periodic_course(X,lengths,offset,2);m=row==r;ids[m]=i[m]+r*13;lx[m]=l[m];ly[m]=Y[m]-.15*r;dist[m]=z[m]
  if name=='sokkeli':dist=np.minimum(dist,np.minimum(ly,.15-ly))
  else:ch[:]=.1
  edge=dist if name=='sokkeli' else np.minimum(dist,np.minimum(Y,.1-Y))
 elif name.startswith('pilarin-'):
  row=np.clip(np.floor(Y/.15).astype(int),0,7);t=X+.6 if name=='pilarin-sivu' else X
  for r in range(8):
   i,l,z=b.periodic_course(t,[.3]*4,.1 if r%2==0 else .2,1.2);m=row==r;ids[m]=i[m]+r*13;lx[m]=l[m];ly[m]=Y[m]-.15*r;dist[m]=z[m]
  dist=np.minimum(dist,np.minimum(ly,.15-ly));edge=dist;cw[:]=.3
 else:
  # Change widths between cross courses: no uninterrupted straight vertical lane seams.
  yy=np.mod(Y,2);ends=[.70,1.25,2.0];starts=[0,.70,1.25];heights=[.70,.55,.75]
  row=np.minimum(np.searchsorted(ends,yy,side='right'),2)
  lens=[[.38,.53,.46,.63],[.52,.42,.58,.48],[.44,.61,.55,.40]];offsets=[.13,.38,.06]
  for r in range(3):
   i,l,z=b.periodic_course(X,lens[r],offsets[r],2);m=row==r;ids[m]=i[m]+r*19+173;lx[m]=l[m];ly[m]=yy[m]-starts[r];dist[m]=np.minimum(z,np.minimum(yy-starts[r],heights[r]-(yy-starts[r])))[m];cw[m]=np.array(lens[r])[i[m]];ch[m]=heights[r]
  edge=dist
 # Rounded plan-view corners as well as a rounded height shoulder, not square linework.
 radius=.024 if name=='lattialaatat' else .010
 qx=np.abs(lx-cw/2)-(cw/2-radius);qy=np.abs(ly-ch/2)-(ch/2-radius)
 roundedDist=radius-np.sqrt(np.maximum(qx,0)**2+np.maximum(qy,0)**2)-np.minimum(np.maximum(qx,qy),0)
 if name!='sokkelin-ylapinta':dist=roundedDist
 edge=roundedDist
 return ids,lx,ly,dist,edge
def evaluate(name,variant,X,Y):
 ids,lx,ly,dist,edge=field(name,X,Y)
 # Hash avoids ordered light/dark checkerboards; identical corner stone keeps same phase/tone.
 h=(ids.astype(np.uint64)*1103515245+12345)%2147483647;idx=((h>>12)%5).astype(int)
 tones=np.array([.79,.88,.96,1.035,1.085] if name!='lattialaatat' else [.91,.955,1.,1.035,1.07],np.float32)
 col=b.sample(T,.02+lx*.85+(h%97)*.0008,.02+ly*.85+(h%71)*.001)*tones[idx,None]
 wear=.00035*np.sin(2*np.pi*(lx*8+ly*11+ids*.19))+.00016*np.sin(2*np.pi*(lx*19-ly*13))
 joint=1-b.smooth(.0038+wear,.0052+wear,dist)
 width=.027 if name=='lattialaatat' else .013
 t=np.clip((edge-.0045-wear)/width,0,1)
 # Smooth rounded shoulder, full 5.7mm recess, broad enough to read in the game camera.
 rounded=.5-.5*np.cos(np.pi*t)
 micro=.000045*np.sin(2*np.pi*(lx*31+ly*17+ids*.23))+.00007*np.sin(2*np.pi*(lx*6.1+ly*8.7))
 height=-.0057+.0057*rounded+micro*rounded
 height=height*(1-joint)-.0057*joint
 mortar=np.array([.49,.477,.456]);col=col*(1-joint[...,None])+mortar*joint[...,None]
 rough=(.79+.02*np.sin(2*np.pi*(lx*7+ly*4)))*(1-joint)+.94*joint
 return np.clip(col,0,1),height,np.clip(rough,0,1)
def main():
 b.evaluate=evaluate;b.wall_lengths=wall_lengths
 entries=[];views={}
 for name in b.SPECS:
  if name=='reunakivi':
   old=json.loads((R/'stone-surfaces-v3/MATERIALS.json').read_text());entry=next(x for x in old['materials'] if x['name']==name and x['variant']==1)
   for m in entry['maps']:
    source=R/'stone-surfaces-v3'/m['path'];dest=D/m['path'];dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(source,dest);assert b.sha(dest)==m['sha256']
   entry['unchangedFromV3']=True;entries.append(entry);views[name]=Image.open(D/entry['maps'][0]['path']).convert('RGB');continue
  e,im=b.bake(name,1);entries.append(e);views[name]=im
 qa=b.qa_crossface(1)
 # Exact counts, map decode, normal directions and byte-preserved owner-locked curb.
 checked=[]
 for e in entries:
  for m in e['maps']:
   im=Image.open(D/m['path']);a=np.asarray(im);assert list(im.size)==m['sizePx'];assert b.sha(D/m['path'])==m['sha256']
   if m['kind']=='normal-opengl':
    n=a.astype(float)/255*2-1;assert np.max(abs(np.linalg.norm(n,axis=-1)-1))<.014;assert n[...,2].min()>0
   if m['kind']=='height':assert a.dtype==np.uint16
   checked.append(m['path'])
 (D/'qa').mkdir(exist_ok=True);(D/'qa/readback.json').write_text(json.dumps({'status':'PASS','maps':len(checked),'wallCourses':8,'rowHeightM':.15,'curbByteExact':True,'crossFaceAndRepeat':qa,'files':checked},indent=2)+'\n')
 report={'generatedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'pipeline':'metric material graph; generated albedo retained; no painted light/AO','newImageCalls':1,'tripoCalls':0,'variants':1,'materials':entries,'qa':[qa],'receiverAccepted':False,'gameIntegrated':False,'ownerAccepted':False};(D/'MATERIALS.json').write_text(json.dumps(report,indent=2,ensure_ascii=False)+'\n')
 sheet=Image.new('RGB',(1440,1080),'#f2f0eb');dr=ImageDraw.Draw(sheet);dr.text((20,15),'Kivipinnat v4 — tavoite vasemmalla, uusi materiaaligrafiikka oikealla',font=b.FONT,fill='#222')
 ref=Image.open(D/'references/havainne.png').convert('RGB');ref.thumbnail((680,520));sheet.paste(ref,(15,55))
 for name,xy,sz in [('sokkeli',(730,55),(685,411)),('sokkelin-ylapinta',(730,515),(685,34)),('lattialaatat',(20,650),(395,395)),('pilarin-etu',(480,650),(190,380)),('pilarin-sivu',(715,650),(126,380)),('reunakivi',(920,690),(350,258))]:
  im=views[name].copy();im.thumbnail(sz);sheet.paste(im,xy);dr.text((xy[0],xy[1]+im.height+8),name,font=b.FONT,fill='#222')
 dr.text((20,600),'8 × 15 cm tiilikerrosta; tyynymäiset laatat. Reunakivi ennallaan. Pelivertailu vielä avoin.',font=b.FONT,fill='#222')
 (D/'esikatselu').mkdir(exist_ok=True);sheet.save(D/'esikatselu/kivipinnat-v01-vertailu.png');print(json.dumps({'maps':len(checked),'qa':'PASS','root':str(D)}))
if __name__=='__main__':main()
