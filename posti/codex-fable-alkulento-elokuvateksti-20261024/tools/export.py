from pathlib import Path
from PIL import Image,ImageOps
import numpy as np
import json
import production as p

def resize(im,size):
    # Resample premultiplied alpha to avoid hidden transparent RGB fringes.
    return im.convert('RGBa').resize(size,Image.Resampling.LANCZOS).convert('RGBA')

def row_export(path,region=None):
    original=Image.open(path).convert('RGBA')
    region=region or (0,0,original.width,original.height)
    im=original.crop(region);a=np.array(im.getchannel('A'))
    ys,xs=np.where(a>1)
    visible=(int(xs.min()),int(ys.min()),int(xs.max()+1),int(ys.max()+1))
    bounds=(max(0,visible[0]-4),max(0,visible[1]-4),min(im.width,visible[2]+4),min(im.height,visible[3]+4))
    crop=im.crop(bounds)
    h=round(crop.height*2992/crop.width)
    out=Image.new('RGBA',(3000,h+8),(0,0,0,0));out.alpha_composite(resize(crop,(2992,h)),(4,4))
    return out,{'nativePath':str(path),'nativeCanvasDimensions':list(original.size),'inputRegion':list(region),
       'visibleBoundThresholdAlpha':2,'cropBoundsWithinRegion':list(bounds),'cropDimensions':list(crop.size),
       'cropOnlyNoRepainting':True,'smallOuterAlpha1NoiseOutsideVisibleCropNotRetained':True,
       'exportDimensions':list(out.size),'resampling':'premultiplied-alpha Lanczos, proportional; 4px transparent outer margin',
       'exportScaleFromCrop':2992/crop.width,'native3000pxClaimed':False}

main,m1=row_export(p.R/'native/title-attempt001.png',(0,190,2146,410))
year,m2=row_export(p.R/'native/year-attempt001.png')
main.save(p.R/'delivery/alkulento-otsikko-rivi1.png')
year.save(p.R/'delivery/alkulento-otsikko-rivi2.png')
year_w=420;year_h=round(year.height*year_w/year.width)
gap=64;year_x=(3000-year_w)//2;year_y=main.height+gap
combined=Image.new('RGBA',(3000,year_y+year_h+4),(0,0,0,0))
combined.alpha_composite(main,(0,0));combined.alpha_composite(resize(year,(year_w,year_h)),(year_x,year_y))
combined.save(p.R/'delivery/alkulento-otsikko-koko.png')
ref=Image.open(p.R/'references/01-lahtokuja.png').convert('RGB')
layout={'row1':m1,'row2':m2,'combined':{'dimensions':list(combined.size),'row1Rect':[0,0,main.width,main.height],'row2Rect':[year_x,year_y,year_w,year_h],'yearWidthRelativeToTitle':.14,'gapPixels':gap},'previews':{},'timing':{'sourceDurationSeconds':7,'independentRowFadeAssetsProvided':True,'animationImplemented':False,'integrationOwner':'Natiivi-UI / juna 210'}}
qa={'at':p.now(),'taskNumber':947,'exactText':['KIELLETTY KAUPUNKI','1914'],'generationCalls':2,'pngs':{},'previewChecks':{},'visualReviewComplete':False,'producerQAPassed':False}
for name,im in [('alkulento-otsikko-rivi1.png',main),('alkulento-otsikko-rivi2.png',year),('alkulento-otsikko-koko.png',combined)]:
    a=np.array(im.getchannel('A'));edges=np.concatenate([a[0],a[-1],a[:,0],a[:,-1]])
    assert im.mode=='RGBA' and im.width==3000 and edges.max()==0
    assert a.min()==0 and a.max()==255 and 0<int((a>0).sum())<a.size
    qa['pngs'][name]={'dimensions':list(im.size),'mode':im.mode,'sha256':p.sha(p.R/'delivery'/name),'bytes':(p.R/'delivery'/name).stat().st_size,'alphaExtrema':[int(a.min()),int(a.max())],'alphaLevels':int(len(np.unique(a))),'transparentEdgeVerified':True,'nontransparentBounds':list(im.getbbox()),'native3000':False}
for name,size,width_ratio,y_ratio in [('vaaka',(2732,2048),.86,.095),('pysty',(2048,2732),.89,.10)]:
    bg=ImageOps.fit(ref,size,Image.Resampling.LANCZOS,centering=(.5,.5)).convert('RGBA')
    tw=round(size[0]*width_ratio);th=round(combined.height*tw/combined.width)
    title=resize(combined,(tw,th));x=(size[0]-tw)//2;y=round(size[1]*y_ratio)
    overlay=Image.new('RGBA',size,(0,0,0,0));overlay.alpha_composite(title,(x,y))
    out=Image.alpha_composite(bg,overlay).convert('RGB');out.save(p.R/f'delivery/esikatselu-{name}.png')
    a=np.array(overlay.getchannel('A'));bb=overlay.getbbox();assert bb[3]<=size[1]/3
    same=np.array_equal(np.array(out)[a==0],np.array(bg.convert('RGB'))[a==0]);assert same
    layout['previews'][name]={'dimensions':list(size),'titleRect':[x,y,tw,th],'titleAlphaBounds':list(bb),'topThirdLimit':size[1]/3,'backgroundMethod':'proportional center-crop fit; no scene regeneration or geometry edits','referenceNativeDimensions':list(ref.size)}
    qa['previewChecks'][name]={'dimensions':list(out.size),'allTitlePixelsInTopThird':True,'backgroundOutsideTitleEqualsFittedReference':same,'sha256':p.sha(p.R/f'delivery/esikatselu-{name}.png')}
for name,color in [('light',(246,245,241,255)),('dark',(28,29,33,255))]:
    bg=Image.new('RGBA',combined.size,color);bg.alpha_composite(combined);bg.convert('RGB').save(p.R/f'qa/title-combined-{name}.png')
p.write(p.R/'LAYOUT.json',layout);p.write(p.R/'qa/QA.json',qa)
print(json.dumps({'deliverables':{name:q['dimensions'] for name,q in qa['pngs'].items()},'previews':layout['previews'],'row1NativeCrop':m1['cropDimensions'],'row2NativeCrop':m2['cropDimensions']}))
