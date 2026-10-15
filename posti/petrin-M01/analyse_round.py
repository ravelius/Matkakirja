from pathlib import Path
from collections import deque
import json, hashlib, time
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT=Path(__file__).resolve().parent
assert (ROOT/'render-complete.json').exists()
OUT=ROOT/'qa';OUT.mkdir(exist_ok=True)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def font(n):
    for p in ['/System/Library/Fonts/Supplemental/Arial.ttf','/System/Library/Fonts/Helvetica.ttc']:
        if Path(p).exists():return ImageFont.truetype(p,n)
    return ImageFont.load_default(size=n)
def fill_holes(mask):
    # Flood only the outside background with scanline spans; no convex hull or target-based deformation.
    fg=np.asarray(mask)>0;h,w=fg.shape;outside=np.zeros_like(fg);todo=deque([(0,0)])
    while todo:
        x,y=todo.pop()
        if fg[y,x] or outside[y,x]:continue
        l=x;r=x
        while l>0 and not fg[y,l-1] and not outside[y,l-1]:l-=1
        while r+1<w and not fg[y,r+1] and not outside[y,r+1]:r+=1
        outside[y,l:r+1]=True
        for yy in [y-1,y+1]:
            if 0<=yy<h:
                a=(~fg[yy,l:r+1])&(~outside[yy,l:r+1]);starts=a&np.r_[True,~a[:-1]]
                for xx in np.flatnonzero(starts):todo.append((l+int(xx),yy))
    return Image.fromarray((~outside).astype('uint8')*255)
def outline(mask):
    m=np.asarray(mask)>0;e=m.copy();e[1:,:]&=m[:-1,:];e[:-1,:]&=m[1:,:];e[:,1:]&=m[:,:-1];e[:,:-1]&=m[:,1:]
    return np.asarray(Image.fromarray((m&~e).astype('uint8')*255).filter(ImageFilter.MaxFilter(3)))>0
def lab(p):
    a=p.astype('float64')/255;a=np.where(a<=.04045,a/12.92,((a+.055)/1.055)**2.4)
    xyz=a@np.array([[.4124564,.2126729,.0193339],[.3575761,.7151522,.1191920],[.1804375,.0721750,.9503041]])
    xyz/=np.array([.95047,1.,1.08883]);d=6/29;f=np.where(xyz>d**3,np.cbrt(xyz),xyz/(3*d*d)+4/29)
    return np.column_stack([116*f[:,1]-16,500*(f[:,0]-f[:,1]),200*(f[:,1]-f[:,2])])

