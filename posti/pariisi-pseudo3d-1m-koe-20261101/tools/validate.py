from pathlib import Path
from PIL import Image, ImageChops, ImageFilter, ImageStat
import hashlib, json, datetime

R = Path(__file__).resolve().parents[1]
final = R / 'final/pariisi-pseudo3d-r4-c4-q11-1m.png'
native = R / 'raw/q11-1m-attempt001-native.png'
im = Image.open(final).convert('RGB')
ref = Image.open(R / 'source/ohje-r4-c4-q11-v6-geometria.png').convert('RGB')
old = Image.open(R / 'source/nykyinen-r4-c4-q11-2x-suurennos.png').convert('RGB')
assert im.size == ref.size == old.size == (1536, 1024)
assert final.read_bytes() == native.read_bytes()
water = Image.open(R / 'source/vesimaski-r4-c4-q11.png').convert('L')
assert water.getextrema() == (0, 0)

def road_mask(a):
    return Image.frombytes('L', a.size, bytes(255 if r >= 238 and g >= 236 and b >= 226 and max(r,g,b)-min(r,g,b)<24 else 0 for r,g,b in a.getdata()))

def count(a):
    return a.histogram()[255]

def contour(a):
    edge = ImageChops.subtract(a, a.filter(ImageFilter.MinFilter(3)))
    for box in [(0,0,a.width,3),(0,a.height-3,a.width,a.height),(0,0,3,a.height),(a.width-3,0,a.width,a.height)]:
        edge.paste(0,box)
    return edge

rm, cm = road_mask(ref), road_mask(im)
re, ce = contour(rm), contour(cm)
coverage = {}
for radius in [1, 2, 4, 8]:
    rr, cc = re.filter(ImageFilter.MaxFilter(radius*2+1)), ce.filter(ImageFilter.MaxFilter(radius*2+1))
    coverage[str(radius)] = {
        'referenceContourNearCandidatePercent': 100*count(ImageChops.multiply(re,cc))/count(re),
        'candidateContourNearReferencePercent': 100*count(ImageChops.multiply(ce,rr))/count(ce)
    }
intersection = count(ImageChops.multiply(rm,cm))
union = count(ImageChops.lighter(rm,cm))
r,g,b = im.split()
cyan = ImageChops.multiply(ImageChops.multiply(ImageChops.subtract(g,r).point(lambda x:255 if x>35 else 0), ImageChops.subtract(b,r).point(lambda x:255 if x>35 else 0)),r.point(lambda x:255 if x<170 else 0))
rois = {'center':(600,350,984,670),'southwest':(160,620,544,940),'northeast':(1050,190,1434,510)}
sharp = {}
for name, box in rois.items():
    def variance(a):
        e=a.crop(box).convert('L').filter(ImageFilter.FIND_EDGES)
        return ImageStat.Stat(e.crop((1,1,e.width-1,e.height-1))).var[0]
    before, after=variance(old),variance(im)
    sharp[name]={'roi':list(box),'previousUpscaledVariance':before,'newNativeVariance':after,'ratio':after/before}
result={
    'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),
    'taskNumber':1427,'generationMode':'built-in image_gen, complete new image','generationCalls':1,
    'file':str(final),'bytes':final.stat().st_size,'sha256':hashlib.sha256(final.read_bytes()).hexdigest(),
    'nativeDimensions':list(im.size),'mode':Image.open(final).mode,'upscaled':False,
    'byteIdenticalToNativeOutput':True,'nativeMetersPerPixel':1,
    'sourceCropInR4C4':{'x0':0,'y0':0,'width':1536,'height':1024},
    'waterDiagnostics':{'allowedWaterPixels':0,'turquoiseCandidatePixels':count(cyan),'visuallyAddedWater':False,'method':'G-R>35 and B-R>35 and R<170; colour proxy plus full visual review, not semantic classifier'},
    'groundGeometryDiagnostic':{'roadColourMaskIoU':intersection/union,'roadMaskReferencePixels':count(rm),'roadMaskCandidatePixels':count(cm),'contourCoverageWithinChebyshevPixels':coverage,'method':'Near-white RGB road proxy, R>=238 G>=236 B>=226 channel spread<24; inner contour, exclude 3px frame. Bright architecture can enter proxy. This is not a certified street-centreline displacement measurement.','pixelExactGeometryCertified':False},
    'sharpnessDiagnostic':{'method':'Grayscale FIND_EDGES variance, same atlas-coordinate crops, exclude 1px filter edge; edge contrast proxy, not proof of readable dormers or in-game acceptance','rois':sharp},
    'visualReview':{'fullTileViewed':True,'sameAtlasCropAt200PercentViewed':True,'roofPlanesMoreSeparatedThanPrevious':True,'thinBrownRoofContoursVisible':True,'distinctChimneyMarksVisible':True,'smallDormerMarksVisible':True,'noAddedTreesPeopleTraffic':True,'noAddedLandmarks':True,'noWaterVisible':True,'caution':'Small dormers remain stylized and do not all resolve into complete window structures; closest-game-zoom acceptance belongs to receiver. Minor outlines and shadows differ from geometry source.'},
    'receiverAccepted':False,'gameIntegrated':False,'published':False,'fullCityAuthorized':False
}
(R/'qa/validation.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(result,ensure_ascii=False,indent=2))
