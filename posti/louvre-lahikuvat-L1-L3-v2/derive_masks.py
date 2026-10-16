from pathlib import Path
from collections import deque
import json,hashlib,sys
import numpy as np
from PIL import Image,ImageDraw,ImageFilter
P=Path(__file__).resolve().parent
# Observed facade/ground contacts in the NEW v2 photographs, not input masks.
GROUND={
'L1':[(0,743),(180,743),(400,744),(700,744),(900,745),(1100,745),(1300,747),(1535,747)],
'L2':[(0,753),(180,754),(400,754),(580,755),(700,761),(805,763),(900,757),(1100,757),(1300,758),(1535,759)],
'L3':[(0,436),(120,429),(265,416),(390,405),(530,393),(680,380),(800,364),(875,359),(945,358),(1100,361),(1300,368),(1535,369)]}
# Bright lead edging can share sky colors. These short upper-envelope traces were
# observed on native-photo diagnostic crops BEFORE any comparison metric was read.
ROOF_OVERRIDES={
'L1':[[(990,215),(1000,202),(1010,198),(1020,193),(1030,189),(1040,185),(1050,181)]],
'L2':[[(465,333),(470,334),(477,372),(520,373),(580,377)],[(1205,335),(1210,332),(1215,328),(1220,326),(1226,326),(1230,330),(1240,334),(1250,337),(1260,340),(1270,344),(1280,350),(1288,358)],[(1218,323),(1220,315),(1228,312),(1234,319),(1235,325)]],
'L3':[]}
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def write(p,obj):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(obj,indent=2)+'\n')
def make(code):
 path=P/'images'/f'louvre-{code}.png';im=Image.open(path).convert('RGB');a=np.array(im,dtype=np.int16);h,w=a.shape[:2];r,g,b=a[:,:,0],a[:,:,1],a[:,:,2]
 possible=((b-r>35)&(b-g>18)&(b>100))|((r>170)&(g>170)&(b>170)&(b>=g-2)&(g>=r-3))
 seen=np.zeros((h,w),dtype=bool);q=deque()
 for x in range(w):
  if possible[0,x]:seen[0,x]=True;q.append((0,x))
 while q:
  y,x=q.popleft()
  for yy,xx in [(y-1,x),(y+1,x),(y,x-1),(y,x+1)]:
   if 0<=yy<h and 0<=xx<w and possible[yy,xx] and not seen[yy,xx]:seen[yy,xx]=True;q.append((yy,xx))
 top=np.max(np.where(seen,np.arange(h)[:,None],-1),axis=0)+1
 for points in ROOF_OVERRIDES[code]:
  xx=np.arange(points[0][0],points[-1][0]+1);trace=np.rint(np.interp(xx,*[np.array(points)[:,i] for i in [0,1]])).astype(int);top[xx]=np.minimum(top[xx],trace)
 bottom=np.rint(np.interp(np.arange(w),*[np.array(GROUND[code])[:,i] for i in [0,1]])).astype(int)
 mask=(np.arange(h)[:,None]>=top[None,:])&(np.arange(h)[:,None]<=bottom[None,:]);md=P/'masks';md.mkdir(exist_ok=True);dest=md/f'louvre-{code}-maski.png';Image.fromarray(mask.astype('uint8')*255).save(dest)
 record={'code':code,'nativeImageSHA256':sha(path),'dimensions':[w,h],'maskSHA256':sha(dest),'method':'photo-derived sky-connected RGB segmentation for roofline plus manually observed photo facade/ground contact polyline; filled silhouette','groundPolylineNativePixels':GROUND[code],'brightLeadRoofPhotoTraces':ROOF_OVERRIDES[code],'sourceMasksReadForDerivation':False,'sourceMaskCopyOrImageWarp':False,'statueExcludedBelowPalaceSilhouette':True,'windowsAndArchways':'solid building silhouette; occluded building filled behind foreground statue/lamps','uncertaintyPixels':3,'nativeImageUnedited':True}
 write(md/f'{code}-derivation.json',record)
 layer=Image.new('RGBA',im.size,(255,20,20,65));layer.putalpha(Image.fromarray(mask.astype('uint8')*65));overlay=Image.alpha_composite(im.convert('RGBA'),layer);draw=ImageDraw.Draw(overlay);draw.line([(x,int(top[x])) for x in range(w)],fill=(255,0,255,255),width=2);draw.line(GROUND[code],fill=(255,0,255,255),width=2);(P/'qa').mkdir(exist_ok=True);overlay.convert('RGB').save(P/'qa'/f'{code}-photo-mask-overlay.jpg',quality=95)
 return record
