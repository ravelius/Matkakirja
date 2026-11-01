from pathlib import Path
from PIL import Image,ImageChops,ImageFilter,ImageStat
import hashlib,json,datetime
R=Path(__file__).resolve().parents[1]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
p=R/'final/pariisi-pseudo3d-r4-c4.png';im=Image.open(p).convert('RGB')
native=Image.open(R/'raw/r4-c4-v2-native.png')
mask=Image.open(R/'source/vesimaski-r4-c4.png').convert('L').point(lambda x:255 if x>127 else 0)
r,g,b=im.split()
cyan=ImageChops.multiply(ImageChops.multiply(ImageChops.subtract(g,r).point(lambda x:255 if x>35 else 0),ImageChops.subtract(b,r).point(lambda x:255 if x>35 else 0)),r.point(lambda x:255 if x<170 else 0))
outside=ImageChops.multiply(cyan,ImageChops.invert(mask))
beyond3=ImageChops.multiply(cyan,ImageChops.invert(mask.filter(ImageFilter.MaxFilter(7))))
neighbor=Image.open(R/'source/naapuri-r3-c4-codex-alareuna-256px.png').convert('RGB')
diff=ImageChops.difference(neighbor.crop((0,128,3072,256)),im.crop((0,0,3072,128)))
rois={}
for name,box in [('east-L-ornament',(2700,560,2820,660)),('far-east-strip',(2960,820,3072,920))]:
 rois[name]=dict(box=list(box),cyanPixels=cyan.crop(box).histogram()[255],visual='dry ivory/grass, no turquoise fill')
out=dict(checkedAt=datetime.datetime.now(datetime.timezone.utc).isoformat(),file=str(p),sha256=sha(p),bytes=p.stat().st_size,mode=Image.open(p).mode,dimensions=list(im.size),nativeDimensions=list(native.size),nativeSha256=sha(R/'raw/r4-c4-v2-native.png'),resampled='2x Lanczos export; not native 3072 detail',generationMode='built-in image_gen complete new generation',generationCalls=2,selectedAttempt=2,rejectedAttempt1='two copied blue ornaments outside water mask',waterColourDiagnostics=dict(cyanPixels=cyan.histogram()[255],outsideMask=outside.histogram()[255],beyond3pxMask= beyond3.histogram()[255],caution='colour mask can include roof highlights and antialiasing; not a semantic water/shoreline certificate',correctedOrnamentChecks=rois),horizontalOverlapDiagnostic=dict(meanAbsoluteChannelDifference=sum(ImageStat.Stat(diff).mean)/3,exactPixelEqualityRequired=False,receiverCrossfadeAndCornerReviewRequired=True),visualQA=dict(ordinaryBuildings=True,noExaggeration=True,noAddedTreesPeopleTraffic=True,railYardsAndBridgesRetainedBroadly=True,twoUnpermittedPoolsRemoved=True,roofInkAndDormersVisibleAtNativeCrop=True,closestGameZoomSharpnessAccepted=False,roofNote='Fine details still limited by 1536px native output; no claim of native 3072px line fidelity',groundGeometryCertified=False),receiverAccepted=False,gameIntegrated=False,published=False)
(R/'qa/validation.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(out,ensure_ascii=False,indent=2))

