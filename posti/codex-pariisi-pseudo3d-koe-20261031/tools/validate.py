from pathlib import Path
from PIL import Image, ImageChops, ImageStat, ImageFilter
from collections import Counter
import json, hashlib, datetime
R=Path(__file__).resolve().parents[1]
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def water_mask(im):
 r,g,b=im.split()
 return ImageChops.multiply(ImageChops.multiply(ImageChops.subtract(g,r).point(lambda x:255 if x>35 else 0),ImageChops.subtract(b,r).point(lambda x:255 if x>35 else 0)),r.point(lambda x:255 if x<170 else 0))
def n(mask):return mask.histogram()[255]
def ratios(im):
 # Same pixel classifications as the supplied osuudet.py; pure Python avoids a new dependency environment.
 a=im.tobytes();it=iter(a);total=im.width*im.height
 counts={k:0 for k in ['seinä','katto','puu','vesi']}
 med={k:[Counter(),Counter(),Counter()] for k in counts}
 for r,g,b in zip(it,it,it):
  water=g>r+35 and b>r+35 and r<170
  roof=b>r+12 and b>g+2 and r<200 and not(g>r+30 and b<g+25 and g>150) and not water
  wall=r>165 and r>=g and g>b and 28<r-b<120 and g-b>12
  tree=g>r+4 and g>b+12 and not water
  for key,ok in [('seinä',wall),('katto',roof),('puu',tree),('vesi',water)]:
   if ok:
    counts[key]+=1
    for c,v in zip(med[key],(r,g,b)):c[v]+=1
 def median(counter,count):
  def at(q):
   s=0
   for v,c in sorted(counter.items()):
    s+=c
    if s>q:return v
  return int((at((count-1)//2)+at(count//2))/2) if count else None
 return {k:dict(percent=round(counts[k]/total*100,3),medianRGB=[median(c,counts[k]) for c in med[k]] if counts[k] else None) for k in counts}
def seam(a,b):
 diff=ImageChops.difference(a.crop((2944,0,3072,2048)),b.crop((0,0,128,2048)))
 exact=sum(1 for p in diff.getdata() if p==(0,0,0));total=128*2048
 return dict(identical=diff.getbbox() is None,exactPixelFraction=exact/total,meanAbsoluteChannelDifference=sum(ImageStat.Stat(diff).mean)/3,pixelCount=total)
out=dict(checkedAt=datetime.datetime.now(datetime.timezone.utc).isoformat(),method='Built-in full new generation per tile; RGB Lanczos 2x export only. No geometry repair, edge copying or compositing.',tiles=[],groundGeometryCertified=False,assembledPilotApproved=False,gameIntegrated=False,published=False)
final=[];sources=[]
for tile in ['r3-c4','r3-c5']:
 p=R/'final'/('pariisi-pseudo3d-'+tile+'.png');raw=R/'raw'/(tile+'-v1-native.png');s=R/'source'/('ohje-'+tile+'-v6-geometria.png')
 im=Image.open(p).convert('RGB');base=Image.open(s).convert('RGB');native=Image.open(raw);final.append(im);sources.append(base)
 water=water_mask(im);sw=water_mask(base)
 # Diagnostic colour-boundary displacement, not a semantic survey of road centrelines.
 edge=ImageChops.subtract(water,water.filter(ImageFilter.MinFilter(3)))
 sedge=ImageChops.subtract(sw,sw.filter(ImageFilter.MinFilter(3)))
 diagnostic={}
 for radius in [3,8,16]:
  beyond=ImageChops.multiply(edge,ImageChops.invert(sedge.filter(ImageFilter.MaxFilter(radius*2+1))))
  diagnostic[str(radius)]=dict(generatedBoundaryPixelsBeyondRadius=n(beyond),fraction=round(n(beyond)/max(n(edge),1),6),metric='Chebyshev pixel distance; colour threshold heuristic')
 out['tiles'].append(dict(tile=tile,path=str(p),sha256=digest(p),bytes=p.stat().st_size,mode=Image.open(p).mode,exportSize=list(im.size),nativeSize=list(native.size),nativeSha256=digest(raw),resampled=True,sourceColourRatios=ratios(base),outputColourRatios=ratios(im),waterBoundaryDiagnostic=diagnostic))
out['sourceOverlap']=seam(*sources);out['generatedOverlap']=seam(*final)
out['deliveryClassification']='EXPERIMENT_ONLY_NOT_GEOMETRY_APPROVED'
out['qualityDecision']='FAIL_SEAM_AND_UNVERIFIED_3PX_GEOMETRY'
out['visualReview']='Two islands and major routes remain broadly recognizable; ordinary houses have warmer walls and blue-grey roofs, no exaggerated monuments or added life. Individual block outlines and road widths differ. Right city fade retained. Exact geometric fidelity is not certified.'
(R/'qa/validation.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(out,ensure_ascii=False,indent=2))

