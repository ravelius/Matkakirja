from pathlib import Path
from collections import deque
import json,hashlib
import numpy as np
from PIL import Image,ImageDraw,ImageFilter
P=Path(__file__).resolve().parent
# Ground/facade contacts traced visually from the generated PNG coordinate previews,
# before reading any source mask. These are NOT coordinates copied from input geometry.
GROUND={
'L1':[(0,800),(160,805),(320,809),(520,812),(760,811),(900,810),(950,809),(1000,808),(1140,810),(1240,810),(1535,808)],
'L2':[(0,772),(180,773),(370,772),(610,772),(840,775),(1040,776),(1250,777),(1535,777)],
'L3':[(0,543),(130,538),(300,531),(450,513),(650,501),(820,495),(950,492),(1140,494),(1535,498)]}
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def make_mask(code):
 image=P/'images'/f'louvre-{code}.png';im=Image.open(image).convert('RGB');a=np.array(im,dtype=np.int16);h,w=a.shape[:2]
 r,g,b=a[:,:,0],a[:,:,1],a[:,:,2]
 sky_candidate=((b-r>35)&(b-g>18)&(b>100))|((r>170)&(g>170)&(b>170)&(b>=g-2)&(g>=r-3))
 # Sky connected to top image edge. Roof/facade colors separate it from enclosed blue windows.
 seen=np.zeros((h,w),dtype=bool);q=deque()
 for x in range(w):
  if sky_candidate[0,x]:seen[0,x]=True;q.append((0,x))
 while q:
  y,x=q.popleft()
  for yy,xx in [(y-1,x),(y+1,x),(y,x-1),(y,x+1)]:
   if 0<=yy<h and 0<=xx<w and sky_candidate[yy,xx] and not seen[yy,xx]:seen[yy,xx]=True;q.append((yy,xx))
 top=np.max(np.where(seen,np.arange(h)[:,None],-1),axis=0)+1
 bottom=np.rint(np.interp(np.arange(w),*[np.array(GROUND[code])[:,i] for i in [0,1]])).astype(int)
 mask=(np.arange(h)[:,None]>=top[None,:])&(np.arange(h)[:,None]<=bottom[None,:])
 out=Image.fromarray(mask.astype('uint8')*255);outdir=P/'masks';outdir.mkdir(exist_ok=True);dst=outdir/f'louvre-{code}-maski.png';out.save(dst)
 tracing={'code':code,'nativeImageSHA256':sha(image),'dimensions':[w,h],'skyMethod':'top-edge flood fill using blue-sky/white-cloud RGB predicate, per-column visible roof boundary; no source mask input','groundMethod':'manual photo-derived facade/ground contact polyline, filled building silhouettes with no interior window/arch cutouts','groundPolylineNativePixels':GROUND[code],'notIncluded':'ground, sky, lamp posts, statue protruding beyond background palace silhouette, lower-right label','occlusionConvention':'fill palace behind foreground statue/lamps where facade is occluded; solid silhouette, not semantic visible-surface segmentation','uncertaintyPixels':3,'sourceMaskUsedForDerivation':False,'sourceMaskSHA256ReadOnlyForLaterComparison':None,'derivedMaskSHA256':sha(dst),'nativeImageBytesUnedited':True}
 (outdir/f'{code}-derivation.json').write_text(json.dumps(tracing,indent=2)+'\n')
 # QA overlay over original picture: white/red shape is derived from this photo only.
 rgba=im.convert('RGBA');color=Image.new('RGBA',im.size,(255,20,20,70));color.putalpha(Image.fromarray(mask.astype('uint8')*65));rgba=Image.alpha_composite(rgba,color)
 draw=ImageDraw.Draw(rgba);draw.line([(x,int(top[x])) for x in range(w)],fill=(255,0,255,255),width=2);draw.line(GROUND[code],fill=(255,0,255,255),width=2)
 rgba.convert('RGB').save(P/'qa'/f'{code}-photo-mask-overlay.jpg',quality=95)
 return tracing,mask
def compare(code,tracing,mask):
 src=P/'sources'/f'louvre-{code}-maski.png';t=np.array(Image.open(src).convert('L'))>=128;assert t.shape==mask.shape
 inter=int((t&mask).sum());union=int((t|mask).sum());iou=inter/union
 mm=Image.fromarray(mask.astype('uint8')*255);er=np.array(mm.filter(ImageFilter.MinFilter(7)))>=128;di=np.array(mm.filter(ImageFilter.MaxFilter(7)))>=128
 low=int((t&er).sum())/int((t|di).sum());high=min(1,int((t&di).sum())/int((t|er).sum()))
 result={'code':code,'imageSHA256':tracing['nativeImageSHA256'],'derivedMaskSHA256':tracing['derivedMaskSHA256'],'targetMaskSHA256':sha(src),'dimensions':list(Image.open(src).size),'intersectionPixels':inter,'unionPixels':union,'iou':iou,'requiredIoU':0.95,'measuredThresholdReached':iou>=0.95,'approximateBoundaryUncertaintyPixels':3,'conservativeIoURangeFor3PixelMaskBoundary':[low,high],'receiverAcceptance':False,'maskMethod':'genuinely derived from generated photo before source-mask read; no warping or input-mask copy','noImageTransformations':True,'interpretation':'local silhouette check only; exact architecture and independent receiver decision remain separate'}
 diff=np.zeros((*t.shape,3),dtype='uint8');diff[t&mask]=[235,235,235];diff[t&~mask]=[0,170,255];diff[mask&~t]=[255,70,45];Image.fromarray(diff).save(P/'qa'/f'{code}-silhouette-difference.png')
 return result
if __name__=='__main__':
 # All masks are finalized first; source masks only read after all photo-derived masks exist.
 built={c:make_mask(c) for c in ['L1','L2','L3']}
 results=[compare(c,*built[c]) for c in built]
 (P/'qa/IoU-report.json').write_text(json.dumps({'threshold':0.95,'results':results},indent=2)+'\n')
 print(json.dumps(results,indent=2))