all_metrics=[];boards=[]
for view in ['K1','K2','K3','K4','K5']:
    target=Image.open(ROOT/f'inputs/targets/{view}.png').convert('RGB')
    target_mask=Image.open(ROOT/f'inputs/targets/{view}-mask.png').convert('L')
    model=Image.open(ROOT/f'renders/{view}-model.png').convert('RGB')
    raw=Image.open(ROOT/f'renders/{view}-geometry-alpha.png').convert('RGBA')
    assert target.size==model.size==target_mask.size==raw.size
    alpha=np.asarray(raw.getchannel('A'));raw_mask=Image.fromarray((alpha>=128).astype('uint8')*255)
    filled=fill_holes(raw_mask);filled.save(OUT/f'{view}-model-filled-mask.png');raw_mask.save(OUT/f'{view}-model-visible-mask.png')
    t=np.asarray(target_mask)>0;m=np.asarray(filled)>0;intersection=int((t&m).sum());union=int((t|m).sum());iou=intersection/union
    assert .001<m.mean()<.8, (view,'Unexpected geometry-only alpha occupancy',m.mean())
    tb=target_mask.getbbox();mb=filled.getbbox();th=tb[3]-tb[1];mh=mb[3]-mb[1]
    eligible=(alpha>=250)&t;n=int(eligible.sum())
    a=np.asarray(target)[eligible];b=np.asarray(model)[eligible]
    de=np.linalg.norm(lab(a)-lab(b),axis=1) if n else np.array([])
    metric={'view':view,'nativeDimensions':list(target.size),'cameraSHA256':sha(ROOT/f'inputs/cameras/{view}.json'),'targetImageSHA256':sha(ROOT/f'inputs/targets/{view}.png'),'targetMaskSHA256':sha(ROOT/f'inputs/targets/{view}-mask.png'),'modelImageSHA256':sha(ROOT/f'renders/{view}-model.png'),'rawGeometryAlphaSHA256':sha(ROOT/f'renders/{view}-geometry-alpha.png'),'modelFilledMaskSHA256':sha(OUT/f'{view}-model-filled-mask.png'),'maskMethod':'geometry alpha >=128 then fill enclosed holes from outside flood fill; no convex hull, image tracing, scaling or target-based mask adjustment','intersectionPixels':intersection,'unionPixels':union,'targetWhitePixels':int(t.sum()),'modelWhitePixels':int(m.sum()),'silhouetteIoU':iou,'silhouetteIoUPercent':100*iou,'requiredIoUPercent':85 if view=='K1' else 90,'IoUThresholdPassed':iou>=(.85 if view=='K1' else .90),'K5CorrectedMaskUsed':view=='K5','targetMaskIndependentPixelExactCertification':False,'K5CorrectedMaskPTConfirmationPending':view=='K5','targetBBox':list(tb),'modelBBox':list(mb),'imageBoundingHeightDifferencePercentDiagnostic':100*(mh-th)/th,'boundingHeightIsNotPhysicalHeightError':True,'bindingMaterialDeltaE':None,'bindingDeltaEUnavailableReason':'No independently registered material-only reference ROIs and matched illuminant; filled target silhouette includes background within lattice.','registeredPixelColorDiagnostic':{'method':'CIE76 D65 sRGB target/model pixel distance on raw opaque model-alpha AND target-filled-mask intersection','samples':n,'meanDeltaE76':float(de.mean()) if n else None,'medianDeltaE76':float(np.median(de)) if n else None,'p90DeltaE76':float(np.percentile(de,90)) if n else None,'notAPureMaterialColorMetric':True,'includesShapeRegistrationAndLightingErrors':True,'notUsedToClaimBindingDeltaEPass':True}}
    all_metrics.append(metric)
    ov=np.asarray(target).copy();ov=(ov*.70).astype('uint8');a=outline(target_mask);b=outline(filled);ov[a]=(0,220,255);ov[b]=(255,70,50);ov[a&b]=(255,255,255);over=Image.fromarray(ov);over.save(OUT/f'{view}-contour-overlay.png')
    pw=512;ph=round(target.height*pw/target.width);canvas=Image.new('RGB',(1600,ph+146),(242,241,237));d=ImageDraw.Draw(canvas)
    d.text((20,12),f'{view} | Petřín M01 — ensimmäinen mallikierros',font=font(25),fill=(22,27,30))
    for i,(im,title) in enumerate([(target,'Hyväksytty tavoite'),(model,'3D-malli M01'),(over,'Ääriviivat: sininen tavoite / punainen malli')]):
        x=16+i*528;d.text((x,49),title,font=font(19),fill=(35,40,44));canvas.paste(im.resize((pw,ph),Image.Resampling.LANCZOS),(x,80))
    d.text((18,ph+94),f'IoU {100*iou:.1f} % / tavoite {metric["requiredIoUPercent"]} % | Kamerat ja malli muuttamattomina | ΔE: vain diagnostinen pikseliero',font=font(20),fill=(120,30,28) if not metric['IoUThresholdPassed'] else (25,85,45))
    canvas.save(OUT/f'{view}-comparison.png');boards.append(canvas)

sheet=Image.new('RGB',(1600,sum(x.height for x in boards)+16*(len(boards)+1)),(224,225,222));y=16
for im in boards:sheet.paste(im,(0,y));y+=im.height+16
sheet.save(OUT/'petrin-M01-comparison-sheet.png')
geom=json.loads((ROOT/'geometry-manifest.json').read_text())
result={'round':'M01','modelIterationsCompleted':1,'perView':all_metrics,'meanIoUPercent':float(np.mean([x['silhouetteIoUPercent'] for x in all_metrics])),'allIoUThresholdsPassed':all(x['IoUThresholdPassed'] for x in all_metrics),'physicalHeightSourceConformance':geom['heightSourceConformanceErrorsPercent'],'physicalHeightIsMeshAuditAgainstTask253NotIndependentSurvey':True,'bindingMaterialDeltaE':None,'bindingColorThresholdPassNotClaimed':True,'cameraProjectionChecks':geom['cameraProjectionChecks'],'cameraOptimizationAgainstTargetsUsed':False,'K5GroundPointIsInferred':True,'K4RearDetailsUnverifiedReconstruction':True,'K5MaskCorrectionAwaitingPTConfirmation':True,'stopReason':'First authorized model round complete; wait for PT feedback. No automatic second model iteration.','modelFinalAcceptanceVerified':False,'gameIntegrated':False,'R2Used':False,'published':False}
(OUT/'metrics.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'round':'M01','meanIoUPercent':result['meanIoUPercent'],'perView':[{k:m[k] for k in ['view','silhouetteIoUPercent','requiredIoUPercent','IoUThresholdPassed']} for m in all_metrics],'allIoUPassed':result['allIoUThresholdsPassed'],'bindingMaterialDeltaE':None},ensure_ascii=False),flush=True)