def comparison(code,photo,target,path,label):
 inter=int((photo&target).sum());union=int((photo|target).sum());iou=inter/union
 im=Image.fromarray(photo.astype('uint8')*255);er=np.array(im.filter(ImageFilter.MinFilter(7)))>=128;di=np.array(im.filter(ImageFilter.MaxFilter(7)))>=128
 low=int((er&target).sum())/int((di|target).sum());high=min(1,int((di&target).sum())/int((er|target).sum()))
 result={'target':label,'targetPath':str(path),'targetSHA256':sha(path),'targetUnmodified':label in ['K42-raw','LiDAR-raw'],'intersectionPixels':inter,'unionPixels':union,'iou':iou,'threshold':0.95,'measuredThresholdReached':iou>=0.95,'boundaryUncertaintyPixels':3,'conservativeIoURange':[low,high],'receiverAccepted':False}
 diff=np.zeros((*target.shape,3),dtype='uint8');diff[photo&target]=[235,235,235];diff[target&~photo]=[0,170,255];diff[photo&~target]=[255,70,45];Image.fromarray(diff).save(P/'qa'/f'{code}-difference-{label}.png');return result
def compare():
 freeze=json.loads((P/'masks/photo-mask-freeze.json').read_text());results=[]
 for code in ['L1','L2','L3']:
  path=P/'masks'/f'louvre-{code}-maski.png';assert sha(path)==freeze['masks'][code],'Photo-derived mask changed after freeze';photo=np.array(Image.open(path).convert('L'))>=128
  comparisons=[]
  for label,name in [('K42-raw',f'louvre-{code}-maski-k42.png'),('LiDAR-raw',f'louvre-{code}-maski.png')]:
   targetpath=P/'sources'/name;target=np.array(Image.open(targetpath).convert('L'))>=128;assert target.shape==photo.shape;comparisons.append(comparison(code,photo,target,targetpath,label))
  result={'code':code,'nativeImageSHA256':sha(P/'images'/f'louvre-{code}.png'),'photoDerivedMaskSHA256':sha(path),'comparisons':comparisons,'rawThresholdReachedEitherTarget':any(c['measuredThresholdReached'] for c in comparisons),'contentAcceptanceSeparate':True,'receiverAccepted':False}
  if code=='L3':
   # Diagnostic only: supplied K42 target explicitly includes foreground statue contrary to its prose.
   # Preserve source bytes; remove ONLY its protruding foreground area in a separate diagnostic mask.
   target=np.array(Image.open(P/'sources/louvre-L3-maski-k42.png').convert('L'))>=128
   poly=[(875,350),(940,351),(1000,354),(1075,357),(1075,690),(875,690)]
   cut=Image.new('L',(1536,1024),0);ImageDraw.Draw(cut).polygon(poly,fill=255);cut=np.array(cut)>=128
   diagnostic=target&~cut;diagpath=P/'qa/L3-K42-statue-excluded-DIAGNOSTIC.png';Image.fromarray(diagnostic.astype('uint8')*255).save(diagpath)
   result['sourceInconsistency']={'suppliedK42HasForegroundStatue':True,'briefSaysStatueNotInMask':True,'diagnosticRemovalPolygon':poly,'removedWhitePixels':int((target&cut).sum()),'diagnosticNotAcceptanceTarget':True}
   result['additionalDiagnosticComparison']=comparison(code,photo,diagnostic,diagpath,'K42-statue-excluded-DIAGNOSTIC')
  results.append(result)
 write(P/'qa/IoU-report.json',{'threshold':0.95,'twoUnmodifiedRequiredTargets':True,'sourceMasksPreserved':True,'noAutomaticMaskSubstitution':True,'results':results});print(json.dumps(results,indent=2))
if __name__=='__main__':
 if sys.argv[1]=='derive':
  assert not (P/'masks/photo-mask-freeze.json').exists(),'Photo masks frozen; do not tune against target IoU'
  rows={c:make(c) for c in ['L1','L2','L3']};write(P/'masks/photo-mask-candidates.json',rows);print('Three photo-derived masks ready for visual QA before comparisons')
 elif sys.argv[1]=='freeze':
  assert not (P/'masks/photo-mask-freeze.json').exists()
  write(P/'masks/photo-mask-freeze.json',{'visuallyInspectedAgainstNativePhotos':True,'sourceMasksNotReadForDerivation':True,'masks':{c:sha(P/'masks'/f'louvre-{c}-maski.png') for c in ['L1','L2','L3']}});print('Photo mask hashes frozen before comparisons')
 elif sys.argv[1]=='compare':compare()
